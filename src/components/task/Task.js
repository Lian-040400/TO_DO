import React, { Component } from "react";
import { InputGroup, Button, Card } from "react-bootstrap";
import styles from "./task.module.css";
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash,faEdit } from '@fortawesome/free-solid-svg-icons';
import sliceDate from '../../additional_function/slice';

class Task extends Component {

    

    onToggle = () => {
        const {onHandleCheck,data}= this.props;
        onHandleCheck(data._id);
        
    }

    render() {
        const task = this.props.data;
        const { onDeleteTask,onEditTask, disabled,checked } = this.props;

        return (
            <Card className={`${styles.tasks}  ${checked ? styles.selected : ""}`}>
                <Card.Body>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Checkbox
                                onChange={this.onToggle}
                                checked={checked}
                            />
                        </InputGroup.Prepend>
                    </InputGroup>
                    <Card.Title>{task.title}</Card.Title>
                    <Card.Text>
                      Description: {task.description}
                    </Card.Text>
                    <Card.Text>
                      Date: {sliceDate(task.date) }
                    </Card.Text>
                    <Button
                        variant="warning"
                        onClick={() => onEditTask(task)}
                        
                        className="m-1"
                    >
                        <FontAwesomeIcon icon={faEdit}/>
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => onDeleteTask(task._id)}
                        disabled={disabled}
                        className="m-1"
                    >
                        <FontAwesomeIcon icon={faTrash}/>

                        
                    </Button>
                </Card.Body>
            </Card>

        );
    }
}
Task.propTypes={
    disabled:PropTypes.bool.isRequired,
    onDeleteTask:PropTypes.func.isRequired,
    addNewTasks:PropTypes.func.isRequired,
    onHandleCheck:PropTypes.func.isRequired,

}
export default Task;