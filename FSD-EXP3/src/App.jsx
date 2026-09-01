import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Dashboard from './pages/Dashboard'
import Profile from './pages/dashboard/profile'
import Settings from './pages/dashboard/settings'
import NotFound from './pages/NotFound'

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link> | <Link to="/contact">Contact</Link> | <Link to="/Dashboard">Dashboard</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
         <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/dashboard/settings" element={<Settings />} />
      <Route path="/dashboard/profile" element={<Profile />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App