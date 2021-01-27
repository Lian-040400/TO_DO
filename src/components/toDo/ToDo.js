import React, { Component } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import Task from "../task/Task";
import NewTask from "../newTask/NewTask";
import styles from "./toDo.module.css";
import { Confirm } from "../confirm/Confirm";
import EditTask from "../editTask/EditTask";
class ToDo extends Component {

    state = {
        tasks: [],
        selectedTasks: new Set(),
        show:false,
        checked:true,
        openNewTaskModal:false,
        openEditTaskModal:null,
    };

    addTasks = (task) => {

        let tasks = [...this.state.tasks, task];
        this.setState({
            tasks,
            openNewTaskModal:false,
            openEditTaskModal:null,
        });

    };


    deleteTask = (taskId) => {
        let tasks = this.state.tasks.filter(task => {
            return taskId !== task._id;
        })
        this.setState({
            tasks,
        });

    };

    editTask=(editTask)=>{
      this.setState({
        openEditTaskModal:editTask,
      })
    };
    saveTask=(editedTask)=>{
        const {tasks}=this.state;
       const editedTaskIndex=tasks.findIndex((ell,index,array)=>{return ell._id===editedTask._id});
        tasks[editedTaskIndex]=editedTask;
        this.setState({
            tasks,
            openEditTaskModal:null,

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
    };

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
    };
    closeModal=()=>{
        this.setState({
            show:!this.state.show,
        });
    };

    togglAllTasks=(type)=>{

        let selectedTasks;
        if(type==="select"){
         selectedTasks=this.state.tasks.map((task)=>{
            return task._id;

        });
}
else{
    selectedTasks=[];
    
        }
        this.setState({
            selectedTasks:new Set(selectedTasks),
        });
        
    };

    toggleNewTaskMOdal=()=>{
        this.setState({
            openNewTaskModal:!this.state.openNewTaskModal
        })
    }



    render() {
        const { tasks,selectedTasks,checked,openNewTaskModal,openEditTaskModal } = this.state;
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
                        onEditTask={this.editTask}
                        addNewTasks={this.addTasks}
                        disabled={!!this.state.selectedTasks.size}
                        checked={selectedTasks.has(task._id) &&checked }
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
                         sm={6}
                         md={3}
                    >
                        <Button
                                variant="success"
                                onClick={this.toggleNewTaskMOdal}  
                                className={styles.deleteAllSelectedTasksButton}  
                            >
                               Add new task
                                 </Button>
                                 
                        </Col>

                    <Col
                         xs={8}
                         sm={6}
                         md={3}>

                        <Button
                              
                                variant="warning"
                                className={styles.deleteAllSelectedTasksButton}
                                onClick={()=>this.togglAllTasks("select")}
                                hidden={(!tasks.length)}
                            >
                                Select All Tasks
                                 </Button>
                                 
                        </Col>
                        <Col
                         xs={8}
                         sm={6}
                         md={3}>

                        <Button
                              
                                variant="warning"
                                className={styles.deleteAllSelectedTasksButton}
                                onClick={()=>this.togglAllTasks("deselect")}
                                hidden={!selectedTasks.size}
                            >
                                Deselect All selected Tasks
                                 </Button>
                                 
                        </Col>

                        <Col
                            xs={8}
                            sm={6}
                            md={3}>
                            <Button
                                hidden={!selectedTasks.size}
                                className={styles.deleteAllSelectedTasksButton}
                                variant="danger"
                                onClick={this.closeModal}
                            >
                                Delete all selected tasks
                        </Button>
                        </Col>
                    </Row>
                    <Row>
                        {taskComponent}
                    </Row>
                </Container>

              { checked&&  <Confirm
                 confirmValue={this.state.show}
                 onHideModal={this.closeModal}
                 deleteAllTasks={this.deleteSelectedTasks}
                 tasksCount={selectedTasks.size}/>   }

                 {openNewTaskModal&& <NewTask
                onClose={this.toggleNewTaskMOdal}
                addNewTaskFunc={this.addTasks} 
                               />
                }

                 {openEditTaskModal&& <EditTask
                 data={openEditTaskModal}
                onClose={()=>this.editTask(null)}
                onSave={this.saveTask} 
                />}


            </>
 
        );
    }

}
export default ToDo;