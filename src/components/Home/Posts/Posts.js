import React from 'react'
import PostHeader from './PostHeader';
import PostBody from './PostBody';


function Posts ( { posts } )
{

	return (
		<div>
			{
				posts != null && posts.length > 0 && posts.map( ( post ) => (
					<div className="post" key={ post._id }>
						{/* PostHeader */ }
						<PostHeader userName={ post.userName } />
						{/* PostBody */ }

						<PostBody images={ post.image } caption={ post.caption } userName={ post.userName } createdAt={ post.createdAt } comments={ post.comments } post_id={ post._id } />
					</div>
				) )
			}
		</div>
	)
}

export default Posts
