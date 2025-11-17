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



import * as d3 from "d3";


let globalEditor = null;

const handleD3Data = (event) => {

    console.log(event.detail);
};


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

    const [globalVolume, setGlobalVolume] = useState(50);

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
        setGlobalVolume(Volume * 100);
        setInstrumentBlocks(effectController.changeVolume(instrumentBlocks, Volume))
        setSongText(parser.replaceInstrumentBlocks(instrumentBlocks, songText))
    }

    const handleReverbChange = (reverb) => {
        console.log(`reverb: ${reverb}`)
        setInstrumentBlocks(effectController.processEffect(instrumentBlocks, reverb, "room"))
        setSongText(parser.replaceInstrumentBlocks(instrumentBlocks, songText))
    }

    const handlePitchChange = (pitch) => {
        console.log(`pitch: ${pitch}`)
        setInstrumentBlocks(effectController.processEffect(instrumentBlocks, lows, "transpose"))
        setSongText(parser.replaceInstrumentBlocks(instrumentBlocks, songText))
    }

    const handleHighsChange = (highs) => {
        console.log(`highs: ${highs}`)
        setInstrumentBlocks(effectController.processEffect(instrumentBlocks, highs, "hpf"))
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

    const handleSave = () => {
        const mixTitle = window.prompt('Please enter a title', "Your Strudal Mix Title");
        if(!mixTitle) return;
        const filename = `${mixTitle}.json`
        const songDataJson = {[mixTitle]: songText};
        const blob = new Blob([JSON.stringify(songDataJson)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const download = document.createElement("a");

        download.href = url;
        download.download = filename;
        download.click();
        console.log("this has not worked?")
    }

    const handleLoad = async (file) => {
        if(!file) return;
        const text = await file.text();
        const jsoned = JSON.parse(text);

        const [mixTitle] = Object.keys(jsoned)
        const songText = jsoned[mixTitle];
        setSongText(songText);

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
    }
    globalEditor.setCode(songText)
    if(isPLaying) globalEditor.evaluate();
}, [songText]);


    useEffect(() => {
        const volume = globalVolume
        const svg = d3.select("#barChart svg");
        svg.selectAll("*").remove();

        const w = +svg.attr("width");
        const h = +svg.attr("height");

        const yScale = d3.scaleLinear()
            .domain([0, 100])
            .range([h, 0]);

        const barX = w / 4;
        const barW = w / 2;

        svg.append("rect")
            .attr("x", barX)
            .attr("y", 0)
            .attr("width", barW)
            .attr("height", h)
            .attr("fill", "black")
            .attr("stroke", "black")
            .attr("stroke-width", 2);

        const defs = svg.append("defs");
        const gradient = defs.append("linearGradient")
            .attr("id", "vu-gradient")
            .attr("gradientUnits", "userSpaceOnUse")
            .attr("x1", 0).attr("y1", h)
            .attr("x2", 0).attr("y2", 0);

        gradient.append("stop").attr("offset", "0%").attr("stop-color", "green");
        gradient.append("stop").attr("offset", "50%").attr("stop-color", "yellow");
        gradient.append("stop").attr("offset", "70%").attr("stop-color", "red");
        gradient.append("stop").attr("offset", "100%").attr("stop-color", "red");

        svg.append("rect")
            .attr("x", barX)
            .attr("width", barW)
            .attr("y", yScale(volume))
            .attr("height", h- yScale(volume))
            .attr("fill", "url(#vu-gradient)")
            .attr("stroke", "black")
            .attr("stroke-width", 2);


    }, [globalVolume]);
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
                        <StandardControlArea onBPMChange={(e) => handleCPSChange(e.target.value)} bpm={cps.bpm} onPlay={handlePlay} onStop={handleStop} onVolumeChange={(e) => handleVolumeChange(e.target.value) } isPlaying={isPLaying}  />
                    </div>

                </div>
                <div className="row">
                    <div className="col-md-8 g-3 rounded hide-scrollbar" style={{ maxHeight: '45vh'}}>
                        <div className={"rounded form-control bg-dark text-light border-secondary mb-5"} id="editor" style={{ maxHeight: '45vh', overflowY: 'auto', scrollbarWidth: 'none' }}/>
                        <div className={"rounded"} id="output" />
                    </div>
                    <div className="col-md-4">
                        <DJSliders onLoad={(event) => handleLoad(event.target.files[0])} onSave={handleSave} onMute={handleMute}  instrumentBlocks={instrumentBlocks} toggled={toggled} onToggle={(event) => handleToggle(event.target.value)} onHighsChange={(e) => handleHighsChange(e.target.value) } onPitchChange={(e) => handlePitchChange(e.target.value) } onReverbChange={(e) => handleReverbChange(e.target.value) }/>
                    </div>

                </div>
            </div>
            <div id="barChart" className="position-fixed end-0 bottom-0  me-5 mb-5">
                <svg width="200" height="300"></svg>
            </div>
            <canvas id="roll"></canvas>
        </main >
    </div >
);


}