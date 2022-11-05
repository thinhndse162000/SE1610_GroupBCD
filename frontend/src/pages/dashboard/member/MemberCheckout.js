import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Alert, Journal } from "../../../components";
import { getJournalFromMember, getSubscribeInfo } from "../../../context/service/journalService";
import {
  createPaypalPayment,
  sendPaymentSuccess,
} from "../../../context/service/paymentService";

const MemberCheckout = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const {
    member: { journal, journalSubscribe },
    base: { redirectUrl, showAlert },
  } = useSelector((state) => state);

  const navigate = useNavigate();

  const [params, setParams] = useSearchParams();
  const status = params.get("status");

  useEffect(() => {
    dispatch(getJournalFromMember({ slug }));
    dispatch(getSubscribeInfo({ slug }))
  }, [dispatch, slug]);

  useEffect(() => {
    if (status === "success") {
      const paymentId = params.get("paymentId");
      const payerId = params.get("PayerID");
      dispatch(sendPaymentSuccess({ paymentId, payerId, slug }));
      navigate(`/journal/${slug}`);
    }
  }, [dispatch, status]);

  if (redirectUrl !== "") {
    window.location.replace(redirectUrl);
  }

  if (Object.keys(journal).length > 0) {
    let endDate = new Date(journalSubscribe.endDate);
    let currentDate = new Date();
    let date = new Date();
    if (endDate < currentDate) {
      date.setTime(currentDate.getTime() + 365 * 24 * 60 * 60 * 1000);
    } else {
      date.setTime(endDate.getTime() + 365 * 24 * 60 * 60 * 1000);
    }

    date = moment(date).format("DD/MM/YYYY");

    return (
      <div>
        {showAlert && <Alert />}
        <Journal journal={journal} type="full" />
        <p>Price: 1000</p>
        <p>End date: {date}</p>
        <button
          className="btn"
          onClick={(e) => {
            e.preventDefault();
            dispatch(createPaypalPayment(journal));
          }}
        >
          Pay with paypal
        </button>
      </div>
    );
  }

  return <></>;
};

export default MemberCheckout;
