import { useSelector, useDispatch } from "react-redux";
import Wrapper from "../../assets/wrappers/Container";
import Paper from "../Paper";
import { setEditPaper, deletePaper } from "../../context/service/paperService";

const AuthorPaperContainer = () => {
  const papers = useSelector((state) => state.author.submittedPapers);
  const dispatch = useDispatch();
  return (
    <Wrapper>
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
          } else {
            action.push({
              type: "link",
              to: `paper-detail/${paper.paperId}`,
              className: "btn edit-btn",
              label: "Detail",
            });
          }
          return <Paper key={index} paper={paper} action={action}></Paper>;
        })}
      </div>
    </Wrapper>
  );
};

export default AuthorPaperContainer;
