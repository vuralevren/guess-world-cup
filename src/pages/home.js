import Fixtures from "../components/fixtures";
import LeagueTable from "../components/leaugue-table";
import Template from "../components/template";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { leagueActions } from "../redux/league/leagueSlice";

export default function Home(params) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { leagueSlug } = useParams();

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

  return (
    <>
      <Template>
        <LeagueTable />
        <Fixtures />
      </Template>
    </>
  );
}
