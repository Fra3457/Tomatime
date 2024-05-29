import React, {useEffect, useState} from "react";
import axios from "axios";
import Logo from "../../assets/Logo.png"
import Slogan from "../../assets/Raggruppa 22.png"

import { useNavigate } from "react-router-dom";
function Login() {
    

    const fetchLogin = async () => {
        const Log = {email, passwordUser};
        const response = await axios.post(`http://localhost:3000/users/login`,Log);
        const results = response.status;
        if (results == 200) {
            console.log("log", Log);
            navigate(`/home/${email}`)
        }
    }
    
const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [passwordUser, setPasswordUser] = useState("");
    return (
        //sfondo
        <div className="log_background">
            
            {/*logo*/}
            <img src={Logo} alt="Tomatime" className='logo_login' />
            {/*slogan e form */}
            <img src={Slogan} alt="time to focus for a break" className='slogan' />

        <form className="log" method="post" onSubmit={(e)=>{e.preventDefault()
        fetchLogin()}}>
        
            <h1 className="login" >LOGIN</h1>
            
            {/* input email */}
            <div className="email">
                <input type="input" className="form__field" placeholder="Email" name="email" id='email'onChange={e => {setEmail(e.target.value)}} required />
                <label for="email" className="form__label">Email</label>
            </div>
        
            {/* input password */}
            <div className="password">
                <input type="input" className="form__field" placeholder="Password" onChange={e => {setPasswordUser(e.target.value)}} name="password" id='password' required />
                <label for="password" className="form__label">Password</label>
            </div>
        
            {/* bottone */}
            <button className="log_button" type="submit">LOGIN</button>

            <p className="notReg">Not registred yet? <a href="http://localhost:5173/registration">Register Now</a></p>
        </form>
        </div>
    )
}

export default Login;