import CPM_control from "./CPM_control";
import PlayButtons from "./PlayButtons";
import ProcButtons from "./ProcButtons";

function StandardControlArea({onPlay, onStop}){
    return (
        <div className="card bg-secondary p-3 mb-3">
            <div className="d-flex gap-2">
                <ProcButtons/>
            </div>
            <div className="d-flex mt-3 gap-2" role="gropup" aria-label="Basic button">
                <PlayButtons onPlay={onPlay} onStop={onStop} />
            </div>

            <div className="mt-3">
                <CPM_control />
            </div>
        </div>
    )
}
export default StandardControlArea;