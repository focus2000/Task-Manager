import React, {useContext, useState} from 'react'
import {Link} from 'react-router-dom'
import {Form, FormGroup,Input, Button, FormControl, Row, Col , Container} from 'react-bootstrap'
import TaskContext from "../../context/taskContext/taskContext";


const AddTask = (props) => {
    const [title,  setTitle] =useState('')
    const {  todos, addTodo} = useContext(TaskContext);


const handleChange = (e) => {
    setTitle(e.target.value)
}


    const handleSubmit = (e) => {
        e.preventDefault()

        const newTodo= {
            title
        }
        addTodo(newTodo)
        props.history.push('/')
    }

    return (
        <Container>
            <div >
            <Row>
                <Col md ='3'></Col>

                <Col md ='6' sm='12' >
                <Form onSubmit ={handleSubmit}>
          <FormGroup>
              <FormControl type='text' value ={title} name ="name" onChange = {handleChange} placeholder ='Enter Task...'></FormControl>
          </FormGroup>

          <Button type='submit'>Submit</Button>
          <Link to ='/' className = 'btn btn-danger ml-2'>Cancel</Link>
      </Form>
                </Col>
                <Col md ='3'></Col>
            </Row>
            </div>
        </Container>
       
       
    )
}

export default AddTask