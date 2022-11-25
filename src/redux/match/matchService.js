import { auth, db, endpoint } from "../../configs/altogic";

const matchService = {
  getPredictions(teamId) {
    return db
      .model("predictions")
      .filter(`userTeam == '${teamId}'`)
      .lookup({ field: "match" })
      .get();
  },
  guessScore(prediction) {
    return db.model("predictions").object(prediction._id).update(prediction);
  },
  getCurrentWeek() {
    return db.model("game_settings").filter("isCurrent").getSingle();
  },
  getWeekMatches(week) {
    return db.model("matches").filter(`week == ${week}`).get();
  },
  createPredictions(predictions) {
    return db.model("predictions").create(predictions);
  },
};

export default matchService;
