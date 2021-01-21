import React, { Component } from "react";
import { FormControl, InputGroup, Button } from "react-bootstrap";
import idGenerator from "../../additional_function/idGenerator";
import PropTypes from 'prop-types';
class NewTask extends Component {

    state = {
        title: "",
    }

    handleChange = (event) => {
        this.setState({
            title: event.target.value,
        });

    };

    // handleKeyDawn = (event) => {

    //     if (event.key === "Enter") {
    //         //    this.addTasks();
    //     }
    // }
    handleSubmit = () => {

        let title = this.state.title.trim();
        if (!title) {
            return;
        }
        let task = {
            _id: idGenerator(),
            title,
        }
        this.props.addNewTaskFunc(task);
        this.setState({
            title: "",
        });

    }


    render() {
        const {disabled}=this.props;
        return (
            <InputGroup>
                <FormControl
                    placeholder="Add your task"
                    value={this.state.title}
                    onChange={this.handleChange}
                    // onKeyDown={this.handleKeyDawn}
                    disabled={disabled}
                />
                <InputGroup.Append>
                    <Button
                        disabled={disabled}
                        onClick={this.handleSubmit}
                    >
                        Add task
                  </Button>
                </InputGroup.Append>
            </InputGroup>
        );
    }

}

NewTask.propTypes={
    disabled:PropTypes.bool.isRequired,
    addNewTaskFunc:PropTypes.func.isRequired,

}
export default NewTask;