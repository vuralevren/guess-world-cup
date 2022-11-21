import Fixtures from "../components/fixtures";
import LeagueTable from "../components/leaugue-table";
import Template from "../components/template";

export default function Home(params) {
  return (
    <>
      <Template>
        <LeagueTable />
        <Fixtures />
      </Template>
    </>
  );
}
