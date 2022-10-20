import { useState, useEffect } from "react";
import { Logo, FormRow, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../context/service/authService";
import { displayAlert } from "../context/service/utilService";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const { user, isLoading, showAlert, role } = useSelector(
    (state) => state.base
  );
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log({values})
    console.log ('test',values)
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = values;
    if (!email || !password) {
      dispatch(displayAlert());
      return;
    }
    const currentUser = { email, password };
    dispatch(login({ currentUser }));
  };

  useEffect(() => {
    if (user) {
      if (role === "MANAGER") navigate("/manager");
      else navigate("/author");
    }
  }, [user, navigate, role]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>Login</h3>
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
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          submit
        </button>
        <p>
          Not a member yet?
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="member-btn"
          >
            Signup
          </button>
        </p>
        <p>
          Forgot password?
          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="member-btn"
          >
            Forgot password
          </button>
        </p>
      </form>
    </Wrapper>
  );
};
export default Login;
