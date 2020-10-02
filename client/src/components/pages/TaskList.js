import React, { useContext, useEffect } from "react";
import { ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import TaskContext from "../../context/taskContext/taskContext"
import AuthContext from '../../context/authContext/authContext'

const TaskList = () => {
    const { getTodos, todos, deleteTodo } = useContext(TaskContext);
    const { userAuth, user } = useContext(AuthContext);


    useEffect(() => {
        getTodos()
        console.log("i was called")
    }, [])

  return (
    <ListGroup className="mt-4">
        {todos.length > 0 ? (
            <>
              {todos.map((todo) => (
        <ListGroupItem className="d-flex" key ={todo._id}>
          <strong>{todo.title}</strong>
          <div className="ml-auto">
            <Button className="btn btn-warning mr-1">
              <Link to={`/edit/${todo._id}`}>
                {" "}
                <i className="fas fa-user-edit"></i>
              </Link>
            </Button>
            <Button className="btn btn-danger" onClick={() => deleteTodo(todo._id)}>
              <i className="fas fa-trash-alt remove"></i>
            </Button>
          </div>
        </ListGroupItem>
      ))}
            </>
        ) : (
            <h4 className="text-center" responsive="sm"> <li>Hello {user && user.name}, You have no Task Yet!!!</li></h4>
        )}
    
    </ListGroup>
  );
};

export default TaskList;
