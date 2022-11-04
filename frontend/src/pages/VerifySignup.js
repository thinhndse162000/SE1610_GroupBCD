import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Alert, Loading } from "../components";
import { verifyAccount } from "../context/service/authService";

const VerifySignup = () => {
  const { token } = useParams();
  const {
    base: { isLoading, alertType, showAlert },
  } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyAccount({ token }))
  }, [token]);

  useEffect(() => {
    if (alertType === "success") {
        navigate("/login");
    }
  }, [alertType]);

  if (isLoading) {
    return (
      <>
        <h3>Verifing your account</h3>
        <Loading center />
      </>
    );
  }
  if (showAlert) {
    return <>
      <Alert />
      <Link to="/landing">Go back home</Link>
      </>;
  }

  return <></>;
};

export default VerifySignup;
