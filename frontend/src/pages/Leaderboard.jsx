/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

const Leaderboard = () => {
  const [performanceType, setPerformanceType] = useState("blitz");
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);

  const fetchLeaderboardData = async () => {
    try {
      setError(null);
      setPlayers([]);
      const response = await fetch(
        `https://lichess.org/api/player/top/50/${performanceType}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch leaderboard data.");
      }
      const data = await response.json();
      setPlayers(data.users);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchLeaderboardData();
  }, [performanceType]);

  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="w-full max-w-4xl bg-white shadow-md rounded p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Leaderboard</h1>
        <h2 className="text-xl text-center mb-6">Top Players</h2>
        
        <div className="flex justify-center gap-4 mb-6">
          {["blitz", "rapid", "classical"].map((type) => (
            <button
              key={type}
              onClick={() => setPerformanceType(type)}
              className={`px-4 py-2 rounded shadow ${
                performanceType === type 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {error && (
          <div className="text-red-500 text-center mb-4">
            {error} Please try again.
          </div>
        )}

        {players.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2">Rank</th>
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">Username</th>
                  <th className="px-4 py-2">Rating</th>
                  <th className="px-4 py-2">Progress</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player, index) => (
                  <tr key={player.id} className="border-t">
                    <td className="px-4 py-2 text-center">{index + 1}</td>
                    <td className="px-4 py-2 font-semibold text-blue-600">
                      {player.title || "-"}
                    </td>
                    <td className="px-4 py-2">{player.username}</td>
                    <td className="px-4 py-2">
                      {player.perfs[performanceType]?.rating || "N/A"}
                    </td>
                    <td className="px-4 py-2">
                      <span className={
                        player.perfs[performanceType]?.progress > 0 
                          ? "text-green-600" 
                          : "text-red-600"
                      }>
                        {player.perfs[performanceType]?.progress > 0 ? "+" : ""}
                        {player.perfs[performanceType]?.progress || 0}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        player.online 
                          ? "bg-green-100 text-green-800" 
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {player.online ? "Online" : "Offline"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center">Loading leaderboard...</div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;