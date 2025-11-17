import VerticalSlider from "./VerticalSlider";
import Checkbox from "./Checkbox";

function DJSliders({instrumentBlocks, toggled, onToggle,onMute, onHighsChange, onLowsChange, onReverbChange, onSave}) {
    return(
        <div className="container bg-secondary bg-opacity-75 text-light p-4 rounded">
            <h4 className="text-center">Mixer Controls</h4>
            <div className="d-flex justify-content-center mb-3">
                {instrumentBlocks && instrumentBlocks.map((block)=>(
                    <Checkbox key={block.name} toggled={toggled} onToggle={onToggle}  label={block.name} checked={block.toggled}/>
                ))}
            </div>
            <div className="d-flex justify-content-around rounded p-3 bg-dark">
                <VerticalSlider label={"Highs"} onEffectTrigger={onHighsChange} min={200} max={5000} step={50}/>
                <VerticalSlider label={"Lows"} onEffectTrigger={onLowsChange} min={20} max={2000} step={20}/>
                <VerticalSlider label={"Reverb"} onEffectTrigger={onReverbChange}/>

            </div>

            <div className="row">
                <div className="col mt-4 text-center">
                    <button type="button" className="btn btn-primary" onClick={onMute}>
                        Mute
                    </button>
                </div>
                <div className="col mt-4 text-center">
                    <input type="file" accept="application/json" className="btn btn-primary" onChange={onLoad}/>
                </div>
                <div className="col mt-4 text-center">
                    <button type="button" className="btn btn-primary" onClick={onSave}>
                        save
                    </button>
                </div>

            </div>
        </div>
        )
}
export default DJSliders;

