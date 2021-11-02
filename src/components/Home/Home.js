import React, { useEffect, useState } from 'react'
import Posts from './Posts/Posts'
import store from '../../components/Redux/User/UserRedux'
import Axios from '.././Axios/axios'
import './Home.css';
import Pusher from 'pusher-js'

function Home ()
{

	const [ posts, setPosts ] = useState( [] );
	const [ state, setSState ] = useState( store.getState() );

	store.subscribe( () => setSState( store.getState() ) );

	useEffect( () =>
	{
		var pusher = new Pusher( '6fd18e00357a4acd36b5', {
			cluster: 'ap2'
		} );

		var channel = pusher.subscribe( 'posts' );
		channel.bind( 'inserted', function ( data )
		{
			console.log( "data>>>>", data )
			async function fetchData ()
			{
				// console.log( "state.token", state.token );
				await Axios.get( "/posts", { headers: { 'Authorization': `Bearer ${state.token}` } } )
					.then( ( response ) => setPosts( response.data ) )
					.catch( err =>
					{
						// useHistory().push( "/login" );
						console.log( err.response )
						if ( err.response.status === 401 )
						{
							store.dispatch( { type: "Logout" } );
						}
					} );
			}
			fetchData();
		} );
	}, [ state ] )

	useEffect( () =>
	{
		console.log( state.token );
		async function fetchData ()
		{
			// console.log( "state.token", state.token );
			await Axios.get( "/posts", { headers: { 'Authorization': `Bearer ${state.token}` } } )
				.then( ( response ) => setPosts( response.data ) )
				.catch( err =>
				{
					// useHistory().push( "/login" );
					console.log( err.response.status )
					if ( err.response.status === 401 )
					{
						store.dispatch( { type: "Logout" } );
					}
				} );
		}
		fetchData();
	}, [ state ] )

	// console.log( posts );

	return (
		<div className="home_page" >
			{
				<Posts posts={ posts } />
			}
		</div>
	)
}

export default Home
