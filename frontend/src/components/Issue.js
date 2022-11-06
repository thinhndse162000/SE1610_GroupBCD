import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { default as ItemWrapper } from "../assets/wrappers/Item";
import { downloadIssueFile } from "../context/service/journalService";

const Issue = ({ issue, link, download = true }) => {
  const dispatch = useDispatch();
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
        <div className="content">

          <footer>
            <div className="actions">
              {download ? (
                <button
                  type="button"
                  className="btn edit-btn"
                  onClick={() => dispatch(downloadIssueFile({ issueId: issue.issueId, fileName: issue.linkPDF }))}
                >
                  Download PDF
                </button>
              ) : (
                <>
                  <span>Subscribe to journal to view </span>
                  <Link
                    to={`/journal/${issue.journal.slug}`}
                    className="btn edit-btn"
                  >
                    Subscribe
                  </Link>
                </>
              )}
            </div>
          </footer>
        </div>
    </ItemWrapper>
  );
};

export default Issue;
