import React, {useContext, useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, FormGroup,Input, Button, FormControl, Row, Col , Container} from 'react-bootstrap'
import TaskContext from "../../context/taskContext/taskContext";


const EditTask = (props) => {
    const [selectedTodo,  setSelectedTodo] = useState({
        
        title:''
    });
    const {  todos, editTodo} = useContext(TaskContext);
    const currentTodoId = props.match.params.id;

    useEffect(() => {
        const todoId = currentTodoId;
        const selectedTodo = todos.find(todo => todo._id === todoId)
        setSelectedTodo(selectedTodo)
    }, [currentTodoId, todos])


const handleChange = (e) => {
  setSelectedTodo({...selectedTodo, [e.target.name]: e.target.value})
}


    const handleSubmit = (e) => {
        e.preventDefault()
         editTodo(selectedTodo)
       props.history.push('/')
    }
    return (
        <div>
         <Container>
            <div style={{width: '90% auto', margin:'3rem'}}>
            <Row>
                <Col md ='3'></Col>

                <Col md ='6' sm='12' >
                <Form onSubmit = {handleSubmit}>
          <FormGroup>
              <FormControl type='text' name='title' defaultValue={selectedTodo.title} onChange= {handleChange} placeholder ='Enter Task...'></FormControl>
          </FormGroup>

          <Button type='submit'>Edit-Task</Button>
          <Link to ='/' className = 'btn btn-danger ml-2'>Cancel</Link>
      </Form>
                </Col>
                <Col md ='3'></Col>
            </Row>
            </div>
        </Container>
        </div>
    )
}

export default EditTask