import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const LoginPage = () => {

    const [loginFormData, setLoginFormData] = React.useState(
        {
            email: "",
            password: ""
        }
    )
    const [error, setError] = React.useState('')
    const navigate = useNavigate();

    const logIn = async () => {
        try {
            await signInWithEmailAndPassword(getAuth(), loginFormData.email, loginFormData.password)
            navigate('/articles')
        } catch(e) {
            setError(e.message)
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setLoginFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    return (
        <>
        
            <h1>Log In</h1>
            { error && <p className="error">{error}</p> }
            <input 
                placeholder="Your email address"
                name="email"
                value={loginFormData.email}
                onChange={handleChange}
                type="email"
            />
            <input 
                placeholder="Your password"
                name="password"
                value={loginFormData.password}
                onChange={handleChange}
                type="password"
            />
            <button onClick={logIn}>Log In</button>
            <Link to="/create-account">Don't have an account? Create on here</Link>
        </>
    )
}

export default LoginPage