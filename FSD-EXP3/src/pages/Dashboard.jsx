import { Routes, Route, Link } from 'react-router-dom'
import Profile from './dashboard/profile'
import Settings from './dashboard/settings'
function Dashboard() {
  return(
  <div>
    <br/><br/><br/><br/>
    <nav>
    <Link to="/dashboard">Dashboard</Link> | <Link to="/dashboard/settings">Settings</Link> | <Link to="/dashboard/profile">Profile</Link>
    </nav>
    <div>
      <h1>This is your Dashboard</h1>
    </div>
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/settings" element={<Settings />} />
      <Route path="/dashboard/profile" element={<Profile />} />
    </Routes>

  </div>
  ) 

}

export default Dashboard