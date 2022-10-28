import {
  REVIEW_REPORT,
  SET_EDIT_REVIEW,
  CLEAR_REVIEW_VALUES,
  HANDLE_REVIEWER_CHANGE,
  HANDLE_NEWREVIEW_CHANGE,
  HANDLE_INVITATION_CHANGE,
} from "../actions";
import { reviewer } from "../state";

const reviewerReducer = (state = reviewer, action) => {
  switch (action.type) {
    case HANDLE_REVIEWER_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      }
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
      const reviewReport = state.searchReview.result.find(
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
    case HANDLE_NEWREVIEW_CHANGE:
      return {
        ...state,
        newReview: {
          ...state.newReview,
          [action.payload.name]: action.payload.value,
        },
      };
    case HANDLE_INVITATION_CHANGE:
      const invitations = state.searchInvitation.result.map((invitation) => {
        if (invitation.invitationId === action.payload.id) {
          return { ...invitation, status: action.payload.status };
        }
        return invitation;
      });

      if (state.invitationDetail.invitationId === action.payload.id) {
        return {
          ...state,
          searchInvitation: {
            ...state.searchInvitation,
            result: invitations,
          },
          invitationDetail: {
            ...state.invitationDetail,
            status: action.payload.status,
          }
        };
      } else {
        return {
          ...state,
          searchInvitation: {
            ...state.searchInvitation,
            result: invitations
          },
        };
      }

    case "HANDLE_REVIEWER_SEARCHINVITATION_CHANGE":
      return {
        ...state,
        searchInvitation: {
          ...state.searchInvitation,
          [action.payload.name]: action.payload.value,
        }
      }
    case "HANDLE_REVIEWER_SPREAD_SEARCHINVITATION_CHANGE":
      return {
        ...state,
        searchInvitation: {
          ...state.searchInvitation,
          ...action.payload.value,
        }
      }

    case "HANDLE_REVIEWER_SEARCHREVIEW_CHANGE":
      return {
        ...state,
        searchReview: {
          ...state.searchReview,
          [action.payload.name]: action.payload.value,
        }
      }
    case "HANDLE_REVIEWER_SPREAD_SEARCHREVIEW_CHANGE":
      return {
        ...state,
        searchReview: {
          ...state.searchReview,
          ...action.payload.value,
        }
      }

    default:
      return state;
  }
};

export default reviewerReducer;
