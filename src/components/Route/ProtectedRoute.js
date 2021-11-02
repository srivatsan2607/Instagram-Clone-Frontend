import React, { useState } from 'react'
import { Route, Redirect } from 'react-router-dom'
import store from '.././Redux/User/UserRedux'



function ProtectedRoute ( { component: Component, ...rest } )
{
	const [ isAuthenticated, setIsAuthenticated ] = useState( store.getState().isAuthenticated );

	store.subscribe( () =>
	{
		setIsAuthenticated( store.getState().isAuthenticated );
	} )
	console.log( "Protected Route isAuthenticated>>>", isAuthenticated );
	return (
		<Route { ...rest } render={
			props =>
			{
				if ( isAuthenticated )
				{
					return <Component { ...props } />
				} else
				{
					return <Redirect to="/login" />
				}
			}
		} />
	)
}


export default ProtectedRoute
