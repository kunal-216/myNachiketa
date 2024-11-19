import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import Leaderboard from "./pages/Leaderboard"
import Tournaments from "./pages/Tournaments"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/tournament" element={<Tournaments />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
