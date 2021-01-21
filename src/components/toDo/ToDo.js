import React, { Component } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import Task from "../task/Task";
import NewTask from "../newTask/NewTask";
import styles from "./toDo.module.css";
import { Confirm } from "../confirm/Confirm";
class ToDo extends Component {

    state = {
        tasks: [],
        selectedTasks: new Set(),
        show:false,
    };

    addTasks = (task) => {

        let tasks = [...this.state.tasks, task];
        this.setState({
            tasks,
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

    deleteSelectedTasks = () => {
        const { tasks, selectedTasks } = this.state;
        const newTasks = tasks.filter((task) => !selectedTasks.has(task._id));
        this.setState({
            tasks: newTasks,
            selectedTasks: new Set(),
            show:!this.state.show,
           
        });
    }

    handleCheck = (taskId) => {
        let { selectedTasks } = this.state;

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
    closeModal=()=>{
        this.setState({
            show:!this.state.show,
        });
    }


    render() {
        const { tasks,selectedTasks } = this.state;
        let taskComponent = tasks.map((task) => {

            return (
                <Col key={task._id}
                    xs={12}
                    sm={6}
                    md={4}
                    xl={3}>

                    <Task data={task}
                        onHandleCheck={this.handleCheck}
                        onDeleteTask={this.deleteTask}
                        addNewTasks={this.addTasks}
                        disabled={!!this.state.selectedTasks.size}
                    />
                </Col>
            );
        });

        return (
            <>
                
                <Container>
                <Row className="justify-content-center">
                        <Col
                           lg={2}
                          
                        >
                            <h2>To Do List</h2>
                        </Col>
                    </Row>

                    <Row className="justify-content-center">
                        <Col

                            xs={8}
                        >
                            <NewTask
                                disabled={!!selectedTasks.size}
                                addNewTaskFunc={this.addTasks} />
                        </Col>
                    </Row>

                    <Row className="justify-content-center">
                        <Col
                            xs={8}
                            sm={6}
                            md={4}>
                            <Button
                                hidden={!selectedTasks.size}
                                className={styles.deleteAllSelectedTasksButton}
                                variant="danger"
                                onClick={this.closeModal}
                                // onClick={this.deleteSelectedTasks}
                            >
                                Delete all selected tasks
                        </Button>
                        </Col>
                    </Row>
                    <Row>
                        {taskComponent}
                    </Row>
                </Container>
                 <Confirm
                 confirmValue={this.state.show}
                 onHideModal={this.closeModal}
                 deleteAllTasks={this.deleteSelectedTasks}
                 tasksCount={selectedTasks.size}/>
            </>
           
        );
    }

}
export default ToDo;