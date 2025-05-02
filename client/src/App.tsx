import { Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import { setNavgiate } from "./lib/navigation";
import { ToastContainer } from "react-toastify";
import AppContainer from "./components/AppContainer";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import MainLayout from "./layouts/MainLayout";
import TasksPage from "./pages/TasksPage";

function App() {
  const navgiate = useNavigate();
  setNavgiate(navgiate);
  return (
    <>
      <Routes>
        <Route element={<AppContainer />}>
          <Route element={<MainLayout />}>
            <Route index element={<TasksPage />} />
          </Route>
        </Route>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
