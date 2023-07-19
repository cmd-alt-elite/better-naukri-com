import { InputGroup, Form, Button } from 'react-bootstrap';

const CreateRole = () => {
	return ( 
		<div>
			<Form>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control type="email" placeholder="Enter email" />
					<Form.Text className="text-muted">
						We'll never share your email with anyone else.
					</Form.Text>
				</Form.Group>
				<InputGroup>
					<InputGroup.Text>Role</InputGroup.Text>
					<Form.Control aria-label="With textarea" />
				</InputGroup>
				<br />
				<InputGroup>
					<InputGroup.Text>Location</InputGroup.Text>
					<Form.Control aria-label="With textarea" />
				</InputGroup>
				<br />
				<InputGroup>
					<InputGroup.Text>Compensation</InputGroup.Text>
					<Form.Control aria-label="With textarea" />
				</InputGroup>
				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
		</div>
	);
}
 
export default CreateRole;