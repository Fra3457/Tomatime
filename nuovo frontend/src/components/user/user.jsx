import '../../App.css';
import AccountImage from "../../assets/account.png"
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const DropdownMenu = ( props ) => {
  const {email, controllc} = props;
  const [isOpen, setIsOpen] = useState(false);
  const logout = async () => {
    const response = await axios.post(`http://localhost:3000/users/logout`,{email});
    const results = response.status;
    if (results == 200) {
        console.log(response.data);
        navigate(`/login`)
        }
       
    
    }
  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };
  const navigate = useNavigate();
  return (
    <div className="dropdown" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <img src={AccountImage} alt="User Image" className="AccountImg" />
      {isOpen && (
        <div className="dropdown-menu">
          {/* <ul onClick={()=>{{(controllc)? navigate(`/lifecycle/${email}`) : navigate(`/home/${email}`) }}}>
            <li>{(controllc)? "Edit Cycle": "Home"}</li>
          </ul> */}
          <div>
          <Link to='/login'><button className='logoutbutton' onClick={(e)=>{e.preventDefault(); logout();}}>
            LOGOUT
          </button></Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;