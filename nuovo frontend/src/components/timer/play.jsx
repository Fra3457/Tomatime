import React from "react";
import axios from "axios";
import StopButton from "../lifecycle/button/StopButton";
//bottone play

import PlayButton from "../../assets/play";
function Play(props) {
    const { lifecycle, email, changes, currentStep, reset, createPomodoro, onToggleCountdown, isActiveHome = false, hasTasksInWorkingAt= false } = props;
    const life = lifecycle.map((element)=>{return console.log(element.lyfeType);})
    
    const togglePlay = () => {
        onToggleCountdown();
       // setShowPlay(!showPlay);
    };

    return (
        <div> 

            { (!isActiveHome) ?
                <PlayButton active={togglePlay} createPomodoro={createPomodoro} hasTasksInWorkingAt={hasTasksInWorkingAt}/>
                : <StopButton changes={changes} reset={reset} active={togglePlay} email={email} currentStep={currentStep}/>}
           
            
            </div>
    );
}
export default Play;