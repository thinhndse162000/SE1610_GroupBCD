import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Signup,
  Landing,
  Error,
  ProtectedRoute,
  Login,
  ManagerProtectedRoute,
  ForgotPassword,
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
  ManagerPaper,
  SendInvitation,
  MemberJournalDetail,
  MemberIssues,
  MemberPublishes,
  MemberIssueDetail,
  MemberPublishDetail,
  MemberAuthorProfile,
} from "./pages/dashboard";

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
          <Route
            path="journal/:slug/publish"
            element={<MemberPublishes />}
          />
          <Route path="issue/:issueId" element={<MemberIssueDetail />} />
          <Route path="publish/:publishId" element={<MemberPublishDetail />} />
          <Route path="author-profile/:slug" element={<MemberAuthorProfile />} />
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
        </Route>

        <Route
          path="/manager"
          element={
            <ManagerProtectedRoute>
              <SharedLayout viewType="manager" />
            </ManagerProtectedRoute>
          }
        >
          <Route index element={<ManagerPaper />} />
          <Route path="paper-detail/:paperId" element={<AuthorPaperDetail />} />
          <Route path="send-invitation/:paperId" element={<SendInvitation />} />
          {/* <Route path="invite" element={<ReviewReportDetail />} /> */}
        </Route>

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
