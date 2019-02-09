import React from 'react';
import { Navbar } from 'react-bootstrap';
import messages from './i18n/App.i18n.es';

import moviesImage from '../css/image/movie.png';
import '../css/header.scss';

const Header = ({T}) => {
  return (
	<div id='application-header'>
		<Navbar bg="info" expand="lg" variant="dark" className='nav-bar'>

			<Navbar.Brand className='nav-title'>
				<img alt='' src={moviesImage} className="d-inline-block align-top" />
				{T(messages.title)}
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav" />
		</Navbar>
	</div>
  );
};

export default Header;
