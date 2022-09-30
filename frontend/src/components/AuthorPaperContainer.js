import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/AuthorPaperContainer'
import Paper from './Paper'

const AuthorPaperContainer = () => {
    const { authorPapers: papers } = useAppContext()
    return (
      <Wrapper>
        <div className="papers">
          {/* TODO: add list of action */}
          {papers.map((paper, index) => {
            return <Paper key={index} paper={paper}></Paper>;
          })}
        </div>
      </Wrapper>
    );
  }
  
  export default AuthorPaperContainer