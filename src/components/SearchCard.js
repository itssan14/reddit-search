import 'isomorphic-fetch';
import React from 'react';
import Posts from './Posts';

export default class SearchCard extends React.Component {
	state = {
		post: [],
		success: false
	};
	/**
	 * Submit Handler
	 */
	formSubmit = e => {
		e.preventDefault();
		let searchkey = e.target.searchKey.value;
		let sortby = e.target.sortby.value;
		let limit = e.target.limit.value;
		if (searchkey === '') {
			this.showMessage('Please add a search term', 'alert-danger');
		} else {
			let result = this.search(searchkey, limit, sortby);
			result.then(results => {
				this.setState({ post: results, success: true, limit: limit });
			});
		}
	};
	/**
	 * Search Method
	 */
	search = (searchTerm, searchLimit, sortBy) => {
		return fetch(
			`https://www.reddit.com/search.json?q=${searchTerm}&sort=${sortBy}&limit=${searchLimit}`
		)
			.then(res => res.json())
			.then(data => {
				return data.data.children.map(data => data.data);
			})
			.catch(err => console.error(err));
	};
	/**
	 * Error Message Display Function
	 */
	showMessage = (message, className) => {
		const div = document.createElement('div');
		div.className = `alert ${className}`;
		div.appendChild(document.createTextNode(message));
		const searchContainer = document.querySelector('#search-container');
		const search = document.querySelector('#search');
		searchContainer.insertBefore(div, search);
		// Timeout after 5 sec
		setTimeout(() => {
			document.querySelector('.alert').remove();
		}, 5000);
	};
	/**
	 * Render Method
	 */
	render() {
		return (
			<div id="search-container" className="container">
				<div id="search" className="card card-body bg-light mb-2">
					<h4>Search Reddit</h4>
					<form id="search-form" onSubmit={this.formSubmit}>
						<div className="form-group">
							<input
								type="text"
								id="search-input"
								name="searchKey"
								className="form-control mb-3"
								placeholder="Search Term..."
								aria-label="Search Term"
							/>
						</div>
						<div className="form-check form-check-inline">
							Sort By:
							<input
								className="form-check-input ml-2"
								type="radio"
								name="sortby"
								value="relevance"
								aria-label="relevance"
								defaultChecked
							/>
							<label className="form-check-label">Relevance</label>
							<input
								className="form-check-input ml-2"
								type="radio"
								name="sortby"
								value="new"
								aria-label="latest"
							/>
							<label className="form-check-label">Latest</label>
						</div>
						<h5 className="mt-2"><label for="limit">Limit</label>:</h5>
						<div className="form-group">
							<select name="limit" id="limit" className="form-control">
								<option value="5">5</option>
								<option value="10">10</option>
								<option value="25" defaultValue>
									25
								</option>
								<option value="50">50</option>
								<option value="100">100</option>
							</select>
						</div>
						<button type="submit" className="btn btn-dark btn-block mt-4">
							<b>SEARCH</b>
						</button>
					</form>
				</div>
				{this.state.success ? (
					<div id="results">
						<Posts post={this.state.post} />
					</div>
				) : (
					<div id="results" />
				)}
			</div>
		);
	}
}
