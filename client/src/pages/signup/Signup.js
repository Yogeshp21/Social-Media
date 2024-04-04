import { useState } from "react";
import {axiosClient} from "../../utils/axiosClient"
import { Link } from "react-router-dom";
import "./Signup.scss";

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handelSubmit(e) {
        e.preventDefault();

        try{
            const result = await axiosClient.post('/auth/signup',{
                name,
                email,
                password,
            });
            console.log(result)

        }
        catch(e){
            console.log(e)
        }

    }


    return (
        <div className="signup">
            <div className="signup-box">
                <h2 className="heading">Sign Up</h2>
                <form onSubmit={handelSubmit}>
                    <label htmlFor="name">Name</label>
                    <input type="name" id="name" className="name" onChange={e => setName(e.target.value)} />

                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" className="email" onChange={e => setEmail(e.target.value)} />

                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" className="password" onChange={e => setPassword(e.target.value)} />

                    <input type="submit" className="submit" />
                </form>
                <p className="sub-heading">Already have an account?
                    <Link to="/login"> Login</Link></p>
            </div>
        </div>
    )
}

export default Signup;