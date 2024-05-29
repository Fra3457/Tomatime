
import React from "react";
import "../components/Home/home.css";
function WorkingAt(props) {
    const p = props.p;
    console.log(p)
    if (p!="") {
        return (
            <>
                <div className="working-at" style={{ backgroundColor: 'white' }}>
                    <p>{p}</p>
                </div>
            </>
    )}
        else return (<div className="working-at"></div>)
    
}

export default WorkingAt;