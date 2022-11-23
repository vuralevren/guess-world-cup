import { auth, db, endpoint } from "../../configs/altogic";

const leagueService = {
  create({ teamName, leagueName, leaguePassword, userName }) {
    return endpoint.put("league", {
      teamName,
      leagueName,
      leaguePassword,
      userName,
    });
  },
  checkLeagueName(leagueName, leagueId) {
    return endpoint.post("/league/leagueName", { leagueName, leagueId });
  },
  getLeagueBySlug(leagueSlug) {
    return db.model("leagues").filter(`slug == '${leagueSlug}'`).get();
  },
  getTeamsByLeagueSlug(leagueSlug) {
    return db
      .model("user_teams")
      .filter(`leagueSlug == '${leagueSlug}'`)
      .lookup({ field: "user" })
      .get();
  },
};

export default leagueService;
