import { useEffect } from "react";
import { ReviewReportContainer } from "../../../components/";
import { getReviewReport } from "../../../context/service/reviewReportService";
import { useDispatch, useSelector } from "react-redux";

const AllReviewReport = () => {
  const { reviewReports } = useSelector((state) => state.reviewer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReviewReport());
  }, [dispatch]);

  return (
    <>
    {/* TODO: Refactor not to use container */}
      {reviewReports.length > 0 ? <ReviewReportContainer /> : <p>No review found</p>}
    </>
  );
};

export default AllReviewReport;
