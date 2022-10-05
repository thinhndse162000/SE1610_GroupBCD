import { useEffect } from "react";
import { ReviewReportContainer } from "../../../components/";
import { getReviewReport } from "../../../context/service/reviewReportService";
import { useDispatch, useSelector } from "react-redux";

const AllReviewReport = () => {
  const { reviewReports } = useSelector((state) => state.reviewer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReviewReport());
  }, []);

  return (
    <>
      {reviewReports.length > 0 ? <ReviewReportContainer /> : <p>No review found</p>}
    </>
  );
};

export default AllReviewReport;
