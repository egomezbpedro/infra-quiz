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
    email: '',
    password: ''
  });
  const [formError, setError] = useState(null);

  const { email, password } = formData;
  
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))} 

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify(formData))
    
    await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
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
      console.log(error);
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
        <Form.Group className="mb-3" controlId="formEmail">
        <input type="text" className="text-muted" name="email" id="email"  placeholder="Email"
          value={email}
          onChange={onChange} 
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <input className="text-muted" type="password" name="password" id="password" 
          value={password}
          onChange={onChange} placeholder="Enter a password"></input>
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