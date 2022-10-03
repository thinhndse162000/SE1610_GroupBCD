const user = localStorage.getItem("user");
const token = localStorage.getItem("token");
const author = {
  submittedPapers: [],
  editPaperId: "",
  detailPaperId: "",
  newPaper: {
    paperTitle: "",
    paperSummary: "",
    paperJournal: { journalName: "", journalId: "" },
    paperPdfFile: { fileName: "", file: "" },
    paperFields: [],
  },
  paperStatusOptions: ["pending", "accepted", "rejected"],
};

const member = {
  searchKeyword: "",
  searchJournalType: "Journal",
  journalSearchOptions: ["Journal", "Paper"],
  searchResult: [],
  journalDetailId: '',
};

const base = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? user : "",
  token: token,
  showSidebar: false,
  viewType: "author",
  fields: [],
};

const initialState = {
  base,
  author,
  member,
};

export { initialState, base, author, member };
