function CPM_control({bpm, onBPMChange}){
    return(
        <div className="input-group mb-3">
            <span className="input-group-text" id="bpm_label">setBPM</span>
            <input type="text" className="form-control" placeholder="bpm" aria-label="cpm" onChange={onBPMChange} value={bpm}
                   aria-describedby="cpm_label"/>
        </div>
    )
}
export default CPM_control;