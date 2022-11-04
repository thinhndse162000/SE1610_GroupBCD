import { useEffect } from "react";
import {
  FormRow,
  FormRowSelect,
  Loading,
  PageBtnContainer,
  PaperReviewDetail,
} from "../../../components/";
import {
  getReviewReport,
  setEditReview,
} from "../../../context/service/reviewReportService";
import { useDispatch, useSelector } from "react-redux";
import { default as ContainerWrapper } from "../../../assets/wrappers/Container";
import { default as SearchWrapper } from "../../../assets/wrappers/SearchContainer";
import { handleChange } from "../../../context/service/utilService";

const AllReviewReport = () => {
  const {
    base: { isLoading },
    reviewer: {
      searchReview: {
        title,
        status,
        verdict,
        page,
        numOfPage,
        result: reviewReports,
      },
    },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReviewReport({ title, status, verdict, page }));
  }, [dispatch, page]);

  const handleInputChange = (e) => {
    if (isLoading) return;
    dispatch(
      handleChange({
        name: e.target.name,
        value: e.target.value,
        type: "reviewer_searchreview",
      })
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (page === 1) {
      dispatch(getReviewReport({ title, status, verdict, page }));
    } else {
      handlePageChange(1);
    }
  };

  const handlePageChange = (page) => {
    dispatch(
      handleChange({
        name: "page",
        value: page,
        type: "reviewer_searchreview",
      })
    );
  };

  return (
    <>
      <SearchWrapper>
        <form className="form">
          <div className="journal-form">
            <FormRow
              labelText="Keyword"
              type="text"
              name="title"
              value={title}
              handleChange={handleInputChange}
            />
            <FormRowSelect
              labelText="Status"
              name="status"
              value={status}
              handleChange={handleInputChange}
              list={["PENDING", "DONE", "ALL"]}
            />
            <FormRowSelect
              labelText="Verdict"
              name="verdict"
              value={verdict}
              handleChange={handleInputChange}
              list={["ACCEPTED", "REJECTED", "ALL"]}
            />

            <button className="btn" disabled={isLoading} onClick={handleSearch}>
              Search
            </button>
          </div>
        </form>
      </SearchWrapper>

      {reviewReports.length > 0 && (
        <PageBtnContainer
          page={page}
          numOfPage={numOfPage}
          changePage={handlePageChange}
        />
      )}
      {isLoading ? (
        <Loading center />
      ) : reviewReports.length > 0 ? (
        <>
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
                      dispatch(
                        setEditReview(reviewReport.review.reviewReportId)
                      ),
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

          <PageBtnContainer
            page={page}
            numOfPage={numOfPage}
            changePage={handlePageChange}
          />
        </>
      ) : (
        <p>No review found</p>
      )}
    </>
  );
};

export default AllReviewReport;
