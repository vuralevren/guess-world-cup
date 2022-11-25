import _ from "lodash";
import { useSelector } from "react-redux";
import Container from "./container";
import Avatar from "./avatar";
import functions from "../helpers/functions";

export default function LeagueTable() {
  const league = useSelector((state) => state.league.league);
  const teams = _.orderBy(league?.teams, ["point"], ["desc"]);

  return (
    <Container>
      <h1 className="text-2xl font-semibold text-gray-900">
        {functions.convertToTitle(league?.name)}
      </h1>
      <div className="mt-6">
        <table className="min-w-full">
          <thead>
            <tr className="border-t border-gray-200">
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <span className="lg:pl-2">TEAMS</span>
              </th>
              <th className="py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                POINT
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {_.map(teams, (team, index) => (
              <tr className="group group-hover:bg-gray-50" key={team.user._id}>
                <td className="relative px-6 py-5 flex items-center space-x-3 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500">
                  <div className="flex items-center space-x-2">{index + 1}</div>
                  <div className="flex-shrink-0">
                    <Avatar anotherUser={team.user} size={10} />
                  </div>
                  <div className="flex-1 min-w-0">
                    {/* Extend touch target to entire panel */}
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-gray-900">
                      {team.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {team.user.userName}
                    </p>
                  </div>
                </td>
                <td className="py-3 text-sm text-gray-500 font-medium">
                  <div className="flex items-center space-x-2">
                    {team.point}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
}
