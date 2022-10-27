import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Loading, ReviewReport, Paper } from "../../../components";
import { getPaperDetail } from "../../../context/service/paperService";
import { default as ContainerWrapper } from "../../../assets/wrappers/Container";
import { default as PageButtonWrapper } from "../../../assets/wrappers/PageBtnContainer";

const AuthorPaperDetail = () => {
  const { paperId } = useParams();
  const {
    base: { isLoading },
    author: { paperDetail },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [currentRound, setCurrentRound] = useState();
  useEffect(() => {
    dispatch(getPaperDetail(paperId));
  }, [paperId, dispatch]);

  useEffect(() => {
    if (paperDetail.paper != null) {
      setCurrentRound(paperDetail.paper.round);
    }
  }, [paperDetail]);

  if (isLoading) {
    return <Loading center />;
  }

  if (Object.keys(paperDetail).length !== 0) {
    return (
      <>
        <ContainerWrapper>
          <div className="container">
            <h3>Paper</h3>
            <Paper type="full" paper={paperDetail.paper} />
          </div>
        </ContainerWrapper>
        <PageButtonWrapper>
          <h3>Select round</h3>
          <div className="btn-container">
            {(() => {
              let buttons = [];
              for (var i = 0; i < paperDetail.paper.round; i++) {
                const index = i;
                buttons.push(
                  <button
                    key={index}
                    type="button"
                    className={
                      currentRound === index + 1 ? "pageBtn active" : "pageBtn"
                    }
                    onClick={() => {
                      setCurrentRound(index + 1);
                    }}
                  >
                    {i + 1}
                  </button>
                );
              }
              return buttons;
            })()}
          </div>
        </PageButtonWrapper>
        <ContainerWrapper>
          <div className="container">
            <h3>Reviews for round: {currentRound}</h3>
            {paperDetail.reviews.map((review, index) => {
              if (review.round === currentRound) {
                return <ReviewReport key={index} review={review} />;
              }
            })}
          </div>
        </ContainerWrapper>
      </>
    );
  }
  return (
    <div>
      <p>Loading</p>
    </div>
  );
};

export default AuthorPaperDetail;
