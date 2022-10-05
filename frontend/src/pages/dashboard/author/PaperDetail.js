import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Loading, Paper, ReviewReport } from "../../../components";
import { getPaperDetail } from "../../../context/service/paperService";
import { default as ContainerWrapper } from "../../../assets/wrappers/Container";

const PaperDetail = () => {
  const { paperId } = useParams();
  const {
    base: { isLoading },
    author: { paperDetail },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPaperDetail(paperId));
  }, [paperId, dispatch]);

  if (isLoading) {
    return <Loading center />;
  }

  if (Object.keys(paperDetail).length !== 0) {
    return (
      <>
        <Paper paper={paperDetail.paper} />
        <ContainerWrapper>
          <div className="container">
            {paperDetail.reviews.map((review, index) => {
              return <ReviewReport key={index} review={review} />;
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

export default PaperDetail;
