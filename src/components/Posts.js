import Post from './Post';
import React, { Component } from 'react';
import Pagination from './Pagination';

export default class Posts extends Component {

	constructor(props){
		super(props);

		this.state = {
			currentPage : 1,
			postsToBeDisplayed: this.getCurrentPagePosts(1),
		}
	}

	handlePageChange = index => {
		let numberOfPages = Math.ceil(this.props.post.length / this.props.paginationLimit);
		if(index === 0){
			index = (this.state.currentPage - 1 + numberOfPages) % numberOfPages;
		}else if(index === numberOfPages + 1){
			index = ((this.state.currentPage + 1) % numberOfPages);
		}

		index = index === 0 ? numberOfPages : index;
		
		if(index === this.state.currentPage)
			return;
		this.setState({
			currentPage: index,
			postsToBeDisplayed: this.getCurrentPagePosts(index),
		})
	}

	getCurrentPagePosts = currentPageIndex => {
		let postsToBeDisplayed = []
		let beginIndex = (currentPageIndex - 1) * this.props.paginationLimit;
		let endIndex = this.props.paginationLimit + beginIndex;

		console.log(beginIndex, endIndex);

		for(let i = beginIndex; i < endIndex; i++){
			if(i === this.props.post.length)
				break;
			postsToBeDisplayed.push(
				<Post
					img="https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg"
					title={this.props.post[i].title}
					selftext={this.props.post[i].selftext}
					url={this.props.post[i].url}
					subreddit={this.props.post[i].subreddit}
					score={this.props.post[i].score}
					key={i}
				/>
			)
		}

		return postsToBeDisplayed;
	}

	render(){
		return (
		<div>
			<div className="card-columns">
			{
				this.state.postsToBeDisplayed
			}
			</div>
			<Pagination
				selectedPage={this.state.currentPage}
				noOfPostsPerPage={this.props.paginationLimit}
				noOfActualPosts={this.props.post.length}
				onPageChange={(index) => this.handlePageChange(index)}/>
		</div>
	);
	}
}