import React, {useReducer} from 'react';
import TaskContext from './taskContext'
import taskReducer from './taskReducer'
import axios from 'axios'
import { ADD_TODO, CLEAR_EDIT, EDIT_TODO, GET_TODO, REMOVE_TODO, TODOS_ERROR, UPDATE_TODO } from '../constants';




const TaskState = (props) => {
    const initialState = {
        todos:[],
        editAble: null,
        errors:null
    }

    const [state, dispatch] = useReducer(taskReducer, initialState);

    //getTodos

    const getTodos = async () =>{
        try{
         const res = await axios.get('/gettodos')
         dispatch({
             type:GET_TODO,
             payload:res.data
         });
        }catch(err){
  dispatch({
      type:TODOS_ERROR,
      payload:err.response.msg,     
  })
        }
    };

    const addTodo = async (todo) => {
        const config = {
            headers: {
                'Content-Type':'application/json',
            }
        };

        try{
      const res = await axios.post('/addtodo', todo, config);
         dispatch({
             type:ADD_TODO,
             payload:res.data
         })
        }catch(err){
dispatch({
    type:TODOS_ERROR,
    payload:err.response.msg
})
        }
    };


    const deleteTodo = async (id) => {
        try{
       await axios.delete(`/deletetodo/${id}`);
       dispatch({
           type:REMOVE_TODO,
           payload:id
       })
        }catch(err){
dispatch({
    type:TODOS_ERROR,
    payload:err.response.msg
})
        }
    };



    const editTodo = async (todo) => {
        console.log(todo)
        const config = {
            header: {
                'Content-Type':'application/json'
            }
        };
        try{
     const res = await axios.put(`/updatetodo/${todo._id}`, todo, config)
dispatch({
    type:UPDATE_TODO,
    payload:res.data
});
await getTodos()
  } catch(err){
dispatch({
    type:TODOS_ERROR,
    payload:err.response.msg
});
  }
}




        
    
const clearEdit = () =>{
    dispatch({
        type:CLEAR_EDIT
    })
};


return (
    <TaskContext.Provider
    value = {{
        todos:state.todos,
        errors:state.errors,
        editAble:state.editAble,
        getTodos,
        addTodo,
        deleteTodo,
        editTodo,
        clearEdit

}} >
    {props.children}
</TaskContext.Provider>
)
    
}

export default TaskState