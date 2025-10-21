import PlayButtons from "./PlayButtons";
import DJ_Controls from "./DJ_Controls";

function ProcButtons(){
    return (
        <>
            <div className="btn-group" role="gropup" aria-label="Basic button">
                <button id="process" className="btn btn-outline-primary">Preprocess</button>
                <button id="process_play" className="btn btn-outline-primary">Proc & Play</button>
            </div>
        </>
    )
}
export default ProcButtons;