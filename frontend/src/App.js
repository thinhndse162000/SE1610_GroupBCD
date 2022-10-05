import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signup, Landing, Error, ProtectedRoute, Login } from "./pages";
import {
  SharedLayout,
  AuthorPaper,
  AddPaper,
  Journal,
  AddReview,
  ReviewerInvitation,
  PaperDetail,
  AllReviewReport,
  ReviewReportDetail,
} from "./pages/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout viewType="member"/>
            </ProtectedRoute>
          }
        >
          <Route index element={<Journal />} />
        </Route>

        <Route
          path="/author"
          element={
            <ProtectedRoute>
              <SharedLayout viewType="author"/>
            </ProtectedRoute>
          }
        >
          <Route index element={<AuthorPaper />} />
          <Route path="paper-detail/:paperId" element={<PaperDetail />} />
          <Route path="submit-paper" element={<AddPaper />} />
        </Route>

        <Route
          path="/reviewer"
          element={
            <ProtectedRoute>
              <SharedLayout viewType="reviewer"/>
            </ProtectedRoute>
          }
        >
          <Route index element={<AllReviewReport />} />
          <Route path="submit-review" element={<AddReview />} />
          <Route path="review-detail/:reviewId" element={<ReviewReportDetail />} />
          <Route path="invitation" element={<ReviewerInvitation />} />
        </Route>

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
