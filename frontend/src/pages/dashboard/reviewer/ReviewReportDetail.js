import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Loading, PaperReviewDetail } from "../../../components";
import {
  getReviewReportDetail,
  setEditReview,
} from "../../../context/service/reviewReportService";

const ReviewReportDetail = () => {
  const { reviewId } = useParams();
  const dispatch = useDispatch();
  const {
    base: { isLoading },
    reviewer: { reviewDetail: reviewReport },
  } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getReviewReportDetail({ reviewId }));
  }, [dispatch, reviewId]);

  if (isLoading) {
    return <Loading center />;
  }

  if (Object.keys(reviewReport).length !== 0) {
    let action = [];
    if (reviewReport.review.status === "PENDING") {
      action.push({
        type: "link",
        to: "/reviewer/submit-review",
        className: "btn edit-btn",
        label: "Submit review",
        onClick: () =>
          dispatch(setEditReview(reviewReport.review.reviewReportId)),
      });
    }
    return (
      <PaperReviewDetail
        reviewReport={reviewReport}
        action={action}
        type="full"
      />
    );
  }

  return (
    <div>
      <p>Loading</p>
    </div>
  );
};

export default ReviewReportDetail;
