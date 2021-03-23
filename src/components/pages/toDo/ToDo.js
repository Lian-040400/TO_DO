import React, { Component } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import Task from "../../task/Task";
import NewTask from "../../newTask/NewTask";
import styles from "./toDo.module.css";
import { Confirm } from "../../confirm/Confirm";
import EditTask from "../../editTask/EditTask";
import {getTasks,deleteTasks} from '../../store/action';
import { connect } from "react-redux";
import Search from '../../search/Search';
import SortAndFilterModal from '../../SortAndFilter/SortAndFilterModal'
class ToDo extends Component {

    state = {
        selectedTasks: new Set(),
        show:false,
        checked:true,
        openNewTaskModal:false,
        openEditTaskModal:null,
        openSortAndFilterModal:false,
    };


    editTask=(editTask)=>{
        
      this.setState({
        openEditTaskModal:editTask,
      })
    };
    

    deleteSelectedTasks = () => {
        
        const { selectedTasks } = this.state;

        this.props.deleteTasks(selectedTasks);
 
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
         selectedTasks=this.props.tasks.map((task)=>{
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
            openNewTaskModal:!this.state.openNewTaskModal,
        })
    };
    toggleSortAndFilterModal=()=>{
        this.setState({
            openSortAndFilterModal:!this.state.openSortAndFilterModal,
        })
       

    };

    componentDidMount(){
        this.props.getTasks();

    };
    componentDidUpdate(prevProps){
        if(!prevProps.addNewTaskSuccess&&this.props.addNewTaskSuccess){
            this.setState({
                openNewTaskModal:false,
            });
            return;
        }
        
        if(!prevProps.editTaskSuccess&&this.props.editTaskSuccess){
            this.setState({
                openEditTaskModal:false,
            });
        return;
        }
        if(!prevProps.deleteTasksSuccess&&this.props.deleteTasksSuccess){
            this.setState({
                       selectedTasks: new Set(),
                       show:!this.state.show,
                      
                   });
                   return;
        }

    };


    render() {
        const { selectedTasks,checked,openNewTaskModal,openEditTaskModal,openSortAndFilterModal } = this.state;
        const{tasks}=this.props;
        let taskComponent = tasks.map((task) => {

            return (
                <Col key={task._id}
                    xs={12}
                    sm={6}
                    md={4}
                    xl={3}>

                    <Task data={task}
                        onHandleCheck={this.handleCheck}
                        onEditTask={this.editTask}
                        disabled={!!this.state.selectedTasks.size}
                        checked={selectedTasks.has(task._id) &&checked }
                    />
                </Col>
            );
        });

        return (
            <>
                
                <Container>
                    <Row>
                        <Col lg="9">
                    <Search/></Col>
                    </Row>
                    <Row className="justify-content-center">
                    <Col
                         xs={8}
                         sm={6}
                         md={3}
                    >
                        <Button
                                variant="primary"
                                onClick={this.toggleSortAndFilterModal}  
                                className={styles.deleteAllSelectedTasksButton}  
                            >
                               Filter And Sort
                        </Button>
                                 
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
                                hidden={!selectedTasks.size}>
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
                                onClick={this.closeModal}>
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
                               />
                }

                 {openEditTaskModal&& <EditTask
                 data={openEditTaskModal}
                onClose={()=>this.editTask(null)}
                />}
               {openSortAndFilterModal&& <SortAndFilterModal
              onClose={this.toggleSortAndFilterModal}
            //  show={}
                />
               }
            </>
 
        );
    }

}
const mapStateToProps=(state)=>{
    return{
        tasks:state.tasks,
        addNewTaskSuccess:state.addNewTaskSuccess,
        editTaskSuccess:state.editTaskSuccess,
        deleteTasksSuccess:state.deleteTasksSuccess,
    }

}
const mapDispatchToProps={
    getTasks,
    deleteTasks,
}

export default connect(mapStateToProps,mapDispatchToProps)(ToDo);