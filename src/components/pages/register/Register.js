import React,{useState} from "react";
import { Form, Row, Col, Button,Card,Container} from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styles from "./register.module.css";
import {sendRegisterData} from "../../../store/action";

 function Register(props) {

    const [values, setValues] = useState({
        name: "",
        surname:"",
        email: "",
        password:"",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({
        name: null,
        surname:null,
        email: null,
        password:null,
        confirmPassword: null,
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
        if (name === "password" && value) {
            const errorRegExp = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
            if (!errorRegExp.test(value)) {
                setErrors({
                    ...errors,
                    password: "You have to 6"
                });
            }

        }


        if (name === "confirmPassword" && value) {
            console.log(values.password);
            if(value!==values.password){
                     setErrors({
                    ...errors,
                    confirmPassword: "You have to equal password"
                });
            }

        }


        // const nameLength = values.name.trim().length;
        // const emailLength = values.name.trim().length;

        // if ((nameLength === 0 || emailLength === 0) && value === " ") {
        //     setErrors({
        //         ...errors,
        //         [name]: "field can not start with a space"
        //     });
        // }

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
                surname:"Field required",
               password: "Field required",
               confirmPassword:"Field required",
            });
        }
        if (errorExsist && valueExsist) {

            props.sendRegisterData(values);

        }



    }





    return ( <Container className="mt-5 ">
    <Row className="justify-content-center " >
        <Col xs="8" >
            <Card  >
                <Card.Header style={{textAlign:"center",fontSize:"30px"}}>Register</Card.Header>
                <Card.Body >
                    <Form.Group >
                        <Form.Label column sm={2}>
                            Name
  </Form.Label>
                        <Col sm={12}>
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


                    <Form.Group >
                        <Form.Label column sm={2}>
                            Surname
  </Form.Label>
                        <Col sm={12}>
                            <Form.Control
                                // className={errors.name ? styles.redBorder : ""}
                                type="Name"
                                name="surname"
                                value={values.surname}
                                onChange={handleChange}


                            />
                            <Form.Text className="text-danger ">
                                {!values.name ? errors.surname : null}
                                {errors.surname || ""}
                            </Form.Text>
                        </Col>

                    </Form.Group>





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
                                className={errors.password ? styles.redBorder : ""}
                                type="password"
                                name="password"
                                value={values.password}
                                onChange={handleChange}


                            />
                            <Form.Text className="text-danger ">
                                {/* {!values.password ? errors.passsword : null} */}
                                {errors.password || ""}
                            </Form.Text>
                        </Col>

                    </Form.Group>

                    <Form.Group >
                        <Form.Label column sm={3}>
                           Confitm Password
  </Form.Label>
                        <Col sm={12}>
                            <Form.Control
                                 className={errors.confirmPassword ? styles.redBorder : ""}
                                type="password"
                                name="confirmPassword"
                                value={values.confirmPassword}
                                onChange={handleChange}


                            />
                            <Form.Text className="text-danger ">
                                {/* {!values.confirmPassword ? errors.confirmPassword : null} */}

                                {errors.confirmPassword || ""}
                            </Form.Text>
                        </Col>

                    </Form.Group>

                    <Form.Group >
                        <Col sm={{ span:10}}>
                            <Link to="/login">Already registered ? Try to login!</Link>
                        </Col>
                    </Form.Group>
                    <Form.Group >
                        <Col sm={{ span:10,offset: 5 }}>
                            <Button
                                type="submit"
                                onClick={handleSubmit}

                            >Register</Button>
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
        sendRegisterDataSuccess: state.sendRegisterDataSuccess,
        
    }

}
const mapDispatchToProps = {
    sendRegisterData,
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);