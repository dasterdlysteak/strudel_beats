import PlayButtons from "./PlayButtons";
import DJ_Controls from "./DJ_Controls";

function ProcButtons(){
    return (
        <>
            <>
                <button id="process" className="btn btn-primary flex-fill">Preprocess</button>
                <button id="process_play" className="btn btn-primary flex-fill">Proc & Play</button>
            </>
        </>
    )
}
export default ProcButtons;