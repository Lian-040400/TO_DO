import React, { Component,createRef } from "react";
import { FormControl, Button, Modal, Form } from "react-bootstrap";
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import sliceDate from '../../additional_function/slice';
import { connect } from "react-redux";
import { editTask } from "../../additional_function/action";

class EditTask extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...props.data,
            date:new Date(props.data.date)
        };
        this.titleRef=createRef();
            
       
    }

    componentDidMount(){
        this.titleRef.current.focus();
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
        if (!title) {
            return;
        }
        this.props.editTask({
            _id: this.state._id,
            title,
            description,
           date:sliceDate(this.state.date.toISOString()),

        });
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
                            Edit Task
                         </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormControl
                            placeholder="Title"
                            name="title"
                            value={this.state.title}
                            onChange={this.handleChange}
                            ref={this.titleRef}
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
const mapDispatchToProps={
    editTask,
}
EditTask.propTypes = {
    onClose: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,

}
export default connect(null,mapDispatchToProps)(EditTask); 
