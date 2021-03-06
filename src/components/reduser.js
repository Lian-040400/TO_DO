const defaultState={
    tasks:[],
    addNewTaskSuccess:false,
    editTaskSuccess:false,
    deleteTasksSuccess:false,
  }
  export default function reduser(state=defaultState,action) {
    
    switch (action.type) {
      case 'GET-TASKS':{  
          return{
            ...state,
            tasks:action.tasks
          }
        
      }
      

      case 'ADD-TASKS':{
        return{
          ...state,
          tasks:[...state.tasks, action.task],
          addNewTaskSuccess:true,

        }}
        case 'ADDING-TASKS':{
          return{
            ...state,
            addNewTaskSuccess:false,
  
          }}
          case 'DELETED-TASK':{
            let tasks = state.tasks.filter(task => {
                      return action.deletedTaskId !== task._id;
                  })
                  
            return{
              ...state,
              tasks,
            }}

            case 'DELETED-TASKS':{
              const tasks = state.tasks.filter((task) => !action.deletedTaskId.has(task._id));
                    
              return{
                ...state,
                tasks,
                deleteTasksSuccess:true,
              }}
              case 'DELETING-TASKS':{
                return{
                  ...state,
                  deleteTasksSuccess:false,
        
                }}
            case 'EDITED-TASK':{
              const {tasks}=state;
              const editedTaskIndex=tasks.findIndex((ell,index,array)=>{return ell._id===action.editedTask._id});
              tasks[editedTaskIndex]=action.editedTask; 
              return{
                ...state,
                tasks,
                editTaskSuccess:true,
              }}

              case 'EDITTING-TASK':{
                return{
                  ...state,
                  editTaskSuccess:false,
        
                }}
      default:{
         return state;
      }
    
      
    }
  
    
  }