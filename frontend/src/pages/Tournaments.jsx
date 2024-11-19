import { useEffect, useState } from "react";

const Tournaments = () => {
  const [tournaments, setTournaments] = useState({ created: [], started: [], finished: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await fetch("https://lichess.org/api/tournament");
        if (!response.ok) throw new Error("Failed to fetch tournaments.");
        const data = await response.json();
        setTournaments(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  const formatTime = (timestamp) => new Date(timestamp).toLocaleString();

  const renderTournaments = (title, list) => (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">{title}</h2>
      {list.length > 0 ? (
        list.map((tournament) => (
          <div key={tournament.id} className="bg-white border border-gray-300 rounded-lg p-6 shadow-md mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">{tournament.fullName}</h3>
            <p className="text-sm text-gray-600 mb-2"><strong>Players:</strong> {tournament.nbPlayers}</p>
            <p className="text-sm text-gray-600 mb-2"><strong>Variant:</strong> {tournament.variant.name}</p>
            <p className="text-sm text-gray-600 mb-2"><strong>Schedule:</strong> {tournament.schedule.freq} ({tournament.schedule.speed})</p>
            <p className="text-sm text-gray-600 mb-2"><strong>Starts At:</strong> {formatTime(tournament.startsAt)}</p>
            <p className="text-sm text-gray-600 mb-2"><strong>Ends At:</strong> {formatTime(tournament.finishesAt)}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No tournaments in this category.</p>
      )}
    </div>
  );

  if (loading) return <p className="text-center text-lg text-gray-600">Loading tournaments...</p>;
  if (error) return <p className="text-center text-lg text-red-500">Error: {error}</p>;

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Lichess Tournaments</h1>
      {renderTournaments("Created Tournaments", tournaments.created)}
      {renderTournaments("Started Tournaments", tournaments.started)}
      {renderTournaments("Finished Tournaments", tournaments.finished)}
    </div>
  );
};

export default Tournaments;
