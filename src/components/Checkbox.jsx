function Checkbox({label, checked, onToggle}) {
    return (
        <div className="d-flex flex-column align-items-center mx-2" >
            <label className="form-check-label" htmlFor={label}>{label}</label>
            <input className="form-check-input" type="checkbox" checked={checked} onChange={onToggle}  value={label}/>
        </div>
    )
}
export default Checkbox;