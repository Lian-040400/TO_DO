import React from "react";
import { Navbar,Nav } from 'react-bootstrap';
import styles from "./navBar.module.css";
import {NavLink} from 'react-router-dom';
import { Container, Col, Row } from "react-bootstrap";
export function NavBar() {
    return (
        <>
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand ><h2>To Do List</h2></Navbar.Brand>
                <Nav className="mr-auto">
                    <Container>
                        <Row>
                            <Col>
                    <NavLink to="/"
                    className={styles.linkStyles}
                    activeClassName={styles.active}
                    exact={true}
                    >Home
                    </NavLink></Col>
                    <Col>
                    <NavLink to="/about"
                    className={styles.linkStyles}
                    activeClassName={styles.active}
                    exact>About</NavLink></Col>
                    <Col>
                    <NavLink to="/contact"
                    className={styles.linkStyles}
                    activeClassName={styles.active}
                    exact
                    >Contact</NavLink></Col>
                    </Row>
                    </Container>
                </Nav>

            </Navbar>
        </>
    );

}