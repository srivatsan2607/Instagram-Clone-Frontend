import React, { useEffect, useState } from 'react'
import { TextField, Button } from '@material-ui/core'
import './UploadPost.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Axios from '.././Axios/axios'
import store from '../../components/Redux/User/UserRedux'
import Loading from '../Loader/Loading'
import { Redirect } from 'react-router-dom';

function UploadPostBody ()
{
	const [ caption, setCaption ] = useState( "" );
	const [ images ] = useState( [] );
	const [ uploadText, setUploadText ] = useState( "Upload Image" );
	const [ loading, setLoading ] = useState( false );
	const [ status, setStatus ] = useState( "" )
	const [ redirect, setRedirect ] = useState( false )

	const post_status_style = {
		"backgroundColor": status === "success" ? "lightgreen" : "#dc3545",
		"color": status === "success" ? "green" : "white",
		"padding": "10px",
		"borderRadius": "10px",
		"width": "50%",
		"margin": "0 auto",
		"textAlign": "center"
	}

	const { REACT_APP_CLOUDINARY_CLOUD_NAME, REACT_APP_CLOUDINARY_UPLOAD_PRESET } = process.env;
	const state = store.getState();
	const user = JSON.parse( state.user );

	const uploadImage = () =>
	{
		console.log( "Upload Image" );
		window.cloudinary.openUploadWidget( {
			cloud_name: REACT_APP_CLOUDINARY_CLOUD_NAME,
			upload_preset: REACT_APP_CLOUDINARY_UPLOAD_PRESET,
			tags: [ 'post' ]
		},
			function ( error, result )
			{
				if ( error )
				{
					setUploadText( "Failed uploading images..try again!" );
				} else
				{
					result.map( ( image ) =>
					(
						images.push( { image: image[ "secure_url" ], id: image.length } )
					) )
					setUploadText( images.length !== 0 ? `Uploaded ${images.length} images` : "Upload Text" );
				}
			} );
	}

	const upload = () =>
	{
		setLoading( true );
		async function uploadPost ()
		{
			const postBody = {
				caption: caption,
				userName: user.userName,
				image: images,
			}
			await Axios.post( "/posts/upload", postBody, {
				headers: {
					'Authorization': `Bearer ${state.token}`
				}
			} )
				.then( response =>
				{
					console.log( response );
					setStatus( "success" );
					setLoading( false );
				} )
				.catch( err =>
				{
					console.log( err.response );
					setStatus( "failed" );
					setLoading( false );
				} );
			setStatus( "success" );
		}
		uploadPost();
	}

	useEffect( () =>
	{
		if ( status === "success" )
		{
			setTimeout( () =>
			{
				setRedirect( true );
			}, 2000 );
		}
	}, [ status ] )


	return (
		<div className="post_form_box">
			{
				loading ?
					<div className="loading">
						<Loading type={ "spinningBubbles" } color={ "#ad343e" } />
					</div>
					:
					null
			}
			<form className="post_form">
				<Carousel showThumbs={ false }>
					{
						images.length !== 0 ? (
							images.map( ( item ) => (
								<div key={ item.id }>
									<img src={ item.image } alt={ item.image } />
								</div>
							) )
						) : null
					}
				</Carousel>
				<Button onClick={ uploadImage } variant="outlined" color="secondary" style={ { "padding": "40px" } } >{ uploadText }</Button>
				<TextField
					type="text"
					helperText="Enter caption"
					variant="outlined"
					color='primary'
					value={ caption }
					label="Caption"
					multiline
					margin="dense"
					onChange={ ( e ) => setCaption( e.target.value ) }
				/>

				<Button onClick={ upload } variant="contained" color="primary">Post</Button>
			</form>
			{
				status === "success" || status === "failed" ? (
					<div style={ post_status_style }>
						{ status === "success" ?
							"Post uploaded successfully"
							: "Post upload failed!"
						}
					</div>
				) : null
			}
			{
				redirect ? <Redirect to="/home" /> : null
			}
		</div >
	)
}

export default UploadPostBody
