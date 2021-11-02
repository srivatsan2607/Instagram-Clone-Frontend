import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import store from '../../Redux/User/UserRedux'


function Header ()
{
	const [ isAuthenticated, setIsAuthenticated ] = useState( store.getState().isAuthenticated );
	const logout = () =>
	{
		store.dispatch( { type: "Logout" } );
	}

	// console.log( "isAuthenticated", isAuthenticated );
	store.subscribe( () =>
	{
		// console.log( "subscibe" );
		// console.log( store.getState().user )
		setIsAuthenticated( store.getState().isAuthenticated )
	} )

	// console.log( localStorage.getItem( "token" ) );
	return (
		<div className="app_header">
			<Link to="/home">
				<img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="Instagram" className="app_header_image" />
			</Link>
			<div className="header_items">
				{
					isAuthenticated === true ?
						<span>
							<Link to="/posts/upload" className="Link">
								<Button variant="outlined" color="secondary">Post</Button>
							</Link>
							<Link to="/login" className="Link">
								<Button onClick={ logout } variant="contained" color="primary">Logout</Button>
							</Link>
						</span>
						: <Link to="/login" className="Link">
							<Button variant="contained" color="primary">Login</Button>
						</Link>
				}
			</div>
		</div>
	)
}

export default Header
