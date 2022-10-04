import { useSelector } from "react-redux";
import Wrapper from "../../assets/wrappers/Container";
import Paper from "../Paper";

const PaperContainer = () => {
  const searchResult = useSelector((state) => state.member.searchResult);
  return (
    <Wrapper>
      <div className="container">
        {searchResult.map((paper, index) => {
          return <Paper key={index} paper={paper} />;
        })}
      </div>
    </Wrapper>
  );
};

export default PaperContainer;
