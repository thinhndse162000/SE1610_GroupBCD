import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  SearchContainer,
  Loading,
  AuthorPaperContainer,
} from "../../../components";
import { getAuthorPaper } from "../../../context/service/paperService";

const AuthorPaper = () => {
  const {
    base: { isLoading },
    author: { submittedPapers: papers },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAuthorPaper());
  }, [dispatch]);

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <>
      {/* <SearchContainer />
        TODO: Refoctor to not use container */}
      {papers.length > 0 ? <AuthorPaperContainer /> : <p>No submitted paper yet</p>}
    </>
  );
};

export default AuthorPaper;
