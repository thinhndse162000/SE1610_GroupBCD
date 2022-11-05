const user = localStorage.getItem("user");
const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

const author = {
  submittedPapers: [],
  editPaperId: "",
  paperDetail: {},
  editPaper: {
    paperTitle: "",
    paperSummary: "",
    paperJournal: {}, 
    paperPdfFile: { fileName: "", file: "" },
    paperFields: [],
  },

  newPaper: {
    paperTitle: "",
    paperSummary: "",
    paperJournal: {}, 
    paperPdfFile: { fileName: "", file: "" },
    paperFields: [],
  },

  searchJournal: {
    keyword: "",
    fields: [],
    result: [],
    page: 1,
    numOfPage: 1,
    totalFound: 0,
  },
  search: {
    keyword: "",
    startDate: "",
    endDate: "",
    status: "ALL",
    page: 1,
    numOfPage: 1,
    totalFound: 0,
    fields: [],
    result: [],
  },
  paperStatusOptions: ["PENDING", "REVIEWING", "ACCEPTED", "REJECTED", "PUBLISH"],
};
const admin = {
  editJournalID: "",
  journal: [],
  newJournal: {
    name: "",
    introduction: "",
    organization: "",
    issn: "",
    managerEmail: "",
    journalFields: [],
    numberOfRound: 0,
    numberOfReviewer: 0,
  },
  search: {
    keyword: "",
    fields: [],
    result: [],
    page: 1,
    numOfPage: 1,
    totalFound: 0,
  },
};

const reviewer = {
  invitations: [],
  invitationDetail: {},
  reviewReports: [],
  reviewDetail: {},
  editReviewId: "",
  searchInvitation: {
    title: "",
    status: "ALL",
    startDate: "",
    page: 1,
    numOfPage: 1,
    totalFound: 0,
    result: [],
  },
  searchReview: {
    title: "",
    status: "ALL",
    verdict: "ALL",
    page: 1,
    numOfPage: 1,
    totalFound: 0,
    result: [],
  },
  newReview: {
    reviewPaper: {},
    reviewNote: "",
    reviewGrade: 0,
    reviewConfidentiality: 0,
    reviewVerdict: "ACCEPTED",
  }
}

const member = {
  search: {
    keyword: "",
    type: "Journal",
    options: ["Journal", "Paper"],
    fields: [],
    result: [],
    page: 1,
    numOfPage: 1,
    totalFound: 0,
  },
  journalDetailId: '',
  journalSlug: '',
  journal: {},
  journalSubscribe: {
    endDate: "",
    subscribed: false,
  },
  profile: {
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    organization: "",
    dateOfBirth: "",
  },
  reviewerSetting: {
    fields: [],
    invitable: false,
  },
  issuePublishes: {},
  publish: null,
  authorProfile: null,
  authorPublish: [],
};

const manager = {
  searchPaper: {
    keyword: "",
    status: "ALL",
    startDate: "",
    page: 1,
    numOfPage: 1,
    result: [],
    totalFound: 0,
  },
  publishIssue: {
    acceptedPapers: [],
    publishes: [],
    startDate: "",
    endDate: "",
    latestIssue: {},
    confirm: false,
    result: [],
    page: 1,
    numOfPage: 1,
    totalFound: 0,
  },
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
  redirectUrl: "",
  user: user ? user : "",
  token: token,
  showSidebar: false,
  viewType: "author",
  fields: [],
  invitationStatus: ["PENDING", "ACCEPTED", "REJECTED", "CANCEL", "DUEDATE"],
};

const initialState = {
  base,
  author,
  reviewer,
  member,
  manager,
};

export { initialState, base, reviewer, author, member, manager, admin };
