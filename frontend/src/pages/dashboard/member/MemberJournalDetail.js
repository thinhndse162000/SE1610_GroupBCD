import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getJournalFromMember } from "../../../context/service/journalService";
import { MEMBER_JOURNAL_ID } from "../../../context/actions";
import { Journal } from "../../../components";

const MemberJournalDetail = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const {
    member: { journal },
  } = useSelector((state) => state);

  useEffect(() => {
    dispatch({ type: MEMBER_JOURNAL_ID, payload: { slug } });
    dispatch(getJournalFromMember({ slug }));
  }, [dispatch, slug]);

  if (Object.keys(journal).length > 0) {
    let action = [];
    action.push({
      type: "link",
      to: "subscribe",
      className: "btn edit-btn",
      label: "Subscribe",
    });
    return <Journal journal={journal} type="full" action={action} />;
  }
  return <></>;
};

export default MemberJournalDetail;
