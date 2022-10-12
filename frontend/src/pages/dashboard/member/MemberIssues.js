import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getJournalIssues } from "../../../context/service/journalService";
import { default as ContainerWrapper } from "../../../assets/wrappers/Container";
import { MEMBER_JOURNAL_ID } from "../../../context/actions";
import { Issue } from "../../../components";

const MemberIssues = () => {
  const { journalId } = useParams();
  const dispatch = useDispatch();
  const {
    member: { issues },
  } = useSelector((state) => state);

  useEffect(() => {
    dispatch({ type: MEMBER_JOURNAL_ID, payload: { journalId } });
    dispatch(getJournalIssues({ journalId }));
  }, [dispatch, journalId]);

  return (
    <ContainerWrapper>
      <div className="container">
        <h3>All Issues</h3>
        {issues != null &&
          issues.map((issue, index) => {
            return (
              <Issue key={index} issue={issue} link={`/issue/${issue.issueId}`} />
            );
          })}
      </div>
    </ContainerWrapper>
  );
};

export default MemberIssues;
