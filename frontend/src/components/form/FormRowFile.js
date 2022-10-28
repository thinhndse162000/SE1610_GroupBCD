const FormRowFile = ({ name, value, handleChange, labelText, required = false, disabled = false }) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      <input
        type="file"
        id="1-file"
        name={name}
        onChange={handleChange}
        className='form-input form-input-file'
        required={required}
        disabled={disabled}
      />
    <input type="button" value="Browse..." onClick={() => document.getElementById('1-file').click()} />
    <span>  {value}</span>
    </div>
  )
}

export default FormRowFile
