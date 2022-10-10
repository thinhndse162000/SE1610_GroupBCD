import Wrapper from "../../../assets/wrappers/Container";
import { Paper } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getJournalFromManager,
  getSentPaper,
} from "../../../context/service/journalService";

const JournalPaper = () => {
  const dispatch = useDispatch();
  const { sentPapers: papers, journal } = useSelector((state) => state.manager);

  useEffect(() => {
    dispatch(getSentPaper());
    dispatch(getJournalFromManager());
  }, [dispatch]);

  // TODO: get journal title
  return (
    <>
      {journal != null && (
        <div>
          <h4>{journal.name}</h4>
          <div>
            <p>
              Organization: {journal.organization} - ISSN: {journal.issn}
            </p>
          </div>
        </div>
      )}
      {papers.length > 0 && (
        <Wrapper>
          <div className="container">
            {papers.map((paper, index) => {
              let action = [];
              if (paper.status === "PENDING") {
                action.push({
                  type: "link",
                  to: `send-invitation/${paper.paperId}`,
                  className: "btn edit-btn",
                  label: "Send invitation",
                });
              }
              action.push({
                type: "link",
                to: `paper-detail/${paper.paperId}`,
                className: "btn edit-btn",
                label: "Detail",
              });
              return <Paper key={index} paper={paper} action={action} />;
            })}
          </div>
        </Wrapper>
      )}
    </>
  );
};

export default JournalPaper;
