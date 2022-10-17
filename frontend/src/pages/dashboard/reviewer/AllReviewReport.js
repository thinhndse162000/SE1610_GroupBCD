import { useEffect } from "react";
import { Loading, PaperReviewDetail } from "../../../components/";
import {
  getReviewReport,
  setEditReview,
} from "../../../context/service/reviewReportService";
import { useDispatch, useSelector } from "react-redux";
import { default as ContainerWrapper } from "../../../assets/wrappers/Container";

const AllReviewReport = () => {
  const {
    base: { isLoading },
    reviewer: { reviewReports },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReviewReport());
  }, [dispatch]);

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <>
      {reviewReports.length > 0 ? (
        <ContainerWrapper>
          <div className="container">
            {reviewReports.map((reviewReport, index) => {
              let action = [];
              if (reviewReport.review.status === "PENDING") {
                action.push({
                  type: "link",
                  to: "submit-review",
                  className: "btn edit-btn",
                  label: "Submit",
                  onClick: () =>
                    dispatch(setEditReview(reviewReport.review.reviewReportId)),
                });
              }
              return (
                <PaperReviewDetail
                  key={index}
                  reviewReport={reviewReport}
                  action={action}
                  link={`review-detail/${reviewReport.review.reviewReportId}`}
                />
              );
            })}
          </div>
        </ContainerWrapper>
      ) : (
        <p>No review found</p>
      )}
    </>
  );
};

export default AllReviewReport;
