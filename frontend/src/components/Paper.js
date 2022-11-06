import moment from "moment";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Item";
import { downloadFile } from "../context/service/paperService";

const Paper = ({ paper, type = "compact", link, action = [] }) => {
  let date = moment(paper.submitTime).format("DD/MM/YYYY");
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <header>
        <div className="info">
          {link != null ? (
            <Link to={link}>
              <h5>{paper.title}</h5>
            </Link>
          ) : (
            <h5>{paper.title}</h5>
          )}
          <p>
            {paper.numberOfPage} {paper.numberOfPage > 1 ? "pages" : "page"} -
            Submit date: {date}
          </p>
          <p>
            Round: {paper.round}/{paper.journal.numberOfRound} - Number of
            reviewer per round: {paper.journal.numberOfReviewer}
          </p>
          <p>
            Fields:{" "}
            {paper.fields.map((field, index) => (
              <span key={index}>
                {field.fieldName}
                {index !== paper.fields.length - 1 && ","}{" "}
              </span>
            ))}
          </p>
          <p>
            {paper.status !== "PENDING" && paper.status !== "REVIEWING" && (
              <span>Grade: {paper.grade} - </span>
            )}
            <span className={`status ${paper.status.toLowerCase()}`}>
              {paper.status}
            </span>
          </p>
        </div>
      </header>
      <div className="content">
        {type === "full" && (
          <div className="content-center">
            <h5>Abstract</h5>
            <p>{paper.summary}</p>
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
              onClick={() =>
                dispatch(
                  downloadFile({
                    paperId: paper.paperId,
                    fileName: paper.linkPDF,
                  })
                )
              }
            >
              Download PDF
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Paper;
