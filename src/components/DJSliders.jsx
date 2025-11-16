import VerticalSlider from "./VerticalSlider";

function DJSliders({onMute}) {
    return(
        <div className="container bg-secondary bg-opacity-75 text-light p-4 rounded">
            <h4 className="text-center mb-4">Mixer Controls</h4>

            <div className="d-flex justify-content-around rounded p-3 bg-dark">
                <VerticalSlider label={"CH1"}/>
                <VerticalSlider label={"CH2"}/>
                <VerticalSlider label={"CH3"}/>
                <VerticalSlider label={"CH4"}/>

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

