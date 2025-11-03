function VerticalSlider({label}) {
    return(
        <div className="d-flex flex-column align-items-center"
             style={{ height: "220px", width: "60px" }}>
            <label className="form-label mb-2">{label}</label>
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden"
                }}>
                <input
                    type="range"
                    className="form-range"
                    min="0"
                    max="100"
                    style={{
                        transform: "rotate(90deg) scaleX(-1)",
                        transformOrigin: "center center",
                        width: "180px"
                    }}/>
            </div>
        </div>
    )
}
export default VerticalSlider;