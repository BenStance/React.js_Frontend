import React from 'react';
import {  Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Form, FormControl } from 'react-bootstrap';
import { FaSearch, FaUser, FaSignOutAlt } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/styles/main.css';
import logo from '../assets/images/logo.jpg';

function LoggedInNavbar() {

    return (
        <Navbar className='navbar' expand="lg" fixed="top">
            <Navbar.Brand as={Link} to="/user-page">
                <img src={logo} alt="TEYORA Logo" width="120" height="50" className="d-inline-block align-top" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavDropdown title="Category" id="basic-nav-dropdown">
                        <NavDropdown.Item as={Link} to="/category-in/website">Website</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/category-in/poster">Poster</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/category-in/blog">Blog</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/category-in/networking">Networking</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/category-in/penetration-testing">Penetration Testing</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/category-in/designing">Designing</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link as={Link} to="/user-progress">Project</Nav.Link>
                    <Nav.Link as={Link} to="/about">About</Nav.Link>
                </Nav>
                <div className='form-subscription'>
                    <Form onSubmit={handleSearchSubmit} className="ml-auto d-flex align-items-center">
                        <FormControl
                            type="text"
                            placeholder="Search"
                            value={searchQuery}  // Bind input value to searchQuery state
                            onChange={handleSearchChange}  // Update searchQuery on input change
                            className="mr-sm-2 search-input"
                        />
                        <button type="submit" className="search-button"><FaSearch /></button>
                    </Form>
                    <Nav.Link className="ml-2">
                        <div className="user-button">
                            <FaUser className="mr-1" />
                            <span>{username}</span> {/* Display the fetched username */}
                        </div>
                    </Nav.Link>
                    <Nav.Link className="ml-2" onClick={handleLogout}>
                        <div className="nav-subscription-button2">
                            <FaSignOutAlt className="mr-1" />
                            <span>Logout</span>
                        </div>
                    </Nav.Link>
                </div>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default LoggedInNavbar;
