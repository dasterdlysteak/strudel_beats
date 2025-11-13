function Checkbox({label, checked, onToggle}) {
    return (
        <div className="form-check form-check-inline" >
            <input className="form-check-input" type="checkbox" checked={checked} onChange={onToggle} id="inlineCheckbox1" value={label}/>
            <label className="form-check-label" htmlFor="inlineCheckbox1">{label}</label>
        </div>
    )
}
export default Checkbox;