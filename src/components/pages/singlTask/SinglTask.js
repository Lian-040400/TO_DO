import React, { Component } from "react";
import {  Button, Card, Container,Row,Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash,faEdit } from '@fortawesome/free-solid-svg-icons';
import sliceDate from '../../../additional_function/slice';
import EditTask from "../../editTask/EditTask";
import { connect } from "react-redux";
import { getTask,deleteTask } from "../../store/action";

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
        const {task}=this.props;
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
                     Date: {sliceDate(task.date) }
                   </Card.Text>
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
                from={'singl'}
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
    }

    export default connect(mapStateToProps,mapDispatchToProps)(SinglTask);
