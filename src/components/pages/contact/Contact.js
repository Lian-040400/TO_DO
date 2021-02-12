import React, { useState } from "react";
import { Form, Row, Col, Button,Card,Container } from "react-bootstrap";
export function Contact() {
    const [values, setValues] = useState({
        name: "",
        email: "",
        message: "",
    });
   function handleSubmit(){
       const data={
        name:values.name,
        email:values.email,
        message:values.message
       }; 
       if(!values.name||!values.email||!values.message){
           return;
       }
    fetch('http://localhost:3001/form',{
        method:'Post',
        body:JSON.stringify(data),
        headers:{
         "Content-Type": "application/json"  
        }
    })
    .then(async(response)=>{
        const res=await response.json();
       if(response.status>=400&&response.status<600){
           if(res.error){
             throw res.error;
           }
           else{
               throw new Error("Something went wrong!!!!!!")
           }
       }
        
    
    })
    .catch((error)=>{
        console.log(error);
    });
    };
    return (
<Container className="mt-5 ">
    <Row>
        <Col xs="12" >
        <Card>
            <Card.Header>Contact</Card.Header>
            <Card.Body>

                <Form.Group as={Row} controlId="formHorizontalName">
                    <Form.Label column sm={2}>
                        Name
          </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="Name"
                            placeholder="Name"
                            value={values.name}
                            onChange={(event) => {
                                setValues({
                                    ...values,
                                    name: event.target.value,

                                });
                            }}

                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                        Email
          </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            value={values.email}
                            onChange={(event) => {
                                setValues({
                                    ...values,
                                    email: event.target.value,

                                });
                            }}
                        />
                    </Col>
                </Form.Group>


                <Form.Group as={Row} controlId="exampleForm.ControlTextarea1">
                <Form.Label column sm={2}>
                        Message
          </Form.Label>
          <Col sm={10}>
                    <Form.Control
                        as="textarea" rows={3}

                        placeholder="Description"
                        value={values.message}
                        onChange={(event) => {
                            setValues({
                                ...values,
                                message: event.target.value,

                            });
                        }}

                        className="mt-3" />


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