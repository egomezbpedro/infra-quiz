import React from 'react'
import {Link} from 'react-router-dom'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">  

        <Container>
            <Link to="/game"><Navbar.Brand>Quizlet</Navbar.Brand></Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="/game">Today Quiz</Nav.Link>
                <Nav.Link href="/leaderboard">Leaderboard</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>


    </Navbar>
  )
}

export default Header