import { FormRow, FormRowSelect, PaperContainer } from "../../../components";
import { useSelector, useDispatch } from "react-redux";
import { default as ContainerWrapper } from "../../../assets/wrappers/Container";
import { default as SearchWrapper } from "../../../assets/wrappers/SearchContainer";
import { search } from "../../../context/service/paperService";
import { handleChange } from "../../../context/service/utilService";
import { Journal } from "../../../components"

const MemberSearch = () => {
  const {
    isLoading,
    member: {
      searchKeyword,
      searchResult,
      searchJournalType,
      journalSearchOptions,
    },
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
    dispatch(search({ keyword: searchKeyword, type: searchJournalType }));
  };

  return (
    <div>
      <SearchWrapper>
        <form className="form">
          <div className="journal-form">
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
          </div>
        </form>
      </SearchWrapper>
      {/* TODO: refactor not to use container */}
      {searchJournalType === "Journal" ? (
        <ContainerWrapper>
          <div className="container">
            {searchResult.map((journal, index) => {
              return <Journal key={index} journal={journal} />;
            })}
          </div>
        </ContainerWrapper>
      ) : (
        <PaperContainer />
      )}
    </div>
  );
};
export default MemberSearch;
