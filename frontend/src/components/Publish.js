import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Item";
import { downloadFile } from "../context/service/paperService";

const Publish = ({
  publish,
  type = "compact",
  link,
  download = true,
  action = [],
}) => {
  const { paper } = publish;
  // const body = action.length > 0 || type === "full";
  const body = true;
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
          <Link to={`/author-profile/${paper.authors.slug}`}>
            <p>Author: {paper.authors.fullName}</p>
          </Link>

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
            {paper.numberOfPage} {paper.numberOfPage > 1 ? "pages" : "page"} -{" "}
            <span>Access Level: {publish.accessLevel}</span>
          </p>
        </div>
      </header>
      {body && (
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

              {download ? (
                <button
                  type="button"
                  className="btn edit-btn"
                  onClick={() => dispatch(downloadFile(paper.paperId))}
                >
                  Download PDF
                </button>
              ) : (
                <>
                  <span>Subscribe to journal to view </span>
                  <Link
                    to={`/journal/${publish.issue.journal.slug}`}
                    className="btn edit-btn"
                  >
                    Subscribe
                  </Link>
                </>
              )}
            </div>
          </footer>
        </div>
      )}
    </Wrapper>
  );
};

export default Publish;
