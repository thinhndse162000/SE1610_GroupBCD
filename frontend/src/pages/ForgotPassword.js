import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterPage";
import { Alert, FormRow, Logo } from "../components";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({});
  const { user, isLoading, showAlert, role } = useSelector(
    (state) => state.base
  );

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <Wrapper className="full-page">
      <form className="form" >
        <Logo />
        <h3>Forgot Password</h3>
        {showAlert && <Alert />}

        {/* email input */}
        <FormRow
          labelText="Enter email"
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          submit
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

export default ForgotPassword;
