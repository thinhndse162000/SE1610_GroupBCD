import { Link } from "react-router-dom";
import { default as ItemWrapper } from "../assets/wrappers/Item";

const Issue = ({ issue, link }) => {
  return (
    <ItemWrapper>
      <header>
        <div className="info">
          {link != null ? (
            <Link to={link}>
              <h5>
                Volume {issue.volume} - Issue {issue.issue}
              </h5>
            </Link>
          ) : (
            <h5>
              Volume {issue.volume} - Issue {issue.issue}
            </h5>
          )}

          <p>
            {issue.numberOfPage} {/* TODO: format date */}
            {issue.numberOfPage > 1 ? "pages" : "page"}
            {" - "}
            {issue.numberOfPaper} papers
          </p>
          <p>
            From: {issue.startDate} - To: {issue.endDate}
          </p>
        </div>
      </header>
    </ItemWrapper>
  );
};

export default Issue;
