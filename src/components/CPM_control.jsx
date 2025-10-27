function CPM_control(){
    return(
        <div className="input-group mb-3">
            <span className="input-group-text" id="cpm_label">setCPM</span>
            <input type="text" className="form-control" placeholder="120" aria-label="cpm"
                   aria-describedby="cpm_label"/>
        </div>
    )
}
export default CPM_control;