import AsyncSelect from "react-select/async";
import Select from "react-select";
const FormDropdown = ({
  handleChange,
  isDisabled,
  value,
  labelText,
  loadOptions,
  options,
  isMulti = false,
  required = true,
  type,
}) => {

  if (type === "select") {
    return (
      <div className="form-row">
        <label htmlFor={labelText} className="form-label">
          {labelText}
        </label>
        <Select
          className="form-dropdown"
          defaultOptions
          isMulti={isMulti}
          isDisabled={isDisabled}
          options={options}
          value={value}
          onChange={handleChange}
          required={required}
        />
      </div>
    );
  } else if (type === "async") {

    return (
      <div className="form-row">
        <label htmlFor={labelText} className="form-label">
          {labelText}
        </label>
        <AsyncSelect
          className="form-dropdown"
          defaultOptions
          isMulti={isMulti}
          isDisabled={isDisabled}
          loadOptions={loadOptions}
          value={value}
          onChange={handleChange}
          required={required}
        />
      </div>
    );
  }
};

export default FormDropdown;
