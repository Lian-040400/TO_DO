import React, { Component,createRef } from "react";
import { FormControl, Button, Modal, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import sliceDate from '../../additional_function/slice';
import { addTasks } from '../../store/action';
import { connect } from "react-redux";
class NewTask extends Component {
    constructor(props){  
        super(props);  
        this.titleRef=createRef();
   }  

    state = {
        title: "",
        description: "",
        date:new Date(),
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
        let {date}=this.state
        if (!title) {
            return;
        }
        let task = {
            title,
            description,
            date:sliceDate(date.toISOString()),
        }
        this.props.addTasks(task);
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
const mapDispatchToProps={
    addTasks,
}
export default connect(null,mapDispatchToProps)(NewTask);




