const FormTextArea = ({ labelText, name, value, handleChange, required=true }) => {
    return (
      <div className='form-row'>
        <label htmlFor={name} className='form-label'>
          {labelText || name}
        </label>
        <textarea
        value={value}
        name={name}
        onChange={handleChange}
        className='form-textarea'
        required={required}
      />
      </div>
    )
  }
  
  export default FormTextArea
  