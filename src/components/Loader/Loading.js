import React from 'react'
import ReactLoading from 'react-loading';

const Loading = ({type,color}) => {
	return (
		<div>
			<ReactLoading id="loader" type={type} color={color} height={100} width={100} />
		</div>
	)
}

export default Loading
