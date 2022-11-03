const FormCheckBox = ({
  name,
  handleChange,
  labelText,
  required = false,
  disabled = false,
  checked = false,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={checked}
        onChange={handleChange}
        className="form-input"
        required={required}
        disabled={disabled}
      />
    </div>
  );
};

export default FormCheckBox;
