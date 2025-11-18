function PreProcessTextArea({defaultValue, onChange}){
    return(
        <>

            <textarea className="form-control bg-dark text-light border-secondary hide-scrollbar" rows="15" id="proc" defaultValue={defaultValue} onChange={onChange} ></textarea>
        </>
    )
}
export default PreProcessTextArea;