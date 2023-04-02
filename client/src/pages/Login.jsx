import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import { Navigate } from 'react-router-dom';
import {useAuthContext} from "../hooks/useAuthContext"

const Login = () => {
  const {user} = useAuthContext();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password)
  }

  return (
    <div className="pages">
      {user ? (
        <Navigate to="/" />
    ) : (
        <form className="login" onSubmit={handleSubmit}>
        <h3>Log In</h3>
        
        <label>Email address:</label>
        <input 
          type="email" 
          onChange={(e) => setEmail(e.target.value)} 
          value={email} 
        />
        <label>Password:</label>
        <input 
          type="password" 
          onChange={(e) => setPassword(e.target.value)} 
          value={password} 
        />

        <button disabled={isLoading}>Log in</button>
        <div className="error">
          {error && <p className="error">{error}</p>}
        </div>
      </form>
      )}
    </div>
  )
}

export default Login