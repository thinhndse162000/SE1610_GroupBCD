import Wrapper from "../assets/wrappers/Item";

const Invitation = ({ invitation, action = [] }) => {
  const { paper } = invitation;
  const { authors } = paper;
  return (
    <Wrapper>
      <header>
        <div className="info">
          <h5>{paper.title}</h5>
          <p>
            Author: {authors.fullName} - {paper.numberOfPage}{" "}
            {paper.numberOfPage > 1 ? "pages" : "page"}
          </p>
        </div>
      </header>
      <div className="content">
        <div>
          <h5>Abstract</h5>
          <p>{paper.summary}</p>
        </div>
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
          <p>
            Invitation status: <span className={`status ${invitation.status.toLowerCase()}`}>
              {invitation.status}
            </span>
          </p>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Invitation;
