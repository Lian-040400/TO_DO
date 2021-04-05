import React,{useState} from "react";
import { Form, Row, Col, Button, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import {sendLoginData} from "../../../store/action";
import { connect } from "react-redux";
import styles from "./login.module.css";
 function Login(props) {

    const [values, setValues] = useState({
       
        email: "",
        password: "",
        
    });

    const [errors, setErrors] = useState({
       
        email: null,
        password: null,
        
    });

    function handleChange(event) {
        const { name, value } = event.target;


        if (!value && value.trim() === "") {
            setErrors({
                ...errors,
                [name]: "Field required"
            });
        }
        else {
            setErrors({
                ...errors,
                [name]: null
            });
        }

        if (name === "email" && value) {
            const errorRegExp = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/;
            if (!errorRegExp.test(value)) {
                setErrors({
                    ...errors,
                    email: "You have to write an email here"
                });
            }

        }
       

        if (value === " ") {
            setValues({
                ...values,
                [name]: value.trim(),
            });

        }
        else {
            setValues({
                ...values,
                [name]: value,
            });
        }



    }



    function handleSubmit(event) {

        const errorArray = Object.values(errors);
        const errorExsist = errorArray.every(element => element === null);//does not exist error
        const valueArray = Object.values(values);
        const valueExsist = !valueArray.some(element => element === '');//does not exist space

        if (errorExsist && !valueExsist) {

            setErrors({
                ...errors,
                email: "Field required",
                password: "Field required",
               
            });
        }
        if (errorExsist && valueExsist) {

            props.sendLoginData(values);

        }



    }





    return (<Container className="mt-5 ">
        <Row className="justify-content-center " >
            <Col xs="10" >
                <Card  >
                    <Card.Header style={{ textAlign: "center", fontSize: "30px" }}>Login</Card.Header>
                    <Card.Body >

                        <Form.Group >
                            <Form.Label column sm={2}>
                                Email
                        </Form.Label>
                            <Col sm={12}>
                                <Form.Control
                                    className={errors.email ? styles.redBorder : ""}
                                    type="email"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                />
                                <Form.Text className="text-danger ">
                                     {errors.email || ""}
                                </Form.Text>
                            </Col>
                        </Form.Group>

                        <Form.Group
                        >
                            <Form.Label column sm={2}>
                                Password
                            </Form.Label>
                            <Col sm={12}>
                                <Form.Control
                                    className={errors.name ? styles.redBorder : ""}
                                    type="password"
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}


                                />
                                <Form.Text className="text-danger ">
                                    {!values.name ? errors.name : null}
                                </Form.Text>
                            </Col>
                        </Form.Group>

                        <Form.Group >
                            <Col sm={{ span: 10}}>
                                <Link to="/register">Don't have accaunt yet? Register now!</Link>
                            </Col>
                        </Form.Group>
                        <Form.Group >
                            <Col sm={{ span: 10, offset: 5 }}>
                                <Button
                                    type="submit"
                                    onClick={handleSubmit}

                                >Login</Button>
                            </Col>
                        </Form.Group>





                    </Card.Body>
                </Card>

            </Col>

        </Row>
    </Container>
    );

}

const mapDispatchToProps = {
    sendLoginData,
}

export default connect(null, mapDispatchToProps)(Login);