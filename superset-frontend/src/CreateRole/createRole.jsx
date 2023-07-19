import axios from 'axios';
import styles from './createRole.module.css';
import { useState } from 'react';
import { InputGroup, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CreateRole = () => {
	const navigate = useNavigate();
	const [role, setRole] = useState("");
	const [location, setLocation] = useState("");
	const [compensation, setCompensation] = useState(0);

	const handleRoleChange = (e) => {
		setRole(e.target.value);
	}

	const handleLocationChange = (e) => {
		setLocation(e.target.value);
	}

	const handleCompChange = (e) => {
		setCompensation(e.target.value);
	}

	const handleSubmit = () => {
		axios.post('https://better-naukri-com.onrender.com/jobs', 
			{
				"role": role,
				"recruiterId": sessionStorage.getItem("recruiterID"),
				"compensation": compensation,
				"location": location
			}
		).then(()=>{
			navigate(`/hiring/${sessionStorage.getItem('recruiterID')}`);
		});
	}

	return ( 
		<div className={styles.formWrapper}>
			<h3>Create a Role</h3>
			<Form>
				<InputGroup>
					<InputGroup.Text>Role</InputGroup.Text>
					<Form.Control aria-label="With textarea" onChange={handleRoleChange}/>
				</InputGroup>
				<br />
				<InputGroup>
					<InputGroup.Text>Location</InputGroup.Text>
					<Form.Control aria-label="With textarea" onChange={handleLocationChange} />
				</InputGroup>
				<br />
				<InputGroup>
					<InputGroup.Text>Compensation</InputGroup.Text>
					<Form.Control aria-label="With textarea" type='number' placeholder='Enter a number' onChange={handleCompChange}/>
				</InputGroup>
				<Button variant="primary" onClick={handleSubmit}>
					Submit
				</Button>
			</Form>
		</div>
	);
}
 
export default CreateRole;