import * as action_type from './action_type';
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
              if(action.from==="singl"){
                return{
                  ...state,
                  loader:false,
                  successMessage:'Task edited successfully',
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
                successMessage:'Task edited successfully',
              }
}
              
      default:{
         return state;
      }
    
      
    }
  
    
  }