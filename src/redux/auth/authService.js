import { auth, db, endpoint } from "../../configs/altogic";

const authService = {
  register(user) {
    return auth.signUpWithEmail(user.email, user.password, user);
  },
  checkUserName(userName) {
    return endpoint.post("/user/userName", { userName });
  },
  signIn(email, password) {
    return auth.signInWithEmail(email, password);
  },
  forgotPassword(email) {
    return auth.sendResetPwdEmail(email);
  },
  signInWithToken(accessToken) {
    return auth.getAuthGrant(accessToken);
  },
  signOut() {
    return auth.signOut();
  },
};

export default authService;
