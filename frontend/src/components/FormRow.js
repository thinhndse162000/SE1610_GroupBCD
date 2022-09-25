const FormRow = ({ type, name, value, handleChange, labelText, required = "true" }) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        className='form-input'
        required={required === "true" ? required : null}
      />
    </div>
  )
}

export default FormRow
