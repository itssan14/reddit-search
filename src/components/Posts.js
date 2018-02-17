import Post from './Post';
import React from 'react';

const Posts = props => {
	let results = props.post;
	let PostList = results.map((post, index) => {
		return (
			<Post
				img="https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg"
				title={post.title}
				selftext={post.selftext}
				url={post.url}
				subreddit={post.subreddit}
				score={post.score}
				key={index}
			/>
		);
	});
	return <div className="card-columns">{PostList}</div>;
};

export default Posts;
