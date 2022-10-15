const user = localStorage.getItem("user");
const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

const author = {
  submittedPapers: [],
  editPaperId: "",
  paperDetail: {},
  newPaper: {
    paperTitle: "",
    paperSummary: "",
    paperJournal: { journalName: "", journalId: "" },
    paperPdfFile: { fileName: "", file: "" },
    paperFields: [],
  },
  search: {
    keyword: "",
    startDate: "",
    endDate: "",
    status: "ALL",
    page: 1,
    numOfPage: 10,
    fields: [],
    result: [],
  },
  paperStatusOptions: ["PENDING", "REVIEWING", "ACCEPTED", "REJECTED", "PUBLISH"],
};

const reviewer = {
  invitations: [],
  reviewReports: [],
  editReviewId: "",
  newReview: {
    reviewPaper: {},
    reviewNote: "",
    reviewGrade: 0,
    reviewConfidentiality: 0,
    reviewVerdict: "",
  }
}

const member = {
  search: {
    keyword: "",
    type: "Journal",
    options: ["Journal", "Paper"],
    fields: [],
    result: [],
    profile: {},
    page: 1,
    numOfPage: 1,
  },
  journalDetailId: '',
  journalSlug: '',
  journal: {},
  profile: {},
  issuePublishes: {},
  publish: null,
  authorProfile: null,
  authorPublish: [],
};

const manager = {
  sentPapers: [],
  sentInvitations: [],
  availableReviewers: [],
  paper: {},
  journal: {},
  issues: {},
}

const base = {
  role: role,
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
  reviewer,
  member,
  manager,
};

export { initialState, base, reviewer, author, member, manager };
