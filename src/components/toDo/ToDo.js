import React, { Component } from "react";
import { Container, Col, Row, FormControl, InputGroup, Button, Card } from "react-bootstrap";
import styles from "./toDo.module.css";
import idGenerator from "../../additional_function/idGenerator"
class ToDo extends Component {

    state = {
        inputValue: "",
        tasks: [],
        checked:false,
        selectedTasks:new Set(),
    };

    addTasks = () => {
        let inputValue = this.state.inputValue.trim();
        if (!inputValue) {
            return;
        }
        let task = {
            _id: idGenerator(),
            title: inputValue,
        }
        let tasks = [...this.state.tasks, task];
        this.setState({
            inputValue: "",
            tasks,
        });

    };

    handleChange = (event) => {

        this.setState({
            inputValue: event.target.value,
        });

    };
    deleteTask = (taskId) => {
        let tasks = this.state.tasks.filter(task => {
            return taskId !== task._id;
        })
        this.setState({
            tasks,
        });

    }

    deleteSelectedTasks=()=>{
        const {tasks,selectedTasks}=this.state;
        const newTasks=tasks.filter((task)=>!selectedTasks.has(task._id));
        this.setState({
            tasks:newTasks,
            selectedTasks:new Set(),
        });
    }

    handleCheck=(taskId)=>{
        let {selectedTasks}=this.state;
        
            if (selectedTasks.has(taskId)) {
                selectedTasks.delete(taskId);
            }
            else {
                selectedTasks.add(taskId);
            }
            this.setState({
                selectedTasks,
            });
    }
    handleKeyDawn=(event)=>{

        if(event.key==="Enter"){
           this.addTasks();
        }
    }

    render() {
        const { inputValue, tasks } = this.state;
        let taskComponent = tasks.map((task) => {
            return (
                <Col key={task._id}
                    xs={12}
                    sm={6}
                    md={4}
                    xl={3}>
                    <div>
                        <Card className={styles.task}>
                            <Card.Body>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Checkbox
                                         defaultChecked={false}
                                         onChange={()=>this.handleCheck(task._id)}
                                         
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
                                    onClick={() => (this.deleteTask(task._id))}
                                    disabled={!!this.state.selectedTasks.size}>
                                    Delete
                                </Button>
                            </Card.Body>
                        </Card>

                    </div>
                </Col>
            )
        })

        return (
            <>
            <h2>To Do Lists</h2>
                <Container>
                    <Row className="justify-content-center">
                        <Col
                        
                         xs={8}
                         >
                            <InputGroup>
                                <FormControl
                                    placeholder="Add your task"
                                    value={inputValue}
                                    onChange={this.handleChange}
                                     onKeyDown={this.handleKeyDawn}
                                />
                                <InputGroup.Append>
                                    <Button
                                    disabled={!!this.state.selectedTasks.size}
                                        onClick={this.addTasks} 
                                        >
                                            
                                        Add task
                                </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row  className="justify-content-center">
                        <Col
                          xs={2}>
                    <Button
                     hidden={!this.state.selectedTasks.size}
                                    className={styles.deleteAllSelectedTasksButton}
                                    variant="danger"
                                    onClick={this.deleteSelectedTasks}
                                        >
                                        Delete all selected tasks
                        </Button>
                        </Col>
                 </Row>                    
                    <Row>
                        {taskComponent}
                    </Row>
                </Container>
            </>
        );
    }

}
export default ToDo;