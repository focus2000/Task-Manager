import React from'react'
import { Container, Nav, Navbar, NavbarBrand, NavItem } from 'react-bootstrap'
import {Link} from 'react-router-dom'



const Headings = () => {
    return (
        <Navbar bg='dark' >
            <Container>
                <NavbarBrand className = "text-white" href  ='/'>Today's Task</NavbarBrand>
                <Nav>
                    <NavItem>
                        <Link className = 'btn btn-primary' to ='/add'>Add Task</Link>
                    </NavItem>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Headings