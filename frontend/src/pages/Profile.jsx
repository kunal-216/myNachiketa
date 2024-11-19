import { useState } from "react";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const fetchUserData = async () => {
    try {
      setError(null); 
      setUserData(null); 
      const response = await fetch(`https://lichess.org/api/user/${username}`);
      if (!response.ok) {
        throw new Error("User not found or API error");
      }
      const data = await response.json();
      setUserData(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="w-full max-w-md bg-white shadow-md rounded p-6 mt-6">
        <h1 className="text-2xl font-bold text-center mb-4">Search User</h1>
        <input
          type="text"
          placeholder="Enter Lichess Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded mb-4"
        />
        <button
          onClick={fetchUserData}
          className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-400"
        >
          Fetch Details
        </button>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>

      {userData && (
        <div className="w-full max-w-2xl bg-white shadow-md rounded p-6 mt-6">
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={userData.profile?.avatar || "https://via.placeholder.com/100"}
              alt="Profile"
              className="w-24 h-24 rounded-full"
            />
            <div>
              <h2 className="text-xl font-bold">{userData.username}</h2>
              <p className="text-gray-600">{userData.bio || "No bio available"}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-bold">Number of Games Played:</h3>
              <p>{userData.count?.all || 0}</p>
            </div>
            <div>
              <h3 className="font-bold">Blitz Rating:</h3>
              <p>{userData.perfs?.blitz?.rating || "N/A"}</p>
            </div>
            <div>
              <h3 className="font-bold">Rapid Rating:</h3>
              <p>{userData.perfs?.rapid?.rating || "N/A"}</p>
            </div>
            <div>
              <h3 className="font-bold">Classical Rating:</h3>
              <p>{userData.perfs?.classical?.rating || "N/A"}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
