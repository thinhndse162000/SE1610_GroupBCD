import { useState, useEffect } from "react";
import { Logo, FormRow, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup } from "../context/service/authService";
import { displayAlert } from "../context/service/utilService";
import ValidateInfo from "../components/container/ValidateInfo";

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

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const [errors, setErrors] = useState({});
  const onSubmit = (e) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      phone,
      organization,
      dateOfBirth,
      profileImage,
      email,
      password,
      passwordRetype,
    } = values;
    if (
      !(
        email &&
        password &&
        firstName &&
        lastName &&
        phone &&
        organization &&
        dateOfBirth &&
        passwordRetype
      )
    ) {
      displayAlert();
      return;
    }
    const currentUser = {
      firstName,
      lastName,
      phone,
      organization,
      dateOfBirth,
      profileImage,
      email,
      password,
      passwordRetype,
    };
    setErrors(ValidateInfo(values));
    signup({ currentUser });
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/author");
      }, 1000);
    }
  }, [user, navigate]);

  return (
    <Wrapper className="full-page">
      <form className="form form-signup" onSubmit={onSubmit}>
        <Logo />
        <h3>Signup</h3>
        {showAlert && <Alert />}

        <div className="signup">
          {/* email input */}
          <FormRow
            type="text"
            name="email"
            value={values.email}
            handleChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
          {/* password input */}
          <FormRow
            type="password"
            name="password"
            value={values.password}
            handleChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}

          {/* retype password input */}
          <FormRow
            type="password"
            name="passwordRetype"
            labelText="Retype password"
            value={values.retypePassword}
            handleChange={handleChange}
          />
          {errors.passwordRetype && <p>{errors.passwordRetype}</p>}

          {/* first name input */}
          <FormRow
            type="text"
            name="firstName"
            labelText="First name"
            value={values.firstName}
            handleChange={handleChange}
          />
          {errors.firstName && <p>{errors.firstName}</p>}

          {/* last name input */}
          <FormRow
            type="text"
            name="lastName"
            labelText="Last name"
            value={values.lastName}
            handleChange={handleChange}
          />
          {errors.lastName && <p>{errors.lastName}</p>}

          {/* date of birth input */}
          <FormRow
            type="date"
            name="dateOfBirth"
            labelText="Date of birth"
            value={values.dateOfBirth}
            handleChange={handleChange}
          />

          {/* organziation input */}
          <FormRow
            type="text"
            name="organization"
            value={values.organization}
            handleChange={handleChange}
          />
          {errors.organization && <p>{errors.organization}</p>}

          <FormRow
            type="text"
            name="phone"
            value={values.phone}
            handleChange={handleChange}
          />
          {errors.phone && <p>{errors.phone}</p>}
        </div>
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          Signup
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
