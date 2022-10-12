import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { default as ContainerWrapper } from "../../../assets/wrappers/Container";
import { Loading } from "../../../components";
import {
  getAuthorPaper,
  setEditPaper,
  deletePaper,
} from "../../../context/service/paperService";
import { Paper, SearchAuthorPaperContainer } from "../../../components";

const AuthorPaper = () => {
  const {
    base: { isLoading },
    author: { submittedPapers: papers },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAuthorPaper({}));
  }, [dispatch]);

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <>
      <SearchAuthorPaperContainer />
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
              // TODO: deletePaper
              action.push({
                type: "button",
                className: "btn delete-btn",
                label: "Delete",
                onClick: () => dispatch(deletePaper(paper.paperId)),
              });
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
    </>
  );
};

export default AuthorPaper;
