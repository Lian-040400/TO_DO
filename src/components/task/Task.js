import React, { Component } from "react";
import { InputGroup, Button, Card } from "react-bootstrap";
import styles from "./task.module.css";

class Task extends Component {

    state = {
        checked: false,
    }

    onToggle = () => {
        const {onHandleCheck,data}= this.props;
        onHandleCheck(data._id);
        this.setState({
            checked: !this.state.checked,
        });
    }

    render() {
        const task = this.props.data;
        const { checked } = this.state;
        const { onDeleteTask, disabled } = this.props;

        return (
            <Card className={`${styles.tasks}  ${checked ? styles.selected : ""}`}>
                <Card.Body>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Checkbox
                                onChange={this.onToggle}
                            />
                        </InputGroup.Prepend>
                    </InputGroup>
                    <Card.Title>{task.title}</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                                </Card.Text>
                    <Button
                        variant="danger"
                        onClick={() => onDeleteTask(task._id)}
                        disabled={disabled}
                    >
                        Delete
                    </Button>
                </Card.Body>
            </Card>

        );
    }
}
export default Task;