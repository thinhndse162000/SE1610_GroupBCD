import { useAppContext } from "../context/appContext";
import Wrapper from '../assets/wrappers/AuthorPaperContainer'
import Paper from "./Paper";

const PaperContainer = () => {
    const {
        searchResult,
    } = useAppContext()
    return (
        <Wrapper>
          <div className="papers">
            {searchResult.map((paper, index) => {
              return <Paper key={index} paper={paper} />;
            })}
          </div>
        </Wrapper>
      );
}

export default PaperContainer