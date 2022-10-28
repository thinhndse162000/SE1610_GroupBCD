import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { default as ContainerWrapper } from "../../../assets/wrappers/Container";
import {
  getAuthorPaper,
  setEditPaper,
  deletePaper,
} from "../../../context/service/paperService";
import {
  Loading,
  Paper,
  SearchAuthorPaperContainer,
  PageBtnContainer,
} from "../../../components";
import { handleChange } from "../../../context/service/utilService";

const AuthorPaper = () => {
  const {
    base: { isLoading },
    author: {
      submittedPapers: papers,
      search: { keyword, startDate, endDate, status, fields, page, numOfPage },
    },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handlePageChange = (page) => {
    dispatch(
      handleChange({ name: "page", value: page, type: "author_search" })
    );
  };

  useEffect(() => {
    dispatch(getAuthorPaper({}));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAuthorPaper({ keyword, startDate, endDate, status: status === "ALL" ? null : status, fields, page }));
    // eslint-disable-next-line
  }, [dispatch, page]);

  return (
    <>
      <SearchAuthorPaperContainer />
      <PageBtnContainer
        page={page}
        numOfPage={numOfPage}
        changePage={handlePageChange}
      />
      {isLoading ? (
        <Loading center />
      ) : papers.length > 0 ?
        (
          <>
            <ContainerWrapper>
              <h3>All Papers</h3>
              <div className="container">
                {papers.map((paper, index) => {
                  let action = [];
                  if (paper.status === "PENDING") {
                    action.push({
                      type: "link",
                      to: "submit-paper",
                      className: "btn edit-btn",
                      label: "Edit",
                      onClick: () => dispatch(setEditPaper(paper.paperId)),
                    });
                    // action.push({
                    //   type: "button",
                    //   className: "btn delete-btn",
                    //   label: "Delete",
                    //   onClick: () => dispatch(deletePaper(paper.paperId)),
                    // });
                  }
                  return (
                    <Paper
                      key={index}
                      paper={paper}
                      link={`paper-detail/${paper.paperId}`}
                      action={action}
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
          <p>There are no papers</p>
        )}
    </>
  );
};

export default AuthorPaper;
