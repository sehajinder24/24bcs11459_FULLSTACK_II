import { Link } from 'react-router-dom'
function Settings() {
	return(
		
	<div>
		<br/><br/><br/><br/>
	    <nav>
    <Link to="/dashboard">Dashboard</Link> | <Link to="/dashboard/settings">Settings</Link> | <Link to="/dashboard/profile">Profile</Link>
    </nav>
      <h1>This is your Settings</h1>
	</div>
	)
}
export default Settings
