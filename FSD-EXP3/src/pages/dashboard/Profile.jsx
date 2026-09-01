import { Link } from 'react-router-dom'

function Profile() {
	return(
	<div>
		<br/><br/><br/><br/>
	<nav>
    <Link to="/dashboard">Dashboard</Link> | <Link to="/dashboard/settings">Settings</Link> | <Link to="/dashboard/profile">Profile</Link>
    </nav>

		
      <h1>This is your Profile</h1>
		<p>Details about you</p>
	</div>
	)
}
export default Profile
