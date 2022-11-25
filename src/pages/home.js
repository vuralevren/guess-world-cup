import Fixtures from "../components/fixtures";
import LeagueTable from "../components/leaugue-table";
import Template from "../components/template";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { leagueActions } from "../redux/league/leagueSlice";
import { matchActions } from "../redux/match/matchSlice";

export default function Home(params) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { leagueSlug } = useParams();

  const teamId = useSelector((state) => state.league.teamId);

  useEffect(() => {
    if (leagueSlug)
      dispatch(
        leagueActions.getLeagueBySlugRequest({
          leagueSlug,
          onFailure: () => {
            navigate("/");
          },
        })
      );
  }, [leagueSlug]);

  useEffect(() => {
    if (teamId)
      dispatch(
        matchActions.getPredictionsRequest({
          teamId,
        })
      );
  }, [teamId]);

  useEffect(() => {
    return () => {
      dispatch(leagueActions.setTeamId(undefined));
    };
  }, []);

  return (
    <>
      <Template>
        <LeagueTable />
        <Fixtures />
      </Template>
    </>
  );
}
