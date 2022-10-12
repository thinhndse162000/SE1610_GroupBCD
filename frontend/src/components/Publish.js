import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Item";
import { downloadFile } from "../context/service/paperService";

const Publish = ({ publish, type = "compact", link, action = [] }) => {
  const { paper } = publish;
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
          <p>Author: {paper.authors.fullName}</p>
          <p>
            {paper.numberOfPage} {paper.numberOfPage > 1 ? "pages" : "page"} -
            <span>Access Level: {publish.accessLevel}</span>
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

export default Publish;
