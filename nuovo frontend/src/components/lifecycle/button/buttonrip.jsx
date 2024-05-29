import React , {useState} from "react";
import axios from "axios";
import "../index.css";
function Use(props) {
  const {email,getall} = props
    const classe = "bottone " + "save";
    const [showModal, setShowModal] = useState(false);

    const activate = async ()=>{
      const response = await axios.put("http://localhost:3000/lifecircle/active", {email})
      const results = response.status
      if(results==200){
        console.log(response.data);
        getall();
      }
    }
    const openModalstop = () => {
      setShowModal(true);
    };
  
    const closeModalstop = () => {
      setShowModal(false);
    };
  
    return (
        <div>
      <div className="Bottone" > 
            <button class={classe} onClick={openModalstop}>
        <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="5 0 30 40" fill="none">
          <g id="Icon_ionic-ios-add-circle-outline" data-name="Icon ionic-ios-add-circle-outline">
                            <path className="svgSave" id="Tracciato_4" data-name="Tracciato 4" d="M27.763,18.437H21.239V11.913a1.4,1.4,0,1,0-2.8,0v6.524H11.913a1.342,1.342,0,0,0-1.4,1.4,1.356,1.356,0,0,0,1.4,1.4h6.524v6.524a1.357,1.357,0,0,0,1.4,1.4,1.394,1.394,0,0,0,1.4-1.4V21.239h6.524a1.4,1.4,0,1,0,0-2.8Z" transform="translate(-1.408 -1.408)" fill="#ffffff"  />
            <path className="svgSave" id="Tracciato_5" data-name="Tracciato 5" d="M21.59,5.827a15.757,15.757,0,1,1-11.148,4.615A15.659,15.659,0,0,1,21.59,5.827m0-2.452A18.215,18.215,0,1,0,39.8,21.59,18.212,18.212,0,0,0,21.59,3.375Z" transform="translate(-3.375 -3.375)" fill="#ffffff" />
          </g>
        </svg>
      <p>USE</p>
      </button>
        </div>
        {showModal && (
        <div className="modal-overlayRip">
          <div className="modalRip">
          <div className="underlineRip">
                    <h2>ACTIVE</h2>
                </div>
              <div className="modal-titleRip">
                <p>Are you sure that you want to activate?</p>
              </div>
              <div className='modalbuttonRip'>
                 <button className='button-cancel'onClick={closeModalstop}>Cancel</button>
                  <button className='button-Rip' onClick={() => {closeModalstop(); activate();
                    }}>Use it</button>
                    </div>
            </div>
          </div>
      )}
    </div>
    )
}
export default Use;