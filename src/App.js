import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/home";
import NewLeague from "./pages/new-league";
import Settings from "./pages/settings";
import SignIn from "./pages/sign-in";
import CreateAnAccount from "./pages/create-an-account";
import ForgotPassword from "./pages/forgot-password";
import ForgotPasswordEmail from "./pages/forgot-password-email";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Private Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/new-league" element={<NewLeague />} />
        <Route path="/settings" element={<Settings />} />
        {/* Public Routes */}
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/create-an-account" element={<CreateAnAccount />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/forgot-password-email"
          element={<ForgotPasswordEmail />}
        />
        {/* <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfileView />
            </PrivateRoute>
          }
        /> */}
      </Routes>
    </Router>
  );
}
