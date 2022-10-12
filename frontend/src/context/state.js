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
    status: "",
    fields: [],
    result: [],
  },
  paperStatusOptions: ["pending", "reviewing", "accepted", "rejected", "publish"],
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
  },
  journalDetailId: '',
  journalSlug: '',
  journal: {},
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
