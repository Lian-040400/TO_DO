import * as action_type from './action_type';
const defaultState={
    tasks:[],
    addNewTaskSuccess:false,
    editTaskSuccess:false,
    deleteTasksSuccess:false,
    loader:false,
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

        }}
      case action_type.GET_TASKS:{  
          return{
            ...state,
            tasks:action.tasks
          }
        
      }
      

      case action_type.ADD_TASKS:{
        return{
          ...state,
          tasks:[...state.tasks, action.task],
          addNewTaskSuccess:true,
          loader:false,

        }}
       
          case  action_type.DELETED_TASK:{
            let tasks = state.tasks.filter(task => {
                      return action.deletedTaskId !== task._id;
                  })
                  
            return{
              ...state,
              tasks,
              loader:false,
            }}

            case action_type.DELETED_TASKS:{
              const tasks = state.tasks.filter((task) => !action.deletedTaskId.has(task._id));
                    
              return{
                ...state,
                tasks,
                deleteTasksSuccess:true,
                loader:false,
              }}
             
            case action_type.EDITED_TASK:{
              const {tasks}=state;
              const editedTaskIndex=tasks.findIndex((ell,index,array)=>{return ell._id===action.editedTask._id});
              tasks[editedTaskIndex]=action.editedTask; 
              return{
                ...state,
                tasks,
                editTaskSuccess:true,
                loader:false,
              }}

              
      default:{
         return state;
      }
    
      
    }
  
    
  }