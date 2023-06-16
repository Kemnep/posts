import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Container, Navbar, Nav, Image, Badge } from "react-bootstrap";
import { MyProfile } from "../../../data/profile";

export function Navigation() {
    const location = useLocation()

    return (<Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Toggle aria-controls="top-navbar-nav" />
            <Navbar.Brand>
                <Nav.Link as={ Link } to="/">
                    REACT APP
                </Nav.Link>
            </Navbar.Brand>
            <Navbar.Collapse id="top-navbar-nav">
                <Nav className="align-items-center justify-content-end w-100" activeKey={ location.pathname }>
                    <Nav.Item className="mr-2">
                        <Nav.Link as={ Link } to="/">
                            Список постов
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={ Link } to="/profile">
                            <Image src="/avatar.svg" style={ { width : `25px` } } className="mx-1" roundedCircle />
                            Обо мне
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        { MyProfile.name } <a href={ `mailto:${ MyProfile.email }` }>{ MyProfile.email }</a>
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>)
}