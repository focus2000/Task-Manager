import React from 'react'
import { Container, Row, Col} from 'react-bootstrap'
import Headings from './Headings'
import TaskList from './TaskList'

const Home = () => {
    return(
        <Container>
            <Row>
                <Col md ="3">
                
                </Col>
                <Col md="6">
                <div className="home">
           <Headings/>
           <TaskList/>
       </div>
                </Col>
                <Col md="3">

                </Col>
            </Row>
        </Container>
       
       
    )
}

export default Home