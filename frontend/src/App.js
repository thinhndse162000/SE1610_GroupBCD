import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signup, Landing, Error, ProtectedRoute, Login } from "./pages";
import {
  SharedLayout,
  AuthorPaper,
  AddPaper,
  Journal,
  AddReview,
  ReviewerInvitation,
} from "./pages/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Journal />} />
        </Route>

        <Route
          path="/author"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AuthorPaper />} />
          <Route path="submit-paper" element={<AddPaper />} />
        </Route>

        <Route
          path="/reviewer"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AddReview />} />
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
