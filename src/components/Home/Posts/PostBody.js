import React, { useState } from 'react'
import './Posts.css'
import { Input, Button } from '@material-ui/core'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import Axios from '../../Axios/axios'
import store from '../../Redux/User/UserRedux'
TimeAgo.addLocale( en )

function PostBody ( { images, userName, caption, createdAt, comments, post_id } )
{
	const timeago = new TimeAgo( "en-us" );
	const [ comment, setComment ] = useState( "" )
	const [ user, setUser ] = useState( JSON.parse( store.getState().user ) );
	// console.log( comments );

	const addComment = () =>
	{
		console.log( "comment post" )
		async function postcomment ()
		{
			await Axios.post( `/posts/${post_id}/comment`, {
				comment: comment,
				userId: user.userId,
				userName: user.userName,
			}, { headers: { "Authorization": `Bearer ${store.getState().token}` } } )
				.then( ( comment ) => { console.log( comment ) } )
				.catch( ( err ) => console.log( err ) );
			setComment( "" );
		}
		postcomment();
	}

	store.subscribe( () =>
	{
		setUser( JSON.parse( store.getState().user ) )
	} )

	return (
		<div className="post_body">
			<Carousel
				showThumbs={ false }
			>
				{
					images.map( ( item, index ) => (
						<img src={ item.image } alt="" className="post__image" key={ index } />
					) )
				}
			</Carousel>
			<div className="post__texts">
				<h4><strong>{ userName }</strong>: { caption }</h4>
				<h4>{ timeago.format( new Date( createdAt ) ) }</h4>
			</div>
			<div className="comments">
				{
					comments.length > 0 ? (
						comments.map( ( comment ) =>
						(
							<div className="post__texts" key={ comment._id }>
								<h4><strong>{ comment.author?.userName }</strong>: { comment.comment }</h4>
								{/* <h4>{ timeago.format( new Date( comment.createdAt ) ) }</h4> */ }
							</div>
						) )
					) : null
				}
			</div>
			<form className="post_comment">
				<Input
					className="post_comment_input"
					type="text"
					placeholder="Add a comment..."
					value={ comment }
					variant="outlined"
					disableUnderline
					margin="dense"
					fullWidth
					onChange={ ( e ) => setComment( e.target.value ) }
				/>
				<Button id="comment_button" onClick={ addComment } variant="outlined" color="secondary">Send</Button>
			</form>
		</div>
	)
}

export default PostBody
