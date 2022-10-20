import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Item";

const Invitation = ({ invitation, type = "compact", link, action = [] }) => {
  const { paper } = invitation;
  const { authors } = paper;
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
            Author: {authors.fullName} - {paper.numberOfPage}{" "}
            {paper.numberOfPage > 1 ? "pages" : "page"}
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
        </div>

        <p>
          Invitation status:{" "}
          <span className={`status ${invitation.status.toLowerCase()}`}>
            {invitation.status}
          </span>
        </p>
      </header>
      <div className="content">
        {type === "full" && (
          <div>
            <h5>Abstract</h5>
            <p>{paper.summary}</p>
          </div>
        )}
        <footer>
          <div className="actions">
            {action.map((act, index) => {
              return (
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

export default Invitation;
