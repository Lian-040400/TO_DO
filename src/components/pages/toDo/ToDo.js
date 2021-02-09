import React, { Component } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import Task from "../../task/Task";
import NewTask from "../../newTask/NewTask";
import styles from "./toDo.module.css";
import { Confirm } from "../../confirm/Confirm";
import EditTask from "../../editTask/EditTask";
import { faTachometerAlt } from "@fortawesome/free-solid-svg-icons";

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
       fetch('http://localhost:3001/task',{
           method:'Post',
           body:JSON.stringify(task),
           headers:{
            "Content-Type": "application/json"  
           }
       })
       .then(async(response)=>{
           const res=await response.json();
          if(response.status>=400&&response.status<600){
              if(res.error){
                throw res.error;
              }
              else{
                  throw new Error("Something went wrong!!!!!!")
              }
          }
           let tasks = [...this.state.tasks, res];
           this.setState({
               tasks,
               openNewTaskModal:false,
               openEditTaskModal:null,
           });
       })
       .catch((error)=>{
           console.log(error);
       });

        

    };


    deleteTask = (taskId) => {
        fetch('http://localhost:3001/task/'+taskId,{
           method:'Delete',
           headers:{
            "Content-Type": "application/json"  
           }
       })
       .then(async(response)=>{
           const res=await response.json();
          if(response.status>=400&&response.status<600){
              if(res.error){
                throw res.error;
              }
              else{
                  throw new Error("Something went wrong!!!!!!")
              }
          }
          let tasks = this.state.tasks.filter(task => {
            return taskId !== task._id;
        })
        this.setState({
            tasks,
        });
       })
       .catch((error)=>{
           console.log(error);
       });






       

    };

    editTask=(editTask)=>{
        
      this.setState({
        openEditTaskModal:editTask,
      })
    };
    saveTask=(editedTask)=>{
       

        fetch('http://localhost:3001/task/'+editedTask._id,{
            method:'Put',
            body:JSON.stringify(editedTask),
            headers:{
             "Content-Type": "application/json"  
            }
        })
        .then(async(response)=>{
            const res=await response.json();
           if(response.status>=400&&response.status<600){
               if(res.error){
                 throw res.error;
               }
               else{
                   throw new Error("Something went wrong!!!!!!")
               }
           }
           const {tasks}=this.state;
           const editedTaskIndex=tasks.findIndex((ell,index,array)=>{return ell._id===editedTask._id});
           tasks[editedTaskIndex]=res;
           this.setState({
               tasks,
               openEditTaskModal:null,
   
           });
        })
        .catch((error)=>{
            console.log(error);
        });
 
        
    }

    deleteSelectedTasks = () => {
        
        const { tasks, selectedTasks } = this.state;


        fetch('http://localhost:3001/task',{
            method:'PATCH',
            body:JSON.stringify({tasks:[...selectedTasks]}),
            headers:{
             "Content-Type": "application/json"  
            }
        })
        .then(async(response)=>{
            const res=await response.json();
           if(response.status>=400&&response.status<600){
               if(res.error){
                 throw res.error;
               }
               else{
                   throw new Error("Something went wrong!!!!!!")
               }
           }
           const newTasks = tasks.filter((task) => !selectedTasks.has(task._id));
           this.setState({
               tasks: newTasks,
               selectedTasks: new Set(),
               show:!this.state.show,
              
           });
        })
        .catch((error)=>{
            console.log(error);
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
    componentDidMount(){

        fetch('http://localhost:3001/task',{
           method:'Get',
           headers:{
            "Content-Type": "application/json"  
           }
       })
       .then(async(response)=>{
           const res=await response.json();
          if(response.status>=400&&response.status<600){
              if(res.error){
                throw res.error;
              }
              else{
                  throw new Error("Something went wrong!!!!!!")
              }
          }
          
           this.setState({
               tasks:res,
              
           });
       })
       .catch((error)=>{
           console.log(error);
       });

        

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