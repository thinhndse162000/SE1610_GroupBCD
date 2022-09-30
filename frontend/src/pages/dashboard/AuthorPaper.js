import { useEffect } from "react"
import { useAppContext } from '../../context/appContext'
import { SearchContainer, Loading, AuthorPaperContainer } from "../../components"

const AuthorPaper = () => {
  const { showAuthorPaper, isLoading, authorPapers } = useAppContext();

  useEffect(() => {
    // FIXME: Performance issue when enter this component
    showAuthorPaper()
  }, [])

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <>
      {/* <SearchContainer /> */}
      {authorPapers.length > 0 && <AuthorPaperContainer />}
    </>
  );
};

export default AuthorPaper