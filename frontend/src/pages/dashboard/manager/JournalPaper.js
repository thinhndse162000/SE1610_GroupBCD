import { default as ContainerWrapper } from "../../../assets/wrappers/Container";
import { default as ItemWrapper } from "../../../assets/wrappers/Item";
import { Paper, PaperCompact } from "../../../components";
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
        <ItemWrapper>
          <header>
            <div className="info">
              <h5>{journal.name}</h5>
            </div>
          </header>
          <div className="content">
            <p>
              <strong>ISSN</strong>: {journal.issn} -{" "}
              <strong>Organization</strong>: {journal.organization}
            </p>
          </div>
        </ItemWrapper>
      )}
      {papers.length > 0 && (
        <ContainerWrapper>
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
              return <PaperCompact key={index} paper={paper} action={action} />;
            })}
          </div>
        </ContainerWrapper>
      )}
    </>
  );
};

export default JournalPaper;
