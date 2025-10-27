import CPM_control from "./CPM_control";

function StandardControlArea(){
    return (
        <div className="card bg-secondary p-3 mb-3">
            <div className="d-flex gap-2" role="gropup" aria-label="Basic button">
                <button id="play" className="btn btn-outline-primary" onClick={onPlay}>Play</button>
                <button id="stop" className="btn btn-outline-primary" onClick={onStop}>Stop</button>
            </div>

            <div className="mt-3">
                <CPM_control />
            </div>
        </div>
    )
}
export default StandardControlArea();