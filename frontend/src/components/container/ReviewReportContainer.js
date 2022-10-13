import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../../assets/wrappers/Container";
import PaperReviewDetail from "../PaperReviewDetail";
import { setEditReview } from "../../context/service/reviewReportService";

const ReviewReportContainer = () => {
  const { reviewReports } = useSelector((state) => state.reviewer);
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <div className="container">
        {reviewReports.map((reviewReport, index) => {
            let action = []
            // TODO:
            if (reviewReport.review.status === "PENDING") {
                action.push({
                  type: "link",
                  to: "submit-review",
                  className: "btn edit-btn",
                  label: "Submit",
                  onClick: () => dispatch(setEditReview(reviewReport.review.reviewReportId)),
                });
              } else {
                // action.push({
                //   type: "link",
                //   to: `review-detail/${reviewReport.review.reviewReportId}`,
                //   className: "btn edit-btn",
                //   label: "Detail",
                // });
              }
          return <PaperReviewDetail key={index} reviewReport={reviewReport} action={action} />;
        })}
      </div>
    </Wrapper>
  );
};

export default ReviewReportContainer;
