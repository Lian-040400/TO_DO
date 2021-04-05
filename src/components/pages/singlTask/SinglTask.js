import React, { Component } from "react";
import {  Button, Card, Container,Row,Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash,faEdit,faCheck,faRedo } from '@fortawesome/free-solid-svg-icons';
import sliceDate from '../../../additional_function/slice';
import EditTask from "../../editTask/EditTask";
import { connect } from "react-redux";
import { getTask,deleteTask,editTask } from "../../../store/action";

class SinglTask extends Component {
    state = {
        openModal:false,
       
    };
    componentDidMount() {
        const taskId = this.props.match.params.taskId;
        this.props.getTask(taskId);

    }


    deleteTask=()=>{
        const taskId=this.props.match.params.taskId;
        this.props.deleteTask(taskId,"single");

    }
    onToggleModal=()=>{
        this.setState({
            openModal: ! this.state.openModal
        });
    }
   
    
    componentDidUpdate(prevProps){
       

        if(!prevProps.editsingleTaskSuccess&&this.props.editsingleTaskSuccess){
            this.setState({
               openModal:false,
               
            });
            return;
        }
    }

    render() {
        const {openModal}=this.state;
        const {task,editTask}=this.props;
       
        return(
            <div>
              { task?
              <Container className="mt-5 " >
                  <Row className="justify-content-center">
                      <Col xs={8}>
               <Card >
               <Card.Body>
                  <Card.Title>{task.title}</Card.Title> 
                   <Card.Text>
                     Description: {task.description}
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
                        onClick={() => editTask({status:"done",_id:task._id},"single")}
                        className="m-1"
                    >
                        <FontAwesomeIcon icon={faCheck}/>
                    </Button>
                    :<Button
                        variant="secondary"
                        onClick={() => editTask({status:"active",_id:task._id},"single")}
                       
                        className="m-1"
                    >
                        <FontAwesomeIcon icon={faRedo}/>
                    </Button>}

                   <Button
                       variant="warning" 
                       className="m-1"
                       onClick={this.onToggleModal}
                        
                   >
                    <FontAwesomeIcon icon={faEdit}/>
                   </Button>
                   <Button
                       variant="danger"
                       onClick={this.deleteTask}
                       className="m-1"
                   >
                       <FontAwesomeIcon icon={faTrash}/>

                       
                   </Button>
               </Card.Body>
           </Card>
           </Col>
           </Row>
           </Container>
                :
                <p>task nout found</p>
                
                  }

                 {
                    openModal && 
                    <EditTask
                    data={task}
                onClose={this.onToggleModal}
                from={'single'}
                />
                 
              
              
            }

            </div>
          
        );
        }
    };

    const mapStateToProps=(state)=>{
        return{
            task:state.task,
            editsingleTaskSuccess:state.editsingleTaskSuccess,
           
        }
    
    }
    const mapDispatchToProps={
        getTask,
        deleteTask,
        editTask
    }

    export default connect(mapStateToProps,mapDispatchToProps)(SinglTask);
