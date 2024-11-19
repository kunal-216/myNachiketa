import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full h-[68px] bg-blue-500 text-white flex items-center justify-between px-4">
      <div className="text-3xl ml-4 font-bold">
        <Link to="/">LichessApp</Link>
      </div>
      <div className="flex space-x-12 mr-8 text-[18px]">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/profile" className="hover:underline">
          Profile
        </Link>
        <Link to="/leaderboard" className="hover:underline">
          Leaderboard
        </Link>
        <Link to="/tournament" className="hover:underline">
          Tournaments
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
