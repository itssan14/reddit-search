import Navbar from './Navbar';
import React from 'react';

const Layout = props => {
	return (
		<div>
			<Navbar />
			<div className="container">{props.children}</div>
		</div>
	);
};

export default Layout;
