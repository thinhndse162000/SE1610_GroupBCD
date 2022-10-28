import Wrapper from "../assets/wrappers/Item";
import { Link } from "react-router-dom";

const Reviewer = ({ reviewer, action = [] }) => {
  return (
    <Wrapper>
      <div className="content">
        <div className="content-center">
          <h5>{reviewer.fullName}</h5>
          <p><strong>Fields:</strong> {reviewer.fields.map((field, index) => <span key={index}>{field.fieldName}{index !== reviewer.fields.length - 1 && ","} </span>)}</p>
        </div>
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

export default Reviewer;
