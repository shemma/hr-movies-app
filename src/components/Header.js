import React from 'react';
import { Navbar } from 'react-bootstrap';

import moviesImage from '../css/image/movie.png';
import '../css/header.scss';

const Header = () => {
  return (
	<div id='application-header'>
		<Navbar bg="info" expand="lg" variant="dark" className='nav-bar'>

			<Navbar.Brand className='nav-title'>
				<img alt='' src={moviesImage} className="d-inline-block align-top" />
				Movies
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav" />
		</Navbar>
	</div>
  );
};

export default Header;
