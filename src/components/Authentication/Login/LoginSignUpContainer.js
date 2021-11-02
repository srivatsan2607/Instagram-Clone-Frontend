import React, { useState } from 'react'
import Login from './Login'
import { Button } from '@material-ui/core'
import SignUp from './SignUp';
function LoginComponent ()
{
	const [ signUp, setSignUp ] = useState( false );
	return (
		<div className="login_signup_container">
			{
				!signUp ? <Login /> : <SignUp />
			}

			<p style={ { textAlign: "center" } }>
				{
					!signUp ? "Don't have an account?" : "Already have an account?"
				}
				<span>
					<Button color="primary" onClick={ () => setSignUp( !signUp ) }>
						{
							!signUp ? "Sign Up" : "Login"
						}
					</Button>
				</span>
			</p>
		</div>
	)
}

export default LoginComponent
