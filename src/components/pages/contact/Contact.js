import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button, Card, Container } from "react-bootstrap";
import { sendContactFormData } from "../../../store/action";
import { connect } from "react-redux";
import styles from "./contact.module.css";

function Contact(props) {
    const [values, setValues] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [errors, setErrors] = useState({
        name: null,
        email: null,
        message: null,
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
        const nameLength = values.name.trim().length;
        const emailLength = values.name.trim().length;

        if ((nameLength === 0 || emailLength === 0) && value === " ") {
            setErrors({
                ...errors,
                [name]: "field can not start with a space"
            });
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
                name: "Field required",
                email: "Field required",
                message: "Field required"
            });
        }
        if (errorExsist && valueExsist) {

            props.sendContactFormData(values);

        }



    }

    useEffect(() => {
        if (props.sendContactFormDataSuccess) {
            setValues({
                name: "",
                email: "",
                message: "",
            });

        }
    }, [props.sendContactFormDataSuccess]);



    return (
        <Container className="mt-5 ">
            <Row className="justify-content-center">
                <Col xs="10" >
                    <Card>
                        <Card.Header>Contact</Card.Header>
                        <Card.Body>
                            <Form.Group as={Row}>
                                <Form.Label column sm={2}>
                                    Name
          </Form.Label>
                                <Col sm={10}>
                                    <Form.Control
                                        className={errors.name ? styles.redBorder : ""}
                                        type="Name"
                                        name="name"
                                        value={values.name}
                                        onChange={handleChange}


                                    />
                                    <Form.Text className="text-danger ">
                                        {!values.name ? errors.name : null}
                                    </Form.Text>
                                </Col>

                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm={2}>
                                    Email
          </Form.Label>
                                <Col sm={10}>
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


                            <Form.Group as={Row}>
                                <Form.Label column sm={2}>
                                    Message
          </Form.Label>
                                <Col sm={10}>
                                    <Form.Control
                                        className={errors.message ? styles.redBorder : ""}
                                        as="textarea" rows={3}
                                        name='message'
                                        value={values.message}
                                        onChange={handleChange}


                                    />
                                    <Form.Text className="text-danger ">
                                        {!values.message ? errors.message : null}
                                    </Form.Text>
                                </Col>

                            </Form.Group>

                            <Form.Group as={Row}>
                                <Col sm={{ span: 10, offset: 2 }}>
                                    <Button
                                        type="submit"
                                        onClick={handleSubmit}

                                    >Send</Button>
                                </Col>
                            </Form.Group>


                        </Card.Body>
                    </Card>

                </Col>

            </Row>
        </Container>



    );

}
const mapStateToProps = (state) => {
    return {
        sendContactFormDataSuccess: state.sendContactFormDataSuccess,
        
    }

}
const mapDispatchToProps = {
    sendContactFormData,
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact);