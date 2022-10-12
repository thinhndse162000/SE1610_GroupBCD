import { default as ContainerWrapper } from "../../../assets/wrappers/Container";
import { default as ItemWrapper } from "../../../assets/wrappers/Item";
import { Paper } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getJournalFromManager,
  getSentPaper,
} from "../../../context/service/journalService";

const ManagerPaper = () => {
  const dispatch = useDispatch();
  const { sentPapers: papers, journal } = useSelector((state) => state.manager);

  useEffect(() => {
    dispatch(getSentPaper());
    dispatch(getJournalFromManager());
  }, [dispatch]);

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
              return <Paper key={index} paper={paper} link={ `paper-detail/${paper.paperId}`} action={action} />;
            })}
          </div>
        </ContainerWrapper>
      )}
    </>
  );
};

export default ManagerPaper;
