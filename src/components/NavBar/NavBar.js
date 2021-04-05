import React from "react";
import { Navbar, Nav,Button } from 'react-bootstrap';
import styles from "./navBar.module.css";
import { NavLink } from 'react-router-dom';
import { Container, Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { history } from "../../additional_function/history";
import { logout } from "../../additional_function/storage";
function NavBar({ isAuthenticated }) {
    function handleSubmit() {
        logout();
        
    }
    return (
        <>
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand ><h2>To Do List</h2></Navbar.Brand>
                <Nav className="mr-auto">
                    <Container>
                        <Row>
                            {isAuthenticated&& 
                            <Col>
                            <NavLink to="/"
                                className={styles.linkStyles}
                                activeClassName={styles.active}
                                exact={true}
                            >Home
                            </NavLink>
                        </Col>
                            }
                            

                            <Col>
                                <NavLink to="/about"
                                    className={styles.linkStyles}
                                    activeClassName={styles.active}
                                    exact>About
                                    </NavLink>
                            </Col>

                            <Col>
                                <NavLink to="/contact"
                                    className={styles.linkStyles}
                                    activeClassName={styles.active}
                                    exact
                                >Contact
                                </NavLink>
                            </Col>
                            {isAuthenticated 
                            ?
                            <Button
                            onClick={handleSubmit}>Log out</Button>:
                            <>
                            <Col>
                            <NavLink to="/register"
                                className={styles.linkStyles}
                                activeClassName={styles.active}
                                exact
                            >Register
                            </NavLink>
                        </Col>

                        <Col>
                            <NavLink to="/login"
                                className={styles.linkStyles}
                                activeClassName={styles.active}
                                exact
                            >Login
                            </NavLink>
                        </Col>
                            </>
                            }

                           




                        </Row>
                    </Container>
                </Nav>

            </Navbar>
        </>
    );

}
const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.isAuthenticated,

    }

}


export default connect(mapStateToProps)(NavBar);