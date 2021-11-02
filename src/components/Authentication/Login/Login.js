import React, { useState } from 'react'
import { Button, TextField, } from '@material-ui/core'
import store from '../../Redux/User/UserRedux';
import Axios from '../../Axios/axios'


function Login ()
{
	const [ userName, setUserName ] = useState( "" );
	const [ password, setPassword ] = useState( "" );
	const [ error, setError ] = useState( "" );

	const login = ( event ) =>
	{
		event.preventDefault();
		async function loginUser () 
		{
			if ( userName !== "" && password !== "" )
			{
				const user = {
					userName: userName,
					password: password,
				}
				await Axios.post( "/user/login", user )
					.then( res =>
					{
						console.log( "res>>>", res )
						if ( res.data.status !== "failed" )
						{
							localStorage.setItem( "user", JSON.stringify( res.data.user ) );
							localStorage.setItem( "token", res.data.token );
							localStorage.setItem( "isAuthenticated", true );
							store.dispatch( {
								type: "Update",
								payload: {
									user: JSON.stringify( res.data.user ),
									token: res.data.token
								}
							} )
						} else
						{
							setError( res.data.message );
						}
					} )
					.catch( err =>
					{
						console.log( err )
						setError( "Error occured" )
					} );
			} else
			{
				setError( "Username/password is empty" );
			}
		}
		loginUser();
	}
	return (
		<div className="login_container">
			<form>
				<img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="Instagram" className="app_header_image" />
				<TextField
					type="text"
					helperText="Enter your name / phone"
					value={ userName }
					onChange={ ( e ) => setUserName( e.target.value ) }
					required={ true }
					variant="outlined"
					color='primary'
					label="UserName/Phone"
					margin="dense"
				/>
				<TextField
					type="password"
					helperText="Enter your password"
					value={ password }
					onChange={ ( e ) => setPassword( e.target.value ) }
					required
					variant="outlined"
					color='primary'
					label="Password"
					margin="dense"
				/>
				{
					error !== "" ? <p className="error">{ error }</p> : ""
				}
				<Button onClick={ login } variant="contained" color="primary">Login</Button>
			</form>
		</div>


	)
}

export default Login
