import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getJournalFromMember } from "../../../context/service/journalService";
import { default as ItemWrapper } from "../../../assets/wrappers/Item";
import { MEMBER_JOURNAL_ID } from "../../../context/actions";

const MemberJournalDetail = () => {
  const { journalId } = useParams();
  const dispatch = useDispatch();
  const {
    member: { journal },
  } = useSelector((state) => state);

  useEffect(() => {
    dispatch({ type: MEMBER_JOURNAL_ID, payload: { journalId } })
    dispatch(getJournalFromMember({ journalId }));
  }, [dispatch, journalId]);

  return (
    <ItemWrapper>
      <header>
        <div className="info">
          <h3>Journal</h3>
          <h5>{journal.name}</h5>
          <p>
            <strong>ISSN</strong>: {journal.issn} -{" "}
            <strong>Organization</strong>: {journal.organization}
          </p>
        </div>
      </header>
      <div className="content">
        <p>{journal.introduction}</p>
      </div>
    </ItemWrapper>
  );
};

export default MemberJournalDetail;
