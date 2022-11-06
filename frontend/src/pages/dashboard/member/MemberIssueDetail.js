import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Loading } from "../../../components";
import { default as ContainerWrapper } from "../../../assets/wrappers/Container";
import {
  downloadIssueFile,
  getIssuePublish,
} from "../../../context/service/journalService";
import { MEMBER_JOURNAL_ID } from "../../../context/actions";
import { Issue, Publish } from "../../../components";

const MemberIssueDetail = () => {
  const { issueId } = useParams();
  const dispatch = useDispatch();
  const {
    base: { isLoading },
    member: { issuePublishes, journalSubscribe },
  } = useSelector((state) => state);
  const { issue, publishes } = issuePublishes;

  useEffect(() => {
    dispatch(getIssuePublish({ issueId }));
  }, [dispatch, issueId]);

  useEffect(() => {
    if (issue != null) {
      dispatch({
        type: MEMBER_JOURNAL_ID,
        payload: { slug: issue.journal.slug },
      });
      dispatch(downloadIssueFile({ slug: issue.journal.slug }));
    }
  }, [dispatch, issue]);

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <>
      <h3>Issue</h3>
      {issue != null && (
        <Issue issue={issue} download={journalSubscribe.subscribed} />
      )}
      <ContainerWrapper>
        <div className="container">
          <h3>Publications</h3>
          {publishes != null &&
            publishes.map((publish, index) => {
              return (
                <Publish
                  download={
                    publish.accessLevel === "OPEN" ||
                    journalSubscribe.subscribed
                  }
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
