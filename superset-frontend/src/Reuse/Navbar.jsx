import styles from './navbar.module.css';
import rocket from '../assets/rocket.png';

import {Navbar, Nav, Container, Form, FormControl, Button} from 'react-bootstrap';

const MyNavbar = () => {
  const displayPic = sessionStorage.getItem("displayPic");
  const handleLogout = () => {
    sessionStorage.clear();
  }
  return (
    <Navbar expand="lg" className={styles.bgBodyTertiary}>
      <Container>
        <Navbar.Brand href="/" className={styles.brand}>
            <img
              alt=""
              src={rocket}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            SUPER SUPERSET
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
            <Nav.Link href={`/hunting/${sessionStorage.getItem("applicantID")}`}>
                <img src={displayPic} alt="" className={styles.profilePic}/>
            </Nav.Link>
            <Nav.Link href="/" onClick={handleLogout}>
              <button className={styles.button}>
                Logout
              </button>
            </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;