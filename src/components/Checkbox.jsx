function Checkbox({label, value, onChange}) {
    return (
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"/>
            <label className="form-check-label" htmlFor="inlineCheckbox1">{label}</label>
        </div>
    )
}
export default Checkbox;