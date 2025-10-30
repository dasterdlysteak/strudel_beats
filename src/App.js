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



    const hasRun = useRef(false);

    const handlePlay = () => {
        globalEditor.evaluate()
    }
    const handleStop = ()=>{
        globalEditor.stop()
    }
    const handleVolumeChange = (Volume) => {
        let instrumentBlocks = parser.getInstrumentBlocks(songText)
        instrumentBlocks = effectController.changeVolume(instrumentBlocks, Volume)
        setSongText(parser.replaceInstrumentBlocks(instrumentBlocks, songText))
        globalEditor.evaluate()
    }

    const parser = SongTextParser();

    const [songText, setSongText] = useState(stranger_tune)

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
            console.log(StrudelMirror)
        {console.log(globalEditor);} //you can look at whats in the global editor with this!
            
        document.getElementById('proc').value = stranger_tune
        // SetupButtons()
        // Proc()
    }
    globalEditor.setCode(songText)
}, [songText]);



return (
    <div>
        <h2>Strudel Demo</h2>
        <main>

            <div className="container bg-body-secondary">
                <div className="row">
                    <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        <PreProcessTextArea defaultValue={songText} onChange={(e)=>setSongText(e.target.value)} />
                    </div>
                    <div className="col-md-4">

                            <br />
                            <StandardControlArea onPlay={handlePlay} onStop={handleStop}/>
                            <DJ_Controls onPLay={handlePlay} onStop={handleStop} onVolumeChange={handleVolumeChange}/>
                    </div>

                </div>
                <div className="row">
                    <div className="col-md-8 g-3" style={{ maxHeight: '50vh', overflowY: 'auto', scrollbarWidth: 'none' }}>
                        <div className={"rounded"} id="editor" />
                        <div id="output" />
                    </div>

                </div>
            </div>
            <canvas id="roll"></canvas>
        </main >
    </div >
);


}