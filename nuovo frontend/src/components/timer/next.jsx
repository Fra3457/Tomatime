import React, { useEffect , useState} from "react";
import axios from "axios";
function Next (props){
    const [NextStep, setNextStep] = useState([]);
    const {currentStep, email} = props;
    const nextStep = async () => {
        const response = await axios.post(`http://localhost:3000/lifecircle/nextstep`,{ email,'step':Number(currentStep)});
    const results = response.status;
    if (results == 200) {
        console.log(response.data);
        setNextStep(response.data)
    }
    }
    useEffect(() => {
        nextStep()
    },[currentStep])

    return(
        <>
            {NextStep.map((element) => { if (element != "null") return <p>NEXT: {element.lifeType.toUpperCase()} ( +{element.duration} MIN )</p> })}
        </>
    )
}
export default Next;