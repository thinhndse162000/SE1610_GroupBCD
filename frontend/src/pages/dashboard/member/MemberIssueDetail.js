import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Loading } from "../../../components";
import { default as ContainerWrapper } from "../../../assets/wrappers/Container";
import { getIssuePublish } from "../../../context/service/journalService";
import { MEMBER_JOURNAL_ID } from "../../../context/actions";
import { Issue, Publish } from "../../../components";

const MemberIssueDetail = () => {
  const { issueId } = useParams();
  const dispatch = useDispatch();
  const {
    base: { isLoading },
    member: { issuePublishes },
  } = useSelector((state) => state);
  const { issue, publishes } = issuePublishes;

  useEffect(() => {
    dispatch(getIssuePublish({ issueId }));
  }, [dispatch, issueId]);

  useEffect(() => {
    if (issue != null) {
      dispatch({
        type: MEMBER_JOURNAL_ID,
        payload: { journalId: issue.journal.journalId },
      });
    }
  }, [dispatch, issue]);

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <>
      <h3>Issue</h3>
      {issue != null && <Issue issue={issue} />}
      <ContainerWrapper>
        <div className="container">
          <h3>Publications</h3>
          {publishes != null &&
            publishes.map((publish, index) => {
              return (
                <Publish
                  key={index}
                  publish={publish}
                  link={`/publish/${publish.publishId}`}
                />
              );
            })}
        </div>
      </ContainerWrapper>
    </>
  );
};

export default MemberIssueDetail;
