import {ProcAndPlay} from "../App";

function DJ_Controls() {
    return(
        <>
            <div className="input-group mb-3">
                <span className="input-group-text" id="cpm_label">setCPM</span>
                <input type="text" className="form-control" placeholder="120" aria-label="cpm"
                       aria-describedby="cpm_label"/>
            </div>

            <div className="card shadow-sm p-3" style={{ maxWidth: "400px" }}>

                <label htmlFor="volume_range" className="form-label">Volume</label>
                <input type="range" className="form-range" min="0" max="5" step="0.5" id="volume_range"/>

                <div className="d-flex align-items-center mb-3">
                    <div>
                        <h6 className="mb-0">track name</h6>
                        <small className="text-muted">user who made track</small>
                    </div>
                </div>



                <div className="d-flex justify-content-center gap-3">
                    <button className="btn btn-outline-secondary btn-sm">
                        Backwards or slow down
                    </button>
                    <button className="btn btn-dark">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-play" viewBox="0 0 16 16">
                            <path
                                d="M10.804 8 5 4.633v6.734zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696z"/>
                        </svg>
                    </button>
                    <button className="btn btn-outline-secondary btn-sm">
                        forward or speed up ?
                    </button>
                </div>
            </div>

        </>
    );
}

export default DJ_Controls;