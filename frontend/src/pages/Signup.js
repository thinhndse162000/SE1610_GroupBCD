import { useState, useEffect } from "react";
import { Logo, FormRow, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup } from "../context/service/authService";
import { displayAlert } from "../context/service/utilService";
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
  const handleFileInput = (e) => {
    setValues({
      ...values,
      [e.target.name]: URL.createObjectURL(e.target.files[0]),
    });
  };

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
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>Signup</h3>
        {showAlert && <Alert />}

        {/* email input */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />

        {/* password input */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />

        {/* retype password input */}
        <FormRow
          type="password"
          name="passwordRetype"
          labelText="Retype password"
          value={values.retypePassword}
          handleChange={handleChange}
        />

        {/* first name input */}
        <FormRow
          type="text"
          name="firstName"
          labelText="First name"
          value={values.firstName}
          handleChange={handleChange}
        />

        {/* last name input */}
        <FormRow
          type="text"
          name="lastName"
          labelText="Last name"
          value={values.lastName}
          handleChange={handleChange}
        />

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

        <FormRow
          type="text"
          name="phone"
          value={values.phone}
          handleChange={handleChange}
        />

        {/* profile image input */}
        <FormRow
          type="file"
          name="profileImage"
          labelText="Profile image"
          accept="image/*"
          handleChange={handleFileInput}
          require={false}
        />
        {values.profileImage && (
          <img width="100%" src={values.profileImage} alt="Profile" />
        )}

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
