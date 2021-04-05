import React, { Component } from "react";
import { InputGroup, Button, Card } from "react-bootstrap";
import styles from "./task.module.css";
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash,faEdit,faCheck,faRedo } from '@fortawesome/free-solid-svg-icons';
import sliceDate from '../../additional_function/slice';
import {Link} from 'react-router-dom';
import {cutText} from '../../additional_function/cutText';
import { deleteTask,editTask } from "../../store/action";
import { connect } from "react-redux";
class Task extends Component {

    onToggle = () => {
        const {onHandleCheck,data}= this.props;
        onHandleCheck(data._id);
        
    }

    render() {
        const task = this.props.data;
        const { onEditTask, disabled,checked,editTask } = this.props;
        
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
                   <Link
                   to={`/task/${task._id}`}><Card.Title>{cutText(task.title,20)}</Card.Title></Link> 
                    <Card.Text>
                      Description: {cutText(task.description,60)}
                    </Card.Text>
                    <Card.Text>
                      Status: {task.status}
                    </Card.Text>
                    <Card.Text>
                      Date: {sliceDate(task.date) }
                    </Card.Text>
                    <Card.Text>
                    Created: {sliceDate(task.created_at) }
                    </Card.Text>

                    {task.status==="active"? <Button
                        variant="success"
                        onClick={() => editTask({status:"done",_id:task._id})}
                       
                        className="m-1"
                    >
                        <FontAwesomeIcon icon={faCheck}/>
                    </Button>
                    :<Button
                        variant="secondary"
                        onClick={() => editTask({status:"active",_id:task._id})}
                       
                        className="m-1"
                    >
                        <FontAwesomeIcon icon={faRedo}/>
                    </Button>}
                   

                    




                    <Button
                        variant="warning"
                        onClick={() => onEditTask(task)}
                        
                        className="m-1"
                    >
                        <FontAwesomeIcon icon={faEdit}/>
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => this.props.deleteTask(task._id)}
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

const mapDispatchToProps={
    deleteTask,
    editTask,
}
Task.propTypes={
    disabled:PropTypes.bool.isRequired,
    onHandleCheck:PropTypes.func.isRequired,

}
export default connect(null,mapDispatchToProps)(Task);