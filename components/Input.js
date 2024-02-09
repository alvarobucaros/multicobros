
const Input = (props) => {
  const inputName = props.inputName;
  const label = props.label;
  const inputValue = props.inputValue;
  const inputOnChange = props.inputOnChange;
  const inputRequired = props.inputRequired;

  return (
    <div className="d-flex align-items-sm-center mb0">
        <label className="col-sm-5 col-form-label" htmlFor={inputName}>{label}</label>
        <input type="text" className="form-control ancho100" name={inputName} id={inputName} 
        defaultValue={inputValue} onChange={inputOnChange} required = {inputRequired}/> 
    </div>
  )
}

export default Input