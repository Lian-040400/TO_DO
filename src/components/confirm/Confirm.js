import React  from "react";
import { Button,Modal} from "react-bootstrap";
import PropTypes from 'prop-types';

function Confirm(props) {
    return(
        <>
        <Modal
      
      size="md"
      show={props.confirmValue}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={props.onHideModal}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
         Are you sure to remove {props.tasksCount} task{props.tasksCount>1 ? "s" :""}?
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button
            variant="danger"
            onClick={props.deleteAllTasks}
            onHide={props.onHideModal}>
                Delete
         </Button>
        <Button
         onClick={props.onHideModal}
         >
             Cancel
             </Button>
      </Modal.Footer>
    </Modal>
 
        </>
    );
    
}
Confirm.propTypes={
    confirmValue:PropTypes.bool.isRequired,
    onHideModal:PropTypes.func.isRequired,
    deleteAllTasks:PropTypes.func.isRequired,
    tasksCount:PropTypes.number.isRequired,

}
export {Confirm};