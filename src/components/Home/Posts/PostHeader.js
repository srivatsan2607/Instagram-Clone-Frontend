import React from 'react'
import Avatar from '@material-ui/core/Avatar'
function PostHeader ( { userName } )
{
	return (
		<div className="post_header">
			<Avatar className="post__avatar" alt={ userName } src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" />
			<h3>{ userName }</h3>
		</div>
	)
}

export default PostHeader
