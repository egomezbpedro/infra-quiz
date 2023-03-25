import React from 'react'
import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
  });
  const [formError, setError] = useState(null);

  const { username } = formData;
  
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))} 

  const onSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then( response => response.json())
    .then( data => {
      if (data.error) {
        setError(data.error)
      }
      else {
        setError(null)
        navigate('/game')
        console.log(data)
      }
    })
    .catch((error) => {
      console.log(`There was an error: ${error}`)
    })
  }

  return (
    <Container className='mt-5'>

      <Container>
        <h1><FaSignInAlt/> Login</h1>
        <p>Login to play</p>
      </Container>

      <Container>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="formUsername">
          <input type="text" className="text-muted" name="username" id="username"  placeholder="Enter a username"
            value={username}
            onChange={onChange} 
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>        

        </Form>
      </Container>

      <Container>
        {formError && <div className="error">{formError}</div>}
      </Container>

    </Container>
)}

export default Login