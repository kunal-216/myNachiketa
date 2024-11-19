const Header = () => {
    return (
      <div className="w-full h-screen  text-blue flex flex-col items-center justify-center text-center px-4">
        {/* Main Title */}
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to LichessApp
        </h1>
        
        {/* Subheading */}
        <p className="text-lg md:text-2xl mb-6">
          Play chess, compete in tournaments, and climb the leaderboard!
        </p>
        
        {/* Call-to-Action Buttons */}
        <div className="flex space-x-4">
          <button className="px-6 py-3 bg-green-500 rounded shadow hover:bg-green-400 text-lg">
            Get Started
          </button>
          <button className="px-6 py-3 bg-blue-500 rounded shadow hover:bg-blue-400 text-lg">
            Learn More
          </button>
        </div>
      </div>
    );
  };
  
  export default Header;
  