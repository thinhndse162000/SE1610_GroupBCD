import { useEffect } from "react"
import { useAppContext } from '../../context/appContext'
import { SearchContainer, Loading, AuthorPaperContainer } from "../../components"

const AuthorPaper = () => {
  const { showAuthorPaper, isLoading, authorPapers } = useAppContext();

  useEffect(() => {
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