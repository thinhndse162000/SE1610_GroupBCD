import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getJournalFromMember,
  getSubscribeInfo,
} from "../../../context/service/journalService";
import { MEMBER_JOURNAL_ID } from "../../../context/actions";
import { Alert, Journal } from "../../../components";
import SubscribeStatus from "../../../components/SubscribeStatus";

const MemberJournalDetail = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const {
    member: { journal, journalSubscribe },
    base: { showAlert },
  } = useSelector((state) => state);

  useEffect(() => {
    dispatch({ type: MEMBER_JOURNAL_ID, payload: { slug } });
    dispatch(getJournalFromMember({ slug }));
    dispatch(getSubscribeInfo({ slug }));
  }, [dispatch, slug]);

  if (Object.keys(journal).length > 0) {
    let action = [];
    if (journalSubscribe.subscribed) {
      action.push({
        type: "link",
        to: "subscribe",
        className: "btn edit-btn",
        label: "Extend subscribe",
      });
    } else {
      action.push({
        type: "link",
        to: "subscribe",
        className: "btn edit-btn",
        label: "Subscribe",
      });
    }
    return (
      <>
        {showAlert && <Alert />}
        <Journal journal={journal} type="full" />
        <SubscribeStatus journalSubscribe={journalSubscribe} action={action} />
      </>
    );
  }
  return <></>;
};

export default MemberJournalDetail;
