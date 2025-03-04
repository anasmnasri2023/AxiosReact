import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

export default function NavigationBar() {
  const defaultStyle = {
    textDecoration: "none",
    color: "black",
  };

  const activeStyle = {
    textDecoration: "underline",
    fontWeight: "bold",
    color: "blue",
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>MyEvents</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link
            as={NavLink}
            to="events"
            style={({ isActive }) => (isActive ? activeStyle : defaultStyle)}
          >
            Events
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            to="home"
            style={({ isActive }) => (isActive ? activeStyle : defaultStyle)}
          >
            Home
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
