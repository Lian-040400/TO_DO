import React, { Component } from "react";
import { FormControl,  Button, Modal, Form } from "react-bootstrap";
// import idGenerator from "../../additional_function/idGenerator";
import PropTypes from 'prop-types';
class NewTask extends Component {

    state = {
        title: "",
        description:"",
    }

    handleChange = (event) => {
        const {name,value}=event.target;
        this.setState({
            [name]: value,

    });
};

    handleSubmit = () => {

        let title = this.state.title.trim();
        let description = this.state.description.trim();
        
        if (!title) {
            return;
        }
        let task = {
            // _id: idGenerator(),
            title,
            description,
        }
        this.props.addNewTaskFunc(task);
    }


    render() {
       
        return (
            <>

                <Modal

                    size="md"
                    show={true}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    onHide={this.props.onClose}
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add new Task
                         </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormControl
                            placeholder="Title"
                            name="title"
                            value={this.state.title}
                             onChange={this.handleChange}
                            
                        />

                        <Form.Group controlId="exampleForm.ControlTextarea1">

                            <Form.Control 
                            as="textarea" rows={3} 
                           name="description"
                            value={this.state.description}
                            placeholder="Description"
                             onChange={this.handleChange}
                             className="mt-3"/>
                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="success"
                            onClick={this.handleSubmit}
                            
                           >
                            Add
                        </Button>
                        <Button
                            onClick={this.props.onClose}
                        >
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>








            </>
        );
    }

}

NewTask.propTypes = {
    addNewTaskFunc: PropTypes.func.isRequired,

}
export default NewTask;