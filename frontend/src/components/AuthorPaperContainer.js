import { useSelector, useDispatch } from "react-redux";
import Wrapper from '../assets/wrappers/AuthorPaperContainer'
import Paper from './Paper'
import { setEditPaper, deletePaper } from '../context/service/paperService'

const AuthorPaperContainer = () => {
  const papers = useSelector((state) => (state.author.submittedPapers))
    const dispatch = useDispatch()
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
                onClick: () => dispatch(setEditPaper(paper.paperId)),
              },
              {
                type: 'button',
                className: 'btn delete-btn',
                label: 'Delete',
                onClick: () => dispatch(deletePaper(paper.paperId))
              }
            ]
            return <Paper key={index} paper={paper} action={action}></Paper>;
          })}
        </div>
      </Wrapper>
    );
  }
  
  export default AuthorPaperContainer