import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/AuthorPaperContainer'
import Paper from './Paper'

const AuthorPaperContainer = () => {
    const { authorPapers: papers, setEditPaper, deletePaper } = useAppContext()
    return (
      <Wrapper>
        <div className="papers">
          {/* TODO: add list of action */}
          {papers.map((paper, index) => {
            const action = [
              {
                type: 'link',
                to: 'submit-paper',
                className: 'btn edit-btn',
                label: 'Edit',
                onClick: () => setEditPaper(paper.paperId),
              },
              {
                type: 'button',
                className: 'btn delete-btn',
                label: 'Delete',
                onClick: () => deletePaper(paper.paperId)
              }
            ]
            return <Paper key={index} paper={paper} action={action}></Paper>;
          })}
        </div>
      </Wrapper>
    );
  }
  
  export default AuthorPaperContainer