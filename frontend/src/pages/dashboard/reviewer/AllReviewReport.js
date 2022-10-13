import { useEffect } from "react";
import { Loading, ReviewReportContainer } from "../../../components/";
import { getReviewReport } from "../../../context/service/reviewReportService";
import { useDispatch, useSelector } from "react-redux";

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
    return <Loading center />
  }

  return (
    <>
      {/* TODO: Refactor not to use container */}
      {reviewReports.length > 0 ? (
        <ReviewReportContainer />
      ) : (
        <p>No review found</p>
      )}
    </>
  );
};

export default AllReviewReport;
