import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./sections/Home";
import PasswordReset from "./components/PasswordReset";
import PasswordResetConfirm from "./components/PasswordResetConfirm";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Dashboard from "./components/Dashboard";
import Users from "./components/Users";
import PasswordChange from "./components/PasswordChange";
import NavBar from "./components/NavBar";
import NotFound from "./components/NotFound";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/password/reset/" element={<PasswordReset />} />
        <Route
          path="/password/reset/confirm/:uid/:token"
          element={<PasswordResetConfirm />}
        />
        <Route path="/password/change" element={<PasswordChange />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />}>
          "Not Found"
        </Route>
        <Route path="/users" element={<Users />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
