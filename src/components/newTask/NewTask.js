import React, { Component } from "react";
import { FormControl, Button, Modal, Form } from "react-bootstrap";
// import idGenerator from "../../additional_function/idGenerator";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from 'prop-types';
import sliceDate from '../../additional_function/slice';

class NewTask extends Component {

    state = {
        title: "",
        description: "",
        date:new Date(),
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,

        });
    };

    handleSubmit = () => {

        let title = this.state.title.trim();
        let description = this.state.description.trim();
        let {date}=this.state
        if (!title) {
            return;
        }
        let task = {
            title,
            description,
            date:sliceDate(date.toISOString()),
        }
        this.props.addNewTaskFunc(task);
    };

    handleChangeDate=(date)=>{
         this.setState({
            date:date ||new Date(),
        });
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
                                className="mt-3" />



                            <DatePicker
                                minDate={new Date()}
                                selected={this.state.date}
                                onChange={this.handleChangeDate}
                            />


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