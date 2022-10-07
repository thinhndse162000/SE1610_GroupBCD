import { useSelector } from "react-redux";
import Wrapper from "../../assets/wrappers/Container";
import Journal from "../Journal";
const JournalContainer = () => {
  const searchResult = useSelector((state) => state.member.searchResult);
  return (
    <Wrapper>
      <div className="container">
        {searchResult.map((journal, index) => {
          return <Journal key={index} journal={journal} />;
        })}
      </div>
    </Wrapper>
  );
};

export default JournalContainer;
