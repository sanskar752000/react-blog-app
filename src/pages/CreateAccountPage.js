import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"

const CreateAccountPage = () => {

    const [createAccFormData, setCreateAccFormData] = React.useState(
        {
            email: "",
            password: "",
            confirmPassword: ""
        }
    )
    const [error, setError] = React.useState('')
    const navigate = useNavigate();

    const signUp = async () => {
        try {
            if(createAccFormData.password !== createAccFormData.confirmPassword) {
                setError('Password and confirm password do not match')
                return;
            }

            await createUserWithEmailAndPassword(getAuth(), createAccFormData.email, createAccFormData.password);
            navigate('/articles')
        } catch(e) {
            setError(e.message)
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setCreateAccFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    return (
        <>
        
            <h1>Create Account</h1>
            { error && <p className="error">{error}</p> }
            <input 
                placeholder="Your email address"
                name="email"
                value={createAccFormData.email}
                onChange={handleChange}
                type="email"
            />
            <input 
                placeholder="Your password"
                name="password"
                value={createAccFormData.password}
                onChange={handleChange}
                type="password"
            />
            <input 
                placeholder="Re-enter your password"
                name="confirmPassword"
                value={createAccFormData.confirmPassword}
                onChange={handleChange}
                type="password"
            />
            <button onClick={signUp}>Create Account</button>
            <Link to="/login">Already have an account? Log In here</Link>
        </>
    )
}

export default CreateAccountPage