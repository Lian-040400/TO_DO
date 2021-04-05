import * as action_type from './action_type';
import { checkLoginStatus } from "../additional_function/storage";
const defaultState={
    tasks:[],
    task:null,
    addNewTaskSuccess:false,
    editTaskSuccess:false,
    editsingleTaskSuccess:false,
    deleteTasksSuccess:false,
    loader:false,
    errorMessage:'',
    successMessage:'',
    sendContactFormDataSuccess:false,
    isAuthenticated:checkLoginStatus(),
  }
  export default function reduser(state=defaultState,action) {
    
    switch (action.type) {
      case  action_type.PENDING:{
        return{
          ...state,
          addNewTaskSuccess:false,
          editTaskSuccess:false,
          deleteTasksSuccess:false,
          loader:true,
          successMessage:false,
          errorMessage:false,
          editsingleTaskSuccess:false,
          sendContactFormDataSuccess:false,

        }}
        case  action_type.ERROR:{
          return{
            ...state,
            loader:false,
            errorMessage:action.error,
  
          }}
      case action_type.GET_TASKS:{  
          return{
            ...state,
            tasks:action.tasks,
            loader:false,
          }
        
      }

      case action_type.GET_TASK:{  
        
        return{
          ...state,
          task:action.task,
          loader:false,
        }
      
    }
      

      case action_type.ADD_TASKS:{
        return{
          ...state,
          tasks:[...state.tasks, action.task],
          addNewTaskSuccess:true,
          loader:false,
          successMessage:'Task added successfully',

        }}
       
          case  action_type.DELETED_TASK:{
            if(action.from==="singl"){
              return{
                ...state,
                loader:false,
                successMessage:'Task deleted successfully',
                task:null, 
              }}

            let tasks = state.tasks.filter(task => {
                      return action.deletedTaskId !== task._id;
                  })
                  
            return{
              ...state,
              tasks,
              loader:false,
              successMessage:'Task deleted successfully',
            }}

            case action_type.DELETED_TASKS:{
              const tasks = state.tasks.filter((task) => !action.deletedTaskId.has(task._id));
                    
              return{
                ...state,
                tasks,
                deleteTasksSuccess:true,
                loader:false,
                successMessage:'Tasks deleted successfully',
              }}
             
            case action_type.EDITED_TASK:{
              
              let message='Task edited successfully';
              if(action.status){
                if(action.status==="done"){

                message="Congrats, you have comleted the task!!!!";

              }
              else{
                message="The task is active now!!!!"
              }}
              if(action.from==="single"){
                console.log("baaaaaaaa");
                return{
                  ...state,
                  loader:false,
                  successMessage:message,
                  task:action.editedTask, 
                  editsingleTaskSuccess:true,
                 
                }}

              
              const {tasks}=state;
              const editedTaskIndex=tasks.findIndex((ell,index,array)=>{return ell._id===action.editedTask._id});
              tasks[editedTaskIndex]=action.editedTask; 
              
              return{
                ...state,
                tasks,
                editTaskSuccess:true,
                loader:false,
                successMessage:message,
              }
}
case action_type.SEND_CONTACT_FORM_DATA:{
  return{
    ...state,
    loader:false,
    successMessage:'Form data send successfully',
    sendContactFormDataSuccess:true,

  }

}
case action_type.SEND_REGISTER_DATA:{
  return{
    ...state,
    loader:false,
    successMessage:'Register data send successfully',

  }

}
case action_type.SEND_LOGIN_DATA:{
  return{
    ...state,
    loader:false,
  isAuthenticated:true,

  }}
  case action_type.LOGOUT:{
    return{
      ...state,
      loader:false,
    isAuthenticated:false,
  
    }
  
  

}
              
      default:{
         return state;
      }
    
      
    }
  
    
  }