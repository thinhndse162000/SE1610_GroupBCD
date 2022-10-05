import Wrapper from "../assets/wrappers/Item";

const ReviewReport = ({ review }) => {
  console.log(review)
  return (
    <Wrapper>
      <header>
        <div className="info">
          <h5>{review.reviewer.fullName}</h5>
          {review.status === "DONE" && (
            <p>
              Grade: {review.grade} - Confidentiality: {review.confidentiality}{" "}
              - Verdict:{" "}
              <span className={`status ${review.verdict.toLowerCase()}`}>
                {review.verdict}
              </span>
            </p>
          )}
        </div>
      </header>
      <div className="content">
        <h5>Note</h5>
        <p>{review.note}</p>
      </div>
    </Wrapper>
  );
};

export default ReviewReport;
