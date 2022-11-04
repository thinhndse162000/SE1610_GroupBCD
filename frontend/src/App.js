import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Signup,
  Landing,
  Error,
  ProtectedRoute,
  Login,
  ManagerProtectedRoute,
  ForgotPassword,
  VerifySignup,
} from "./pages";
import {
  SharedLayout,
  AuthorPaper,
  AuthorAddPaper,
  MemberSearch,
  AddReview,
  ReviewerInvitation,
  AuthorPaperDetail,
  AllReviewReport,
  ReviewReportDetail,
  ReviewerInvitationDetail,
  ManagerPaper,
  ManagerPublishIssue,
  SendInvitation,
  MemberJournalDetail,
  MemberIssues,
  MemberPublishes,
  MemberIssueDetail,
  MemberPublishDetail,
  MemberAuthorProfile,
  MemberCheckout,
} from "./pages/dashboard";
import ManagerJournal from "./pages/dashboard/admin/ManagerJournal";
import ViewJournalList from "./pages/dashboard/admin/ViewJournalList";
import AuthorEditPaper from "./pages/dashboard/author/AuthorEditPaper";
import ChangePassword from "./pages/dashboard/profile/ChangePassword";
import ViewProfle from "./pages/dashboard/profile/ViewProfle";
import ViewReviewingSetting from "./pages/dashboard/profile/ViewReviewingSetting";
import VerifyForgotPassword from "./pages/VerifyForgotPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout viewType="member" />
            </ProtectedRoute>
          }
        >
          <Route index element={<MemberSearch />} />
          <Route path="journal/:slug" element={<MemberJournalDetail />} />
          <Route path="journal/:slug/issue" element={<MemberIssues />} />
          <Route path="journal/:slug/publish" element={<MemberPublishes />} />
          <Route path="journal/:slug/subscribe" element={<MemberCheckout />} />
          <Route path="issue/:issueId" element={<MemberIssueDetail />} />
          <Route path="publish/:publishId" element={<MemberPublishDetail />} />
          <Route
            path="author-profile/:slug"
            element={<MemberAuthorProfile />}
          />
        </Route>

        <Route
          path="/author"
          element={
            <ProtectedRoute>
              <SharedLayout viewType="author" />
            </ProtectedRoute>
          }
        >
          <Route index element={<AuthorPaper />} />
          <Route path="paper-detail/:paperId" element={<AuthorPaperDetail />} />
          <Route path="edit-paper/:paperId" element={<AuthorEditPaper />} />
          <Route path="submit-paper" element={<AuthorAddPaper />} />
        </Route>

        <Route
          path="/reviewer"
          element={
            <ProtectedRoute>
              <SharedLayout viewType="reviewer" />
            </ProtectedRoute>
          }
        >
          <Route index element={<AllReviewReport />} />

          <Route path="submit-review" element={<AddReview />} />
          <Route
            path="review-detail/:reviewId"
            element={<ReviewReportDetail />}
          />
          <Route path="invitation" element={<ReviewerInvitation />} />
          <Route
            path="invitation-detail/:invitationId"
            element={<ReviewerInvitationDetail />}
          />
        </Route>

        <Route
          path="/manager"
          element={
            <ProtectedRoute>
              <SharedLayout viewType="manager" />
            </ProtectedRoute>
          }
        >
          <Route index element={<ManagerPaper />} />
          <Route path="paper-detail/:paperId" element={<AuthorPaperDetail />} />
          <Route path="send-invitation/:paperId" element={<SendInvitation />} />
          <Route path="publish" element={<ManagerPublishIssue />} />
          {/* <Route path="invite" element={<ReviewReportDetail />} /> */}
        </Route>

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <SharedLayout viewType="profile" />
            </ProtectedRoute>
          }
        >
          <Route index element={<ViewProfle />} />
          <Route path="reviewing" element={<ViewReviewingSetting />} />
          <Route path="change-password" element={<ChangePassword />} />
      
        </Route>
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <SharedLayout viewType="admin" />
            </ProtectedRoute>
          }
        >
          <Route index element={<ViewJournalList />} />
          <Route path="create-journal" element={<ManagerJournal />} />
      
        </Route>

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/account/password" element={<VerifyForgotPassword />} />
        <Route path="/auth/verify/:token" element={<VerifySignup />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter >
  );
}

export default App;
