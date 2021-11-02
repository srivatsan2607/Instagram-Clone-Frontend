import { createStore } from 'redux';
const initialState = {
	'user': localStorage.getItem( "user" ),
	'token': localStorage.getItem( "token" ),
	"isAuthenticated": JSON.parse( localStorage.getItem( "isAuthenticated" ) ),
}

const userReducer = ( state = initialState, { type, payload } ) =>
{
	switch ( type )
	{
		case "Update":
			console.log( "One" )
			console.log( "Payload>>>", payload );
			return Object.assign(
				{},
				state,
				{
					user: payload.user,
					token: payload.token,
					isAuthenticated: true,
				} );

		case "Logout":
			localStorage.setItem( "user", null );
			localStorage.setItem( "token", null );
			localStorage.setItem( "isAuthenticated", false );
			return Object.assign(
				{},
				state,
				{
					user: null,
					token: null,
					isAuthenticated: false,
				} );
		default:
			return state
	}
}

const store = createStore( userReducer );


export default store
