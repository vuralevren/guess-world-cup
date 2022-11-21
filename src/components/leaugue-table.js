import Container from "./container";

const teams = [
  {
    team: "Galatasaray",
    name: "Evren",
    profilePicture:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    point: 23,
  },
  {
    team: "Fenerbahçe",
    name: "Burak",
    profilePicture:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    point: 12,
  },
  {
    team: "Beşiktaş",
    name: "Orçun",
    profilePicture:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    point: 6,
  },
  {
    team: "Trabzonspor",
    name: "Furkan",
    profilePicture:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    point: 4,
  },
  // More projects...
];

export default function LeagueTable(params) {
  return (
    <Container>
      <h1 className="text-2xl font-semibold text-gray-900">League Table</h1>
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
            {teams.map((team, index) => (
              <tr className="group group-hover:bg-gray-50" key={index}>
                <td className="relative px-6 py-5 flex items-center space-x-3 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500">
                  <div className="flex items-center space-x-2">{index + 1}</div>
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={team.profilePicture}
                      alt=""
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    {/* Extend touch target to entire panel */}
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-gray-900">
                      {team.team}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {team.name}
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
