import VerticalSlider from "./VerticalSlider";
import Checkbox from "./Checkbox";

function DJSliders({instrumentBlocks, toggled, onToggle,onMute, onHighsChange, onLowsChange, onReverbChange}) {
    return(
        <div className="container bg-secondary bg-opacity-75 text-light p-4 rounded">
            <h4 className="text-center">Mixer Controls</h4>
            <div className="d-flex justify-content-center mb-3">
                {instrumentBlocks && instrumentBlocks.map((block)=>(
                    <Checkbox key={block.name} toggled={toggled} onToggle={onToggle}  label={block.name} checked={block.toggled}/>
                ))}
            </div>
            <div className="d-flex justify-content-around rounded p-3 bg-dark">
                <VerticalSlider label={"Highs"} onHighsChange={onHighsChange}/>
                <VerticalSlider label={"Lows"} onLowsChange={onLowsChange}/>
                <VerticalSlider label={"Reverb"} onReverbChange={onReverbChange}/>

            </div>

            <div className="row">
                <div className="col mt-4 text-center">
                    <button type="button" className="btn btn-primary" onClick={onMute}>
                        Mute
                    </button>
                </div>
                <div className="col mt-4 text-center">
                    <button type="button" className="btn btn-primary">
                        Echo
                    </button>
                </div>

            </div>
        </div>
        )
}
export default DJSliders;

