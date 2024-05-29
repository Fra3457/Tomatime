import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './index.css';
//importazione contatori
import Counter from "../../assets/Raggruppa 21";
//icona account
import DropdownMenu from "../user/user";
//logo TOMATIME
import Logo from "../../assets/Logo.png";
// gli step
import Step from "./step/step";
import ButtonAdd from "./button/ModalCreate/index"
import Use from "./button/buttonrip";
import Restore from "./button/buttonact"
import Tomato from "../../assets/Tomato.png"
import axios from "axios";
import ModalEdit from "./ModalEdit";
function LyfeCycle(props) {
    const {changes} = props
    const { email } = useParams();
    const [step , setstep] = useState([])
    const getall = async () =>{
        const response = await axios.post('http://localhost:3000/lifecircle/getallife', {email})
        const result = response.status;
        if (result == 200){
            console.log(response.data)
            setstep(response.data.lifecircle);
        }
    }
    useEffect(()=>{getall()},[])
    return (
        <>
        {/* intestazione */}
        <section className="hero-section">
            {/* logo TOMATIME */}
            <img src={Logo} alt="Tomatime" className='logo_home' />
            {/* contatori  */}
            <Counter email={email} changes={changes}/>
            {/* icona account */}
            <DropdownMenu email={email} controllc={0} />
        </section>
        {/* Kanban board */}
            <section className="kanbanBoard">
                <div className="step">
                    <span>LYFE CYCLE</span>
                {step.map((element) => { return (<><ModalEdit getall={getall} email={email} id = {element.id} step={element}/></>)})}
                </div>
                <img src={Tomato} alt="tomato" className="tomatoStep"/>
                <div className="buttons">
                    <ButtonAdd getall={getall} email={email}  />
                    <br /><br /><br /><br />
                    <Use getall={getall} email={email} />
                    <br /><br /><br /><br />
                    <Restore getall={getall} email={email}/>
                    
                </div>
            </section>
        </>
    )
}
export default LyfeCycle;