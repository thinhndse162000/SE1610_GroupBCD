import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyForgotPassword } from "../context/service/authService";
import Wrapper from "../assets/wrappers/RegisterPage";
import { Alert, FormRow } from "../components";

const VerifyForgotPassword = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token");

  const initialState = {
    newPassword: "",
    newPasswordRetype: "",
  };

  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({ noError: true });
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.base);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let errors = {};

    if (!values.newPassword) {
      errors.newPassword = "Password is required.";
    } else if (values.newPassword.length < 8) {
      errors.newPassword = "Password needs to be 8 characters or more.";
    } else if (values.newPassword.length > 20) {
      errors.newPassword = "Password cannot exceed more than 20 characters.";
    }

    if (!values.newPasswordRetype) {
      errors.newPasswordRetype = "Password is required.";
    } else if (values.newPassword !== values.newPasswordRetype) {
      errors.newPasswordRetype = "Passwords do not match.";
    }

    setErrors(errors);
  };

  useEffect(() => {
    if (Object.getOwnPropertyNames(errors).length === 0) {
      console.log("ok")
      dispatch(verifyForgotPassword({ token, ...values }));
    }
    // eslint-disable-next-line
  }, [dispatch, errors]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <h3>Change password</h3>
        {<Alert />}
        <div className="form-center">
          <FormRow
            type="password"
            labelText="New password"
            name="newPassword"
            value={values.newPassword}
            handleChange={handleChange}
          />
          {errors.newPassword && <p>{errors.newPassword}</p>}
          <FormRow
            type="password"
            labelText="New password retype"
            name="newPasswordRetype"
            value={values.newPasswordRetype}
            handleChange={handleChange}
          />
          {errors.newPasswordRetype && <p>{errors.newPasswordRetype}</p>}

          <button className="btn btn-block" type="submit" disabled={isLoading}>
            Save
          </button>

          <p>
            Already a member?
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="member-btn"
            >
              Login
            </button>
          </p>
        </div>
      </form>
    </Wrapper>
  );
};

export default VerifyForgotPassword;
