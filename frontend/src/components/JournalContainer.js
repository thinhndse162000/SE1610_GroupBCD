import { useAppContext } from "../context/appContext";
import Wrapper from '../assets/wrappers/AuthorPaperContainer'
import Journal from "./Journal";
const JournalContainer = () => {
    const {
        searchResult,
    } = useAppContext()
    return (
      <Wrapper>
        <div className="papers">
          {searchResult.map((journal, index) => {
            return <Journal key={index} journal={journal} />;
          })}
        </div>
      </Wrapper>
    );
}

export default JournalContainer;