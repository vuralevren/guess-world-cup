import { auth, db, endpoint } from "../../configs/altogic";

const authService = {
  register(user) {
    return auth.signUpWithEmail(user.email, user.password, user);
  },
  checkUserName(userName, userId) {
    return endpoint.post("/user/userName", { userName, userId });
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
  getUserFromDB() {
    return auth.getUserFromDB();
  },
  setUser(user) {
    auth.setUser(user);
  },
  updateUserFields(userId, fields) {
    return db.model("users").object(userId).update(fields);
  },
};

export default authService;
