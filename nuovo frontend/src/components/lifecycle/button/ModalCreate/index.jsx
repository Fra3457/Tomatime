import React, { useState } from 'react';
import Dropdown from './Dropdown';
import axios from 'axios';



const ButtonAdd = (props) => {
  const {email,getall} = props
  const [showModal, setShowModal] = useState(false);
  const [name, setname]= useState("")
  const [descrizione, setdescrizione] = useState("")
  const [duration, setduration] = useState("")
  const [lifeType, setLifeType] = useState("")

  const create = async ()=>{
    const inputs= {name, email, descrizione, duration, lifeType};
    const response = await axios.post("http://localhost:3000/lifecircle/", inputs)
    const results = response.status
    if(results==200){
      console.log(response.data);
      getall()
    }
  }

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const classe = "bottone " + "addStep";
  return (
    <div>
      <div className="Bottone" onClick={openModal} > 
            <button class={classe}>
        <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="5 0 30 40" fill="none">
          <g id="Icon_ionic-ios-add-circle-outline" data-name="Icon ionic-ios-add-circle-outline">
                            <path className="svgSave" id="Tracciato_4" data-name="Tracciato 4" d="M27.763,18.437H21.239V11.913a1.4,1.4,0,1,0-2.8,0v6.524H11.913a1.342,1.342,0,0,0-1.4,1.4,1.356,1.356,0,0,0,1.4,1.4h6.524v6.524a1.357,1.357,0,0,0,1.4,1.4,1.394,1.394,0,0,0,1.4-1.4V21.239h6.524a1.4,1.4,0,1,0,0-2.8Z" transform="translate(-1.408 -1.408)" fill="#d9391e" />
            <path className="svgSave" id="Tracciato_5" data-name="Tracciato 5" d="M21.59,5.827a15.757,15.757,0,1,1-11.148,4.615A15.659,15.659,0,0,1,21.59,5.827m0-2.452A18.215,18.215,0,1,0,39.8,21.59,18.212,18.212,0,0,0,21.59,3.375Z" transform="translate(-3.375 -3.375)" fill="#d9391e"/>
          </g>
        </svg>
      <p>ADD STEP</p>
      </button>
        </div>
      {showModal && (
        <div className="modal-overlay-create">
          <div className="modal-create">
            <div className="modal-content-create">
                <div className='modal-title-create'>
                    <div className='underline-create'>
                        <div>                            
                            <input type="text" placeholder='NAME' onChange={e => {setname(e.target.value)}} className='input-title-create' />                        
                        </div>   
                    </div>                  
                </div>             
              <textarea className='description-create' onChange={e => {setdescrizione(e.target.value)}}placeholder='Description'></textarea>
              <div className='input-tomato-create'>
                <input type="number" onChange={e => {setduration(e.target.value)}}placeholder='00'/><span  className='number-create'>duration</span> 
                <Dropdown lifeType={setLifeType}/>
              </div>
              <div className='position-button'>
                <div>
                </div>
                <div>
                    <button className='button-cancel'onClick={closeModal}>Cancel</button>
                    <button className='button-add'onClick={(e)=>{e.preventDefault();closeModal();create()}}>Create</button>
                </div>
             </div>                
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ButtonAdd;