import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, FormDropdown } from "../../../components";
import Wrapper from "../../../assets/wrappers/Profile";
import {
  getReviewerSetting,
  updateInvitable,
  updateReviewerFields,
} from "../../../context/service/reviewerService";
import { handleChange } from "../../../context/service/utilService";
import FormCheckBox from "../../../components/form/FormCheckBox";
import validateReviewerSetting from "../../../context/validator/validateReviewerSetting";

const ViewReviewingSetting = () => {
  const dispatch = useDispatch();
  const {
    member: {
      reviewerSetting: { fields, invitable },
    },
    base: { isLoading, showAlert, fields: fieldOptions },
  } = useSelector((state) => state);

  const [errors, setErrors] = useState({ notEmpty: true });
  const selectFieldOptions = fieldOptions.map((field) => ({
    label: field.fieldName,
    value: field.fieldId,
  }));

  useEffect(() => {
    dispatch(getReviewerSetting());
  }, []);

  useEffect(() => {
    if (Object.getOwnPropertyNames(errors).length === 0) {
      dispatch(
        updateReviewerFields({ fields: fields.map((f) => f.fieldId) })
      );
      dispatch(updateInvitable({ invitable }));
    }
    // eslint-disable-next-line
  }, [dispatch, errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateReviewerSetting({ fields }));
  };

  const handleInput = (e) => {
    e.preventDefault();
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };

  // fields
  // invitatble
  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        <h3>Reviewing Setting</h3>
        {showAlert && <Alert />}
        <div className="form-profile">
          <div>
            <FormDropdown
              labelText="Field"
              value={fields.map((field) => ({
                label: field.fieldName,
                value: field.fieldId,
              }))}
              isMulti={true}
              options={selectFieldOptions}
              handleChange={(e) => {
                const tmp = e.map((x) => ({
                  fieldId: x.value,
                  fieldName: x.label,
                }));

                dispatch(
                  handleChange({
                    name: "fields",
                    value: tmp,
                    type: "member_reviewerSetting",
                  })
                );
              }}
              type="select"
            />
            {errors.paperFields && <p>{errors.paperFields}</p>}
          </div>

          <FormCheckBox
            labelText="invitable"
            name="invitable"
            handleChange={(e) => {
              e.persist();
              dispatch(
                handleChange({
                  name: "invitable",
                  value: !invitable,
                  type: "member_reviewerSetting",
                })
              );
            }}
            checked={invitable}
          />

          <button
            className="btn btn-block"
            type="submit"
            disabled={isLoading}
          >
            Save
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default ViewReviewingSetting;
