import Wrapper from "../assets/wrappers/Item";
import { Link } from "react-router-dom";
import { downloadFile } from "../context/service/paperService";
import { useDispatch } from "react-redux";

const PaperReviewDetail = ({
  reviewReport,
  type = "compact",
  link,
  action = [],
}) => {
  const { paper, review } = reviewReport;
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <header>
        <div className="info">
          <h3>Paper</h3>
          {link != null ? (
            <Link to={link}>
              <h5>{paper.title}</h5>
            </Link>
          ) : (
            <h5>{paper.title}</h5>
          )}
          <p>Author: {paper.authors.fullName}</p>
          <p>Round: {review.round}</p>
        </div>

        {type === "full" && (
          <div>
            <h5>Abstract</h5>
            <p>{paper.summary}</p>
          </div>
        )}
      </header>
      <div className="content">
        {review.status === "DONE" && (
          <div>
            <h4>Review Detail</h4>
            <p>
              Grade: {review.grade} - Confidentiality: {review.confidentiality}{" "}
              - Verdict:{" "}
              <span className={`status ${review.verdict.toLowerCase()}`}>
                {review.verdict}
              </span>
            </p>
            {type === "full" && (
              <>
                <h5>Note</h5>
                <p>{review.note}</p>
              </>
            )}
          </div>
        )}
        <footer>
          <div className="actions">
            {action.map((act, index) => {
              return act.type === "link" ? (
                <Link
                  key={index}
                  to={act.to}
                  className={act.className}
                  onClick={act.onClick}
                >
                  {act.label}
                </Link>
              ) : (
                <button
                  key={index}
                  type="button"
                  className={act.className}
                  onClick={act.onClick}
                >
                  {act.label}
                </button>
              );
            })}

              <button
                type="button"
                className="btn edit-btn"
                onClick={() => dispatch(downloadFile(paper.paperId))}
              >
                Download PDF
              </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default PaperReviewDetail;
