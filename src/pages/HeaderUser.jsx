import React from 'react'
import { Col, Container, Nav, Row, Tab } from 'react-bootstrap';
import SignIn from '../components/Auth/SignIn';
import SignUp from '../components/Auth/SignUp';

function HeaderUser() {
  return (
    <div>
      <Container className='m-5'>
            <Row className='justify-content-center'>
                <Col sm={8} md={6}>
                    <h1 className='mb-4'>Login</h1>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <Nav variant="underline" className='mb-4'>
                            <Nav.Item>
                                <Nav.Link eventKey="first">Sign In</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">Sign Up</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <SignIn />
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <SignUp />
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </Col>
            </Row>
        </Container>
    </div>
  )
}

export default HeaderUser;
