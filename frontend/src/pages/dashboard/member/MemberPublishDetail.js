import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Issue, Journal, Loading } from "../../../components";
import { default as ContainerWrapper } from "../../../assets/wrappers/Container";
import { getPublish } from "../../../context/service/journalService";
import { MEMBER_JOURNAL_ID } from "../../../context/actions";
import { Publish } from "../../../components";

const MemberPublishDetail = () => {
  const { publishId } = useParams();
  const dispatch = useDispatch();
  const {
    base: { isLoading },
    member: { publish },
  } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getPublish({ publishId }));
  }, [dispatch, publishId]);

  useEffect(() => {
    if (publish != null) {
      dispatch({
        type: MEMBER_JOURNAL_ID,
        payload: { journalId: publish.issue.journal.journalId },
      });
    }
  }, [dispatch, publish]);

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <ContainerWrapper>
      <div className="container">
        {publish != null && (
          <>
            <div className="two-row">
              <div>
                <h3>Journal</h3>
                <Journal journal={publish.issue.journal} />
              </div>
              <div>
                <h3>Issue</h3>
                <Issue issue={publish.issue} link={`/issue/${publish.issue.issueId}`}/>
              </div>
            </div>
            <h3>Publish</h3>
            <Publish publish={publish} type="full" />
          </>
        )}
      </div>
    </ContainerWrapper>
  );
};

export default MemberPublishDetail;
