import React from 'react';

const Post = props => (
	<div className="card mb-2">
		<img className="card-img-top" src={props.img} alt="Card cap" />
		<div className="card-body">
			<h5 className="card-title">{props.title}</h5>
			<p className="card-text">{truncateString(props.selftext, 100)}</p>
			<a href={props.url} target="_blank" className="btn btn-primary">
				Read More
			</a>
			<hr />
			<span className="badge badge-secondary">
				Subreddit: {props.subreddit}
			</span>
			<span className="badge badge-dark">Score: {props.score}</span>
		</div>
	</div>
);

export default Post;

function truncateString(myString, limit) {
	const shortened = myString.indexOf(' ', limit);
	if (shortened === -1) return myString;
	return myString.substring(0, shortened);
}
