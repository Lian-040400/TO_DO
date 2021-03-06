import  request  from "../additional_function/request";
export function getTasks(){

    return(dispatch)=>{
        request('http://localhost:3001/task')
        .then((tasks)=>{
             dispatch({type:'GET-TASKS',tasks});
        });
    }
}

export function addTasks(newTask){
    return(dispatch)=>{
        dispatch({type:'ADDING-TASKS'});
        request('http://localhost:3001/task','Post',newTask)
        .then((task)=>{
            dispatch({type:'ADD-TASKS',task:task})
        });
    }


}
export function deleteTask(deletedTaskId){
    return(dispatch)=>{
        request('http://localhost:3001/task/'+deletedTaskId,'DELETE')
        .then(()=>{
            dispatch({type:'DELETED-TASK',deletedTaskId})
        });
    }
}

export function deleteTasks(deletedTaskId){
    return(dispatch)=>{
        dispatch({type:'DELETING-TASKS'});
        request('http://localhost:3001/task','PATCH',{tasks:[...deletedTaskId]})
        .then(()=>{
            dispatch({type:'DELETED-TASKS',deletedTaskId})
        });
    }
}

export function editTask(editedTask){
    return(dispatch)=>{
        dispatch({type:'EDITTING-TASK'});
        request('http://localhost:3001/task/'+editedTask._id,'PUT')
        .then((editedTask2)=>{
            console.log(editedTask2);
            dispatch({type:'EDITED-TASK',editedTask})
        });
    }
}