import  request  from "../../additional_function/request";
import * as action_type from './action_type';
export function getTasks(){

    return(dispatch)=>{
        request('http://localhost:3001/task')
        .then((tasks)=>{
             dispatch({type:action_type.GET_TASKS,tasks});
        });
    }
}

export function addTasks(newTask){
    return(dispatch)=>{
        dispatch({type:action_type.PENDING});
        request('http://localhost:3001/task','Post',newTask)
        .then((task)=>{
            dispatch({type:action_type.ADD_TASKS,task:task})
        });
    }


}
export function deleteTask(deletedTaskId){
    
    
    return(dispatch)=>{
        dispatch({type:action_type.PENDING});
        request('http://localhost:3001/task/'+deletedTaskId,'DELETE')
        .then(()=>{
            dispatch({type:action_type.DELETED_TASK,deletedTaskId})
        });
    }
}

export function deleteTasks(deletedTaskId){
    return(dispatch)=>{
        dispatch({type:action_type.PENDING});
        request('http://localhost:3001/task','PATCH',{tasks:[...deletedTaskId]})
        .then(()=>{
            dispatch({type:action_type.DELETED_TASKS,deletedTaskId})
        });
    }
}

export function editTask(editedTask){
    return(dispatch)=>{
        dispatch({type:action_type.PENDING});
        request('http://localhost:3001/task/'+editedTask._id,'PUT')
        .then((editedTask2)=>{
            console.log(editedTask2);
            dispatch({type:action_type.EDITED_TASK,editedTask})
        });
    }
}