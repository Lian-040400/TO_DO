import  request  from "../../additional_function/request";
import * as action_type from './action_type';
import {history} from '../../additional_function/history';

const apiHost=process.env.REACT_APP_API_HOST;

export function getTasks(params={}){
    const query=Object.entries(params).map(([key,value])=>`${key}=${value}`).join('&');

    return(dispatch)=>{

        request(`${apiHost}/task?${query}`)
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
        request(`${apiHost}/task/${taskId}`)
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
        request(`${apiHost}/task`,'POST',newTask)
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
        request(`${apiHost}/task/${deletedTaskId}`,'DELETE')
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
        request(`${apiHost}/task`,'PATCH',{tasks:[...deletedTaskId]})
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
        request(`${apiHost}/task/${data._id}`,'PUT',data)
        .then((editedTask)=>{
            dispatch({type:action_type.EDITED_TASK,editedTask,from})
        })
        .catch((error)=>{
            dispatch({type:action_type.ERROR,error:error.message});
        });;
    }
}