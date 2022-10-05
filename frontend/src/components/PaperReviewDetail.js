import Wrapper from "../assets/wrappers/Item";
import { Link } from "react-router-dom";

const PaperReviewDetail = ({ reviewReport, action = [] }) => {
  const { paper, review } = reviewReport;
  return (
    <Wrapper>
      <header>
        <div className="info">
          <h3>Paper</h3>
          <h5>{paper.title}</h5>
          <p>Author: {paper.authors.fullName}</p>
        </div>
      </header>
      <div className="content">
        {review.status === "DONE" && (
          <div>
            <h3>Review Detail</h3>
            <p>
              Grade: {review.grade} - Confidentiality: {review.confidentiality}{" "}
              - Verdict:{" "}
              <span className={`status ${review.verdict.toLowerCase()}`}>
                {review.verdict}
              </span>
            </p>
            <h5>Note</h5>
            <p>{review.note}</p>
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
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default PaperReviewDetail;
