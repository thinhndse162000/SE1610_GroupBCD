import Wrapper from "../../../assets/wrappers/Container";
import { Paper, PaperCompact } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSentPaper } from "../../../context/service/journalService";

const JournalPaper = () => {
  const dispatch = useDispatch();
  const { sentPapers: papers } = useSelector((state) => state.manager);

  useEffect(() => {
    dispatch(getSentPaper());
  }, []);

  return (
    <>
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
              return <PaperCompact key={index} paper={paper} action={action} />;
            })}
          </div>
        </Wrapper>
      )}
    </>
  );
};

export default JournalPaper;
