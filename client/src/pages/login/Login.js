import { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import { axiosClient } from '../../utils/axiosClient'
import "./Login.scss"
import { KEY_ACCESS_TOKEN, setItem } from '../../utils/localStorageManager'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const data = await axiosClient.post("/auth/login", {
                email,
                password
            })

            setItem(KEY_ACCESS_TOKEN,data.accessToken);
            navigate('/')
        }
        catch (error) {
            console.log(error)
        }

    }

    return (
        <div className="login">
            <div className="login-box">
                <h2 className="heading">Login</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" className="email" onChange={(e) => setEmail(e.target.value)} />

                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" className="password" onChange={(e) => setPassword(e.target.value)} />

                    <input type="submit" className="submit" />
                </form>
                <p className="sub-heading">Don't have an account?
                    <Link to="/signup"> Sign Up</Link>
                </p>
            </div>
        </div>
    )
}

export default Login;