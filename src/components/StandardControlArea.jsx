import CPM_control from "./CPM_control";
import PlayButtons from "./PlayButtons";
import ProcButtons from "./ProcButtons";
import DJ_Controls from "./DJ_Controls";
import Checkbox from "./Checkbox";


function StandardControlArea({toggled, onToggle, onPlay, onStop, onVolumeChange, isPlaying , instrumentBlocks}){
    return (
        <div className="card bg-secondary bg-opacity-75 p-3 mb-3">

            <div className="d-flex mt-3 gap-2" role="group" aria-label="Basic button">


                <DJ_Controls onPlay={onPlay} onStop={onStop} onVolumeChange={onVolumeChange} isPlaying={isPlaying} />


            </div>
            <div className="mt-3 text text-center">
                {instrumentBlocks && instrumentBlocks.map((block)=>(
                    <Checkbox toggled={toggled} onToggle={onToggle}  label={block.name} checked={toggled.includes(block.name)}/>
                ))}
            </div>
            <div className="mt-3">
                <CPM_control />
            </div>
        </div>
    )
}
export default StandardControlArea;