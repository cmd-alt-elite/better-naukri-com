import styles from './navbar.module.css';
import rocket from '../assets/rocket.png';

import {Navbar, Nav, Container, Form, FormControl, Button} from 'react-bootstrap';

const MyNavbar = () => {
  return (
    <Navbar expand="lg" className={styles.bgBodyTertiary}>
      <Container>
        <Navbar.Brand href="#home">
            <img
              alt=""
              src={rocket}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            BETTER SUPERSET
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        

        <Form inline className={styles.flexWrap}>
            <FormControl 
                type="text" 
                placeholder="Search" 
                className="pr-sm-2"
            />
            <Button variant="outline-success">Search</Button>
        </Form>

        <Nav>
            <Nav.Link href="/login">Login</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;