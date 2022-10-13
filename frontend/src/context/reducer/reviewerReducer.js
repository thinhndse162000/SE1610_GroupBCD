import {
  INVITATION,
  REVIEW_REPORT,
  SET_EDIT_REVIEW,
  CLEAR_REVIEW_VALUES,
  HANDLE_REVIEW_CHANGE,
  HANDLE_INVITATION_CHANGE,
} from "../actions";
import { reviewer } from "../state";

const reviewerReducer = (state = reviewer, action) => {
  switch (action.type) {
    case INVITATION:
      return {
        ...state,
        invitations: action.payload.invitations,
      };
    case CLEAR_REVIEW_VALUES:
      const reviewer = {
        editReviewId: "",
        newReview: {
          reviewPaper: {},
          reviewNote: "",
          reviewGrade: 0,
          reivewConfidentiality: 0,
          reviewVerdict: "",
        },
      };

      return {
        ...state,
        ...reviewer,
      };
    case REVIEW_REPORT:
      return {
        ...state,
        reviewReports: action.payload.reviewReports,
      };
    case SET_EDIT_REVIEW:
      const reviewReport = state.reviewReports.find(
        (reviewReport) =>
          reviewReport.review.reviewReportId === action.payload.id
      );
      return {
        ...state,
        editReviewId: action.payload.id,
        newReview: {
          ...state.newReview,
          reviewPaper: reviewReport.paper,
        },
      };
    case HANDLE_REVIEW_CHANGE:
      return {
        ...state,
        newReview: {
          ...state.newReview,
          [action.payload.name]: action.payload.value,
        },
      };
    case HANDLE_INVITATION_CHANGE:
      const invitations = state.invitations.map((invitation) => {
        if (invitation.invitationId === action.payload.id) {
          return { ...invitation, status: action.payload.status };
        }
        return invitation;
      });

      return {
        ...state,
        invitations,
      };
    default:
      return state;
  }
};

export default reviewerReducer;
