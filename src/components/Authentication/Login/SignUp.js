import React, { useState } from 'react'
import { Button, TextField } from '@material-ui/core'
import Axios from '../../Axios/axios'
import store from '../../Redux/User/UserRedux'
function SignUp ()
{
	const [ userName, setUserName ] = useState( "" );
	const [ email, setEmail ] = useState( "" );
	const [ phone, setPhone ] = useState( "" );
	const [ password, setPassword ] = useState( "" );
	const [ error, setError ] = useState( "" );

	const signUp = ( event ) =>
	{
		event.preventDefault();
		async function registerUsers () 
		{
			if ( userName !== "" && email !== "" && password !== "" )
			{
				const user = {
					userName: userName,
					email: email,
					phone: phone,
					password: password,
				}
				await Axios.post( "/user/register", user )
					.then( res =>
					{
						console.log( res );
						if ( res.data.status !== "failed" )
						{
							store.dispatch( {
								type: "Update",
								payload: {
									user: res.data.user,
									token: res.data.token
								}
							} )
							localStorage.setItem( "user", res.data.user );
							localStorage.setItem( "token", res.data.token );
						} else
						{
							setError( res.data.message );
						}

					} )
					.catch( err => alert( err.response.data.message ) );
			} else
			{
				setError( "Please fill the required " )
			}
		}
		registerUsers();
	}

	return (
		<div className="login_container">
			<form action="">
				<img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="Instagram" className="app_header_image" />
				<TextField
					type="text"
					helperText="Enter your name"
					value={ userName }
					onChange={ ( e ) => setUserName( e.target.value ) }
					required={ true }
					variant="outlined"
					color='primary'
					label="Name"
					margin="dense"
				/>
				<TextField
					type="text"
					helperText="Enter your email"
					value={ email }
					onChange={ ( e ) => setEmail( e.target.value ) }
					required={ true }
					variant="outlined"
					color='primary'
					label="Email"
					margin="dense"
				/>
				<TextField
					type="text"
					helperText="Enter your phone"
					value={ phone }
					onChange={ ( e ) => setPhone( e.target.value ) }
					variant="outlined"
					color='primary'
					label="Phone Number"
					margin="dense"
				/>
				<TextField
					type="password"
					helperText="Enter your password"
					value={ password }
					onChange={ ( e ) => setPassword( e.target.value ) }
					required={ true }
					variant="outlined"
					color='primary'
					label="Password"
					margin="dense"
				/>
				{
					error !== "" ? <p className="error">{ error }</p> : ""
				}
				<Button onClick={ signUp } type="submit" variant="contained" color="primary">Sign up</Button>
			</form>
		</div>
	)
}

export default SignUp
