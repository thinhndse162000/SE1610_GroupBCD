import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Wrapper from "../../assets/wrappers/Container";
import Reviewer from "../Reviewer";
import { sendInvitation } from "../../context/service/invitationService";

const ReviewerResultContainer = () => {
  const { paperId } = useParams();
  const { availableReviewers } = useSelector((state) => state.manager);
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <h4>Search Result</h4>
      {availableReviewers.length > 0 ? (
        <div className="container">
          {availableReviewers.map((reviewer, index) => {
            let action = [];
            action.push({
              type: "button",
              className: "btn edit-btn",
              label: "Send invitation",
              onClick: () => dispatch(sendInvitation({ paperId, reviewerId: reviewer.reviewerId })),
            });
            return <Reviewer key={index} reviewer={reviewer} action={action} />;
          })}
        </div>
      ) : (
        <p>Found no reviewer</p>
      )}
    </Wrapper>
  );
};

export default ReviewerResultContainer;
