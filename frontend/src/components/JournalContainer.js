import { useSelector } from "react-redux";
import Wrapper from "../assets/wrappers/AuthorPaperContainer";
import Journal from "./Journal";
const JournalContainer = () => {
  const searchResult = useSelector((state) => state.member.searchResult);
  return (
    <Wrapper>
      <div className="papers">
        {searchResult.map((journal, index) => {
          return <Journal key={index} journal={journal} />;
        })}
      </div>
    </Wrapper>
  );
};

export default JournalContainer;
