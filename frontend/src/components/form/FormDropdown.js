import AsyncSelect from 'react-select/async'
const FormDropdown = ({ handleChange, 
  isDisabled, value, labelText, loadOptions, required = true }) => {
  return (
    <div className='form-row'>
      <label htmlFor={labelText} className='form-label'>
        {labelText}
      </label>
      <AsyncSelect
        className='form-dropdown'
        defaultOptions
        isDisabled={isDisabled}
        loadOptions={loadOptions}
        value={value}
        onChange={handleChange}
        required={required}
      />
    </div>
  )
}

export default FormDropdown
