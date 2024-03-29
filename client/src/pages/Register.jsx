import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import { Navigate } from 'react-router-dom';
import {useAuthContext} from "../hooks/useAuthContext"

const Signup = () => {
  const {user} = useAuthContext();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(email, password)
  }

  return (
    <div className="pages">
      {user ? (<Navigate to="/" />) : (<form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      
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

      <button disabled={isLoading}>Sign up</button>
      <div className="error">
        {error && <p className="error">{error}</p>}
      </div>
    </form>)}
    </div>
  )
}

export default Signup