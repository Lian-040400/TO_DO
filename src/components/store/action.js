import  request  from "../../additional_function/request";
import * as action_type from './action_type';
import {history} from '../../additional_function/history';
export function getTasks(params={}){
    const query=Object.entries(params).map(([key,value])=>`${key}=${value}`).join('&');
console.log(query);
    return(dispatch)=>{

        request(`http://localhost:3001/task?${query}`)
        .then((tasks)=>{
             dispatch({type:action_type.GET_TASKS,tasks});
        })
        .catch((error)=>{
            dispatch({type:action_type.ERROR,error:error.message});
        });
    }
}

export function getTask(taskId){

    return(dispatch)=>{
        request(`http://localhost:3001/task/${taskId}`)
        .then((task)=>{
             dispatch({type:action_type.GET_TASK,task});
        })
        .catch((error)=>{
            dispatch({type:action_type.ERROR,error:error.message});
        });
    }
}

export function addTasks(newTask){
    return(dispatch)=>{
        dispatch({type:action_type.PENDING});
        request('http://localhost:3001/task','Post',newTask)
        .then((task)=>{
            dispatch({type:action_type.ADD_TASKS,task:task})
        })
        .catch((error)=>{
            dispatch({type:action_type.ERROR,error:error.message});
        });
    }


}
export function deleteTask(deletedTaskId,from){
    return(dispatch)=>{
        dispatch({type:action_type.PENDING});
        request('http://localhost:3001/task/'+deletedTaskId,'DELETE')
        .then(()=>{
           
            dispatch({type:action_type.DELETED_TASK,deletedTaskId,from});
             if(from==="single"){
                history.push("/");
            }
        })
         .catch((error)=>{
            dispatch({type:action_type.ERROR, error:error.message});
         });
    }
}

  
export function deleteTasks(deletedTaskId){
    return(dispatch)=>{
        dispatch({type:action_type.PENDING});
        request('http://localhost:3001/task','PATCH',{tasks:[...deletedTaskId]})
        .then(()=>{
            dispatch({type:action_type.DELETED_TASKS,deletedTaskId})
        })
         .catch((error)=>{
            dispatch({type:action_type.ERROR,error:error.message});
        });
    }
}

export function editTask(data,from){
    return(dispatch)=>{
        dispatch({type:action_type.PENDING});
        request('http://localhost:3001/task/'+data._id,'PUT',data)
        .then((editedTask)=>{
            dispatch({type:action_type.EDITED_TASK,editedTask,from})
        })
        .catch((error)=>{
            dispatch({type:action_type.ERROR,error:error.message});
        });;
    }
}