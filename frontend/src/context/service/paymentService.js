import { LOADING, ERROR, SUCCESS_NO_MESSAGE, SUCCESS } from "../actions";
import { clearAlert, handleChange } from "./utilService";
import authFetch from "../../utils/authFetch";

export const createPaypalPayment = (journal) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    const { data } = await authFetch.post("/payment/paypal", {
      paymentMethod: "paypal",
      amount: journal.price,
      successUrl: `http://localhost:3000/journal/${journal.slug}/subscribe?status=success`,
      cancelUrl: `http://localhost:3000/journal/${journal.slug}/subscribe?status=cancel`,
    });
    console.log(data);
    dispatch({ type: SUCCESS_NO_MESSAGE });
    dispatch(
      handleChange({
        name: "redirectUrl",
        value: data,
        type: "base",
      })
    );
  } catch (error) {
    if (error.response.status === 401) return;
    dispatch({
      type: ERROR,
      payload: { msg: error.response.data.message },
    });
  }
  dispatch(clearAlert());
};

export const sendPaymentSuccess = ({ paymentId, payerId, slug }) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    await authFetch.post("/payment/paypal/success", {}, {
      params: {
        paymentId,
        payerId,
        slug,
      },
    });
    dispatch({ type: SUCCESS, payload: {
      msg: "Payment success"
    } });
  } catch (error) {
    if (error.response.status === 401) return;
    dispatch({
      type: ERROR,
      payload: { msg: error.response.data.message },
    });
  }
  dispatch(clearAlert());
};
