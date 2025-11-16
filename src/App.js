import './App.css';
import {useEffect, useRef, useState} from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from './tunes';
import console_monkey_patch, { getD3Data } from './console-monkey-patch';
import DJ_Controls from "./components/DJ_Controls";
import PlayButtons from './components/PlayButtons';
import ProcButtons from './components/ProcButtons';
import PreProcessTextArea from './components/PreProcessTextArea';
import StandardControlArea from "./components/StandardControlArea";
import {SongTextParser} from "./utils/SongTextParser";
import {EffectCentre} from "./utils/EffectCentre";
import DJSliders from "./components/DJSliders";

let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};

// export function SetupButtons() {
//
//     document.getElementById('play').addEventListener('click', () => globalEditor.evaluate());
//     document.getElementById('stop').addEventListener('click', () => globalEditor.stop());
//     document.getElementById('process').addEventListener('click', () => {
//         Proc()
//     }
//     )
//     document.getElementById('process_play').addEventListener('click', () => {
//         if (globalEditor != null) {
//             Proc()
//             globalEditor.evaluate()
//         }
//     }
//     )
// }



// export function ProcAndPlay() {
//     if (globalEditor != null && globalEditor.repl.state.started == true) {
//         console.log(globalEditor)
//         Proc()
//         globalEditor.evaluate();
//     }
// }

// export function Proc() {
//
//     let proc_text = document.getElementById('proc').value
//     let proc_text_replaced = proc_text.replaceAll('<p1_Radio>', ProcessText);
//     ProcessText(proc_text);
//     globalEditor.setCode(proc_text_replaced)
// }

export function ProcessText(match, ...args) {

    let replace = ""
    // if (document.getElementById('flexRadioDefault2').checked) {
    //     replace = "_"
    // }

    return replace
}

export default function StrudelDemo() {

    const effectController = EffectCentre();

    const [isPLaying, setIsPLaying] = useState(false);

    const [toggled, setToggled] = useState([]);

    const [instrumentBlocks, setInstrumentBlocks] = useState([]);

    const [cps, setCPS] = useState({});

    const hasRun = useRef(false);

    const handlePlay = () => {
        globalEditor.evaluate();
        setIsPLaying(true);
    }
    const handleStop = ()=>{
        globalEditor.stop();
        setIsPLaying(false);
    }
    const handleToggle = (blockName) => {
        setInstrumentBlocks(prevBlocks => {
            const updated = prevBlocks.map(block =>
                block.name === blockName
                    ? { ...block, toggled: !block.toggled }
                    : block
            );

            console.log("Toggled", blockName);
            console.log("after toggling instrumentBlocks:", updated);

            return updated;
        });

    };

    const handleCPSChange = (bpm) => {
        const updatedCPS = effectController.changeBPM(bpm, cps)
        setCPS(updatedCPS);
        setSongText(parser.replaceCPS(updatedCPS, songText));
    }

    const handleVolumeChange = (Volume) => {
        console.log(`volume: ${Volume}`)

        setInstrumentBlocks(effectController.changeVolume(instrumentBlocks, Volume))
        setSongText(parser.replaceInstrumentBlocks(instrumentBlocks, songText))
    }

    const handleMute = () => {
        console.log('mute');
        console.log(`instrument blocks before mute = `)
        console.log(instrumentBlocks);
        const mutedBlocks = effectController.muteInstrumentBlocks(instrumentBlocks);
        setInstrumentBlocks(mutedBlocks);
        console.log(`instrument blocks after mute =`)
        console.log(instrumentBlocks);
        setSongText(parser.replaceInstrumentBlocks(mutedBlocks, songText))
        console.log(songText);
    }

    const parser = SongTextParser();

    const [songText, setSongText] = useState(stranger_tune)

    useEffect(() => {
        const cps = parser.getCPS(songText)
        console.log('cps', cps)
        setCPS(cps)
        if(!instrumentBlocks){
            setInstrumentBlocks(parser.getInstrumentBlocks(songText))
        }
        else{
            const currentInstrumentBlocks = parser.getInstrumentBlocks(songText);
            const merged = currentInstrumentBlocks.map(currentInstrumentBlock => {
                const normalisedName = currentInstrumentBlock.name.replace(/^_+/, "");
                const oldBlock = instrumentBlocks.find(
                    b => b.name.replace(/^_+/, "") === normalisedName
                );
                return oldBlock ? oldBlock : currentInstrumentBlock;
            });

            setInstrumentBlocks(merged);
        }




    }, [songText]);



    useEffect(() => {

    if (!hasRun.current) {
        document.addEventListener("d3Data", handleD3Data);
        console_monkey_patch();
        hasRun.current = true;
        //Code copied from example: https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl
            //init canvas
            const canvas = document.getElementById('roll');
            canvas.width = canvas.width * 2;
            canvas.height = canvas.height * 2;
            const drawContext = canvas.getContext('2d');
            const drawTime = [-2, 2]; // time window of drawn haps
            globalEditor = new StrudelMirror({
                defaultOutput: webaudioOutput,
                getTime: () => getAudioContext().currentTime,
                transpiler,
                root: document.getElementById('editor'),
                drawTime,
                onDraw: (haps, time) => drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
                prebake: async () => {
                    initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
                    const loadModules = evalScope(
                        import('@strudel/core'),
                        import('@strudel/draw'),
                        import('@strudel/mini'),
                        import('@strudel/tonal'),
                        import('@strudel/webaudio'),
                    );
                    await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);
                },
            });
            
        document.getElementById('proc').value = stranger_tune
        //setInstrumentBlocks(parser.getInstrumentBlocks(songText))
    }
    //console.log(songText)

    globalEditor.setCode(songText)
    if(isPLaying) globalEditor.evaluate();

    console.log(toggled)
}, [songText]);



return (
    <div>

        <main>

            <div className="container min-vh-100">

                <h2 className="display-3 text-light text-center">Strudel Demo</h2>

                <div className="row">
                    <div className="col-md-8 g-3" style={{ maxHeight: '50vh', overflowY: 'auto', scrollbarWidth: 'none' }}>
                        <PreProcessTextArea defaultValue={songText} onChange={(e)=>setSongText(e.target.value)} />
                    </div>
                    <div className="col-md-4">

                            <br />
                            <StandardControlArea onBPMChange={(e) => handleCPSChange(e.target.value)} bpm={cps.bpm}   onPlay={handlePlay} onStop={handleStop} onVolumeChange={(e) => handleVolumeChange(e.target.value) } isPlaying={isPLaying}  />
                    </div>

                </div>
                <div className="row">
                    <div className="col-md-8 g-3 rounded hide-scrollbar" style={{ maxHeight: '45vh'}}>
                        <div className={"rounded form-control bg-dark text-light border-secondary mb-5"} id="editor" style={{ maxHeight: '45vh', overflowY: 'auto', scrollbarWidth: 'none' }}/>
                        <div className={"rounded"} id="output" />
                    </div>
                    <div className="col-md-4">
                        <DJSliders onMute={handleMute}  instrumentBlocks={instrumentBlocks} toggled={toggled} onToggle={(event) => handleToggle(event.target.value)}/>
                    </div>
                </div>
            </div>
            <canvas id="roll"></canvas>
        </main >
    </div >
);


}