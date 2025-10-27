import CPM_control from "./CPM_control";

function PlayButtons({onPlay, onStop}) {
    return(
        <>
            <button id="play" className="btn btn-primary flex-fill" onClick={onPlay}>Play</button>
            <button id="stop" className="btn btn-outline-light flex-fill" onClick={onStop}>Stop</button>
        </>


    )
}
export default PlayButtons;