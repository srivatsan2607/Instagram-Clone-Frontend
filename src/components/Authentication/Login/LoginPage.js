import React, { useState, useEffect } from 'react'
import './Login.css'
import LoginBox from './LoginSignUpContainer'
import store from '../../Redux/User/UserRedux'
import { Redirect } from 'react-router-dom';


function LoginPage ()
{
	const [ state, setSState ] = useState( store.getState() );
	const isAuthenticated = state.isAuthenticated;
	const user = JSON.parse( state.user )
	const [ userAuthenticated, setUserAuthenticated ] = useState( false );

	store.subscribe( () =>
	{
		setSState( store.getState() );
	} )

	useEffect( () =>
	{
		if ( isAuthenticated )
		{
			setTimeout( () =>
			{
				setUserAuthenticated( true )
			}, 5000 );
		}
	}, [ isAuthenticated ] )

	console.log( "userAuthenticated", userAuthenticated );
	return (
		<div className="login">
			{ userAuthenticated === true ? <Redirect to="/home" /> : <div>{ userAuthenticated }</div> }
			<div className="picture">
				<div className="picture_container">
					<img className="picture_pip" src="https://www.instagram.com/static/images/homepage/screenshot1.jpg/d6bf0c928b5a.jpg" alt="" />
				</div>
			</div>
			{
				isAuthenticated === true ? (
					<h3>Logged in as <strong>{ user.userName }</strong></h3>
				) : (
					<div className="login_box">
						<LoginBox />
					</div>
				)
			}
		</div>
	)
}

export default LoginPage
