import React, { Component } from "react";
import { FormControl,  Button, Modal, Form } from "react-bootstrap";
import PropTypes from 'prop-types';
class EditTask extends Component {

    constructor(props){
        super(props);
        this.state={
            ...props.data,
        };
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
        this.props.onSave({
            _id:this.state._id,
            title,
            description,
        });
    };


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
                           Edit Task
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
                            variant="warning"
                            onClick={this.handleSubmit}
                            
                           >
                            Save
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

EditTask.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,

}
export default EditTask;