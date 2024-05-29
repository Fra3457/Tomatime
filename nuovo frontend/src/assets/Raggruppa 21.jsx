import React, { useEffect, useState } from "react";
import axios from "axios";
function Counter(props) { 
  const {email, changes} = props
  const [tomato , settomato] = useState(0);
  const [broke , setbroke] = useState(0);
  const [done , setdone] = useState(0);
    const tomatoCount = async () => {
      const response = await axios.post(`http://localhost:3000/tomato/countomato`, {email});
      const results = response.status;
      if (results == 200) {
        console.log(response.data);
        settomato(response.data.number)}
    }
    const doneCount = async () => {
      const response = await axios.post(`http://localhost:3000/task/countdone`, {email});
      const results = response.status;
      if (results == 200) {
        console.log(response.data);
        setdone(response.data.number)}
    }
    const brokeCount = async () => {
      const response = await axios.post(`http://localhost:3000/tomato/countbroke`, {email});
      const results = response.status;
      if (results == 200) {
        console.log(response.data);
        setbroke(response.data.number)}
    }
    useEffect(()=>{tomatoCount(); brokeCount(); doneCount()},[changes])
    return (
        <div className="counter_container">
            <svg xmlns="http://www.w3.org/2000/svg" width="317.988" height="41" viewBox="0 0 317.988 41">
  <g id="Raggruppa_21" data-name="Raggruppa 21" transform="translate(-1369.506 -49.66)">
    <rect id="Rettangolo_23" data-name="Rettangolo 23" width="86" height="40" rx="20" transform="translate(1484.494 50.66)" fill="#fff"/>
    <rect id="Rettangolo_24" data-name="Rettangolo 24" width="86" height="40" rx="20" transform="translate(1369.506 50.66)" fill="#fff"/>
    <rect id="Rettangolo_25" data-name="Rettangolo 25" width="86" height="40" rx="20" transform="translate(1601.494 50.66)" fill="#fff"/>
    <g id="TomatoDone" data-name="Componente 2 – 122" transform="translate(1489.506 49.66)">
      <path id="Icon_awesome-arrow-alt-circle-left" data-name="Icon awesome-arrow-alt-circle-left" d="M16,32A16,16,0,1,1,32,16,16,16,0,0,1,16,32Z" transform="translate(32 36.72) rotate(180)" fill="#d9391e"/>
      <path id="Tracciato_18" data-name="Tracciato 18" d="M14.972,2.41a4.093,4.093,0,0,0-2.994,1.048V.4a.4.4,0,0,0-.4-.4H10.31a.4.4,0,0,0-.4.4V3.457A4.094,4.094,0,0,0,6.917,2.41,9.047,9.047,0,0,0,0,5.925,9.047,9.047,0,0,0,6.917,9.441,3.873,3.873,0,0,0,10.29,7.954a3.454,3.454,0,0,0,.655-2.029A3.454,3.454,0,0,0,11.6,7.954a3.873,3.873,0,0,0,3.373,1.487,9.047,9.047,0,0,0,6.917-3.516A9.047,9.047,0,0,0,14.972,2.41" transform="translate(5.044 -0.001)" fill="#ffde59"/>
    </g>
    <g id="taskDone" data-name="Componente 2 – 123" transform="translate(1373.506 54.66)">
      <g id="Icon_ionic-ios-checkmark-circle-outline" data-name="Icon ionic-ios-checkmark-circle-outline">
        <path id="Tracciato_3" data-name="Tracciato 3" d="M19.375,3.375a16,16,0,1,0,16,16,16,16,0,0,0-16-16Z" transform="translate(-3.375 -3.375)" fill="#ffde59"/>
        <path id="Tracciato_2" data-name="Tracciato 2" d="M27.118,13.671,25.747,12.3a.3.3,0,0,0-.218-.091h0a.286.286,0,0,0-.218.091l-9.5,9.327-3.458-3.37a.307.307,0,0,0-.436,0l-1.386,1.351a.3.3,0,0,0,0,.433l4.362,4.25a1.394,1.394,0,0,0,.911.433,1.46,1.46,0,0,0,.9-.417h.008L27.125,14.1A.318.318,0,0,0,27.118,13.671Z" transform="translate(-2.815 -2.459)" fill="#fff"/>
      </g>
    </g>
    <g id="brokeTomato" data-name="Componente 2 – 124" transform="translate(1607.506 55.66)">
      <g id="Raggruppa_17" data-name="Raggruppa 17">
        <path id="Tracciato_14" data-name="Tracciato 14" d="M421.076,202.277c.03,2.133-1.741,2.383-1.669,3.971s1.379,2.816.145,3.755-9.5,4.4-8.925,5.56,3.7-.072,4.861-1.733,5.514-3.827,5.95-2.744-.218,1.516-1.886,2.455-1.233,2.888-.508,2.888a2.939,2.939,0,0,0,2.83-2.383,2.228,2.228,0,0,1,3.193-1.733c1.088.505,2.249,1.516,2.177,2.672s1.524.144,1.379,1.228-.871,2.961.218,3.033.58-1.805.8-2.744,1.306-3.105,2.539-2.744,1.016,1.155,1.741.65,1.379-.939,2.177-.578,1.306-.65,1.088-1.516-.508-2.888,1.233-3.1,4.426.65,5.369,1.805,2.539,2.166,2.685.65-3.773-1.95-5.224-2.961-1.6-3.466,1.016-4.26,6.82-.578,8.054-1.805-1.886-1.444-3.41-.505-5.768,2.058-7,1.264-.145-1.877-.363-2.816-1.379-.939-1.524-2.166,2.757-4.838,3.846-5.488,0-2.311-.871-1.083-2.249,4.26-4.136,4.838-1.741-.722-2.83-.505-2.577.777-3.429-.009-3.174-1.652-4.117-.5a1.893,1.893,0,0,1-2.612.65c-1.016-.361-2.249-.794-2.032.144s.145,4.26-1.161,3.755a15.732,15.732,0,0,1-4.644-3.538c-.58-.867-2.83-.65-2.394.217S421.04,199.713,421.076,202.277Z" transform="translate(-410.598 -190.982)" fill="#d9391e"/>
        <path id="Tracciato_15" data-name="Tracciato 15" d="M1.109,2.715C.243,3.292-.589.107.567.007,2.347-.148,1.573,2.405,1.109,2.715Z" transform="translate(8.016 0.711) rotate(-25)" fill="#d9391e"/>
        <path id="Tracciato_16" data-name="Tracciato 16" d="M674.674,175.717c-.645-.968.929-1.78,1.393-1.393s.678,1.378-.164,1.618S674.829,175.95,674.674,175.717Z" transform="translate(-654.999 -173.806)" fill="#d9391e"/>
        <path id="Tracciato_17" data-name="Tracciato 17" d="M781.371,558.043c.273,1.093.31,5.262,1.548,4.952s1.548-2.089.7-3.4S781.217,557.424,781.371,558.043Z" transform="translate(-754.726 -533.012)" fill="#d9391e"/>
        <ellipse id="Ellisse_19" data-name="Ellisse 19" cx="1.161" cy="0.696" rx="1.161" ry="0.696" transform="translate(0.573 14.831)" fill="#d9391e"/>
        <circle id="Ellisse_20" data-name="Ellisse 20" cx="0.735" cy="0.735" r="0.735" transform="translate(31.444 22.857)" fill="#d9391e"/>
      </g>
    </g>
    <text id="tomatoTxt" data-name="0" transform="translate(1542.494 77.66)" fill="#d9391e" font-size="20" font-family="Sora" font-weight="700"><tspan x="-7" y="0">{Number(tomato)}</tspan></text>
    <text id="taskTxt" data-name="0" transform="translate(1427.506 77.66)" fill="#d9391e" font-size="20" font-family="Sora" font-weight="700"><tspan x="-7" y="0">{Number(done)}</tspan></text>
    <text id="brokeTomatoTxt" data-name="0" transform="translate(1659.494 77.66)" fill="#d9391e" font-size="20" font-family="Sora" font-weight="700"><tspan x="-7" y="0"> {Number(broke)}</tspan></text>
  </g>
</svg>
        </div>
    )
}

export default Counter;