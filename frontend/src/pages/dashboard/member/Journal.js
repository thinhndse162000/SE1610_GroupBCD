import {
  FormRow,
  FormRowSelect,
  JournalContainer,
  PaperContainer,
} from "../../../components";
import { useSelector, useDispatch } from "react-redux";
import { default as SearchWrapper } from "../../../assets/wrappers/SearchContainer";
import {
  search
} from "../../../context/service/paperService";
import { handleChange } from "../../../context/service/utilService";
const Journal = () => {
  const {
    isLoading,
    member: { searchKeyword, searchJournalType, journalSearchOptions },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    if (isLoading) return;
    dispatch(
      handleChange({
        name: e.target.name,
        value: e.target.value,
        type: "member",
      })
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(search({ keyword: searchKeyword, type: searchJournalType }))
  };

  return (
    <div>
      <SearchWrapper>
        <form className="form">
          <FormRow
            labelText="Keyword"
            type="text"
            name="searchKeyword"
            value={searchKeyword}
            handleChange={handleInputChange}
          />
          <FormRowSelect
            labelText="Type"
            name="searchJournalType"
            value={searchJournalType}
            handleChange={handleInputChange}
            list={[...journalSearchOptions]}
          />
          <button className="btn" disabled={isLoading} onClick={handleSearch}>
            Search
          </button>
        </form>
      </SearchWrapper>
      {searchJournalType === "Journal" ? (
        <JournalContainer />
      ) : (
        <PaperContainer />
      )}
    </div>
  );
};
export default Journal;
