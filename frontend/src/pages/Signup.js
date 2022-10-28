import { useState, useEffect } from "react";
import { Logo, FormRow, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup } from "../context/service/authService";
import validateInfo from "../context/validator/validateInfo";
const initialState = {
  firstName: "",
  lastName: "",
  phone: "",
  organization: "",
  dateOfBirth: "",
  profileImage: "",
  email: "",
  password: "",
  passwordRetype: "",
};
const Signup = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const { user, isLoading, showAlert } = useSelector((state) => state.base);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const [errors, setErrors] = useState({ notEmpty: true });
  const onSubmit = (e) => {
    e.preventDefault();
    setErrors(validateInfo(values));
  };

  useEffect(() => {
    if (Object.getOwnPropertyNames(errors).length === 0) {
      dispatch(signup({ currentUser: values }))
    }
    // eslint-disable-next-line
  }, [dispatch, errors])

  return (
    <Wrapper className="full-page">
      <form className="form form-signup" onSubmit={onSubmit}>
        <Logo />
        <h3>Signup</h3>
        {showAlert && <Alert />}

        <div className="signup">
          {/* email input */}
          <div className="input-signup">
            <FormRow
              type="text"
              name="email"
              value={values.email}
              handleChange={handleChange}
            />
            {errors.email && <p>{errors.email}</p>}
          </div>
          {/* password input */}
          <div className="input-signup">
            <FormRow
              type="password"
              name="password"
              value={values.password}
              handleChange={handleChange}
            />
            {errors.password && <p>{errors.password}</p>}
          </div>
          {/* retype password input */}
          <div className="input-signup">
            <FormRow
              type="password"
              name="passwordRetype"
              labelText="Retype password"
              value={values.retypePassword}
              handleChange={handleChange}
            />
            {errors.passwordRetype && <p>{errors.passwordRetype}</p>}
          </div>
          {/* first name input */}
          <div className="input-signup">
            <FormRow
              type="text"
              name="firstName"
              labelText="First name"
              value={values.firstName}
              handleChange={handleChange}
            />
            {errors.firstName && <p>{errors.firstName}</p>}
          </div>
          {/* last name input */}
          <div className="input-signup">
            <FormRow
              type="text"
              name="lastName"
              labelText="Last name"
              value={values.lastName}
              handleChange={handleChange}
            />
            {errors.lastName && <p>{errors.lastName}</p>}
          </div>
          {/* date of birth input */}
          <div className="input-signup">
            <FormRow
              type="date"
              name="dateOfBirth"
              labelText="Date of birth"
              value={values.dateOfBirth}
              handleChange={handleChange}
            />
            {errors.dateOfBirth && <p>{errors.dateOfBirth}</p>}
          </div>
          {/* organziation input */}
          <div className="input-signup">
            <FormRow
              type="text"
              name="organization"
              value={values.organization}
              handleChange={handleChange}
            />
            {errors.organization && <p>{errors.organization}</p>}
          </div>
          <div className="input-signup">
            <FormRow
              type="text"
              name="phone"
              value={values.phone}
              handleChange={handleChange}
            />
            {errors.phone && <p>{errors.phone}</p>}
          </div>
        </div>
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          Create Account
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
      </form>
    </Wrapper>
  );
};
export default Signup;
