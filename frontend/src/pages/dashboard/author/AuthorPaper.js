import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  SearchContainer,
  Loading,
  AuthorPaperContainer,
} from "../../../components";
import { showAuthorPaper } from "../../../context/service/paperService";

const AuthorPaper = () => {
  const {
    base: { isLoading },
    author: { submittedPapers: papers },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    // FIXME: Performance issue when enter this component
    dispatch(showAuthorPaper());
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <>
      {/* <SearchContainer /> */}
      {papers.length > 0 && <AuthorPaperContainer />}
    </>
  );
};

export default AuthorPaper;
