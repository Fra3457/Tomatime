import React from "react";
import "../index.css";
function button(props) {
    const classe = "bottone " + props.classe;
    const name = props.name;
    const fillSVG = props.fillSVG;
    return (
        <div>
      <div className="Bottone" > 
            <button class={classe}>
        <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="5 0 30 40" fill="none">
          <g id="Icon_ionic-ios-add-circle-outline" data-name="Icon ionic-ios-add-circle-outline">
                            <path className="svgSave" id="Tracciato_4" data-name="Tracciato 4" d="M27.763,18.437H21.239V11.913a1.4,1.4,0,1,0-2.8,0v6.524H11.913a1.342,1.342,0,0,0-1.4,1.4,1.356,1.356,0,0,0,1.4,1.4h6.524v6.524a1.357,1.357,0,0,0,1.4,1.4,1.394,1.394,0,0,0,1.4-1.4V21.239h6.524a1.4,1.4,0,1,0,0-2.8Z" transform="translate(-1.408 -1.408)" fill={fillSVG } />
            <path className="svgSave" id="Tracciato_5" data-name="Tracciato 5" d="M21.59,5.827a15.757,15.757,0,1,1-11.148,4.615A15.659,15.659,0,0,1,21.59,5.827m0-2.452A18.215,18.215,0,1,0,39.8,21.59,18.212,18.212,0,0,0,21.59,3.375Z" transform="translate(-3.375 -3.375)" fill={fillSVG }/>
          </g>
        </svg>
      <p>{name}</p>
      </button>
        </div>
    </div>
    )
}
export default button;