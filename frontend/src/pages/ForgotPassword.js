import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterPage";
import { Alert, FormRow, Logo } from "../components";
import { sendEmailForgotPassword } from "../context/service/authService"

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { user, isLoading, showAlert, role } = useSelector(
    (state) => state.base
  );

  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendEmailForgotPassword({ email }))
  }

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        <Logo />
        <h3>Forgot Password</h3>
        {showAlert && <Alert />}

        {/* email input */}
        <FormRow
          labelText="Enter email"
          type="email"
          name="email"
          value={email}
          handleChange={(e) => { e.preventDefault(); setEmail(e.target.value) }}
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
