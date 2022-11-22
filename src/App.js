import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";

import makeStore from "./redux/store";
import Home from "./pages/home";
import NewLeague from "./pages/new-league";
import Settings from "./pages/settings";
import SignIn from "./pages/sign-in";
import CreateAnAccount from "./pages/create-an-account";
import ForgotPassword from "./pages/forgot-password";
import ForgotPasswordEmail from "./pages/forgot-password-email";
import AuthRedirect from "./pages/auth-redirect";

import * as ProtectedRoute from "./components/core/protected-route";

const store = makeStore();

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Private Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute.Private mustHasLeague>
                <Home />
              </ProtectedRoute.Private>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute.Private>
                <Settings />
              </ProtectedRoute.Private>
            }
          />
          {/* Public Routes */}
          <Route
            path="/sign-in"
            element={
              <ProtectedRoute.Public>
                <SignIn />
              </ProtectedRoute.Public>
            }
          />
          <Route
            path="/create-an-account"
            element={
              <ProtectedRoute.Public>
                <CreateAnAccount />
              </ProtectedRoute.Public>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <ProtectedRoute.Public>
                <ForgotPassword />
              </ProtectedRoute.Public>
            }
          />
          <Route
            path="/forgot-password-email"
            element={
              <ProtectedRoute.Public>
                <ForgotPasswordEmail />
              </ProtectedRoute.Public>
            }
          />
          <Route path="/new-league" element={<NewLeague />} />
          <Route path="/auth-redirect" element={<AuthRedirect />} />
        </Routes>
      </Router>
    </Provider>
  );
}
