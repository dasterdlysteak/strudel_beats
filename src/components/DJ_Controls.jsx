import {ProcAndPlay} from "../App";

function DJ_Controls({onPlay, onStop, onVolumeChange, isPlaying}) {
    return(
        <>


            <div className="card  w-100 shadow-sm  p-3" style={{ maxWidth: "400px" }}>

                <label htmlFor="volume_range" className="form-label">Volume</label>
                <input type="range" className="form-range" min="0" max="1" step="0.05" id="volume_range" onInput={onVolumeChange}/>

                <div className="d-flex align-items-center mb-2 ">
                    <div className="d-flex flex-column align-items-center w-100">
                        <h6 className="text-center">Untitled</h6>
                        <small className="text-muted text-center">Algorave Dave</small>
                    </div>
                </div>



                <div className="d-flex justify-content-center gap-3">
                    <button className="btn btn-outline-secondary btn-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-skip-backward-fill" viewBox="0 0 16 16">
                            <path
                                d="M.5 3.5A.5.5 0 0 0 0 4v8a.5.5 0 0 0 1 0V8.753l6.267 3.636c.54.313 1.233-.066 1.233-.697v-2.94l6.267 3.636c.54.314 1.233-.065 1.233-.696V4.308c0-.63-.693-1.01-1.233-.696L8.5 7.248v-2.94c0-.63-.692-1.01-1.233-.696L1 7.248V4a.5.5 0 0 0-.5-.5"/>
                        </svg>
                    </button>
                    <button className="btn btn-dark btn-lg" onClick={isPlaying ? onStop : onPlay}>
                        {isPlaying ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-pause" viewBox="0 0 16 16">
                                <path
                                    d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5m4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5"/>
                            </svg>

                        ) : (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                  className="bi bi-play" viewBox="0 0 16 16">
                                <path
                                    d="M10.804 8 5 4.633v6.734zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696z"/>
                            </svg>
                        ) }

                    </button>
                    <button className="btn btn-outline-secondary btn-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-skip-forward-fill" viewBox="0 0 16 16">
                            <path
                                d="M15.5 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V8.753l-6.267 3.636c-.54.313-1.233-.066-1.233-.697v-2.94l-6.267 3.636C.693 12.703 0 12.324 0 11.693V4.308c0-.63.693-1.01 1.233-.696L7.5 7.248v-2.94c0-.63.693-1.01 1.233-.696L15 7.248V4a.5.5 0 0 1 .5-.5"/>
                        </svg>
                    </button>
                </div>
            </div>

        </>
    );
}

export default DJ_Controls;