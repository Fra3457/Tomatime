import axios from 'axios';
import React, { useState } from 'react';


function ModalDelete(props) {
  const {id, step, getall, modifyClose} = props
  const [showModal, setShowModal] = useState(false);

  const openModalstop = () => {
    setShowModal(true);
  };

  const closeModalstop = () => {
    setShowModal(false);
  };
  const deletelc = async ()=>{
    const response = await axios.delete(`http://localhost:3000/lifecircle/${id}`)
    const results = response.status
    if(results==200){
      console.log(response.data);
      getall();
    }
  }

  return (
    <div>
      <div className='trash' onClick={()=>{openModalstop()}}>
       <i class="fa-solid fa-trash-can fa-2x"></i>
      </div>
      {showModal && (
        <div className="modal-overlayDel">
          <div className="modalDel">
              <div className="underlineRip">
                  
                  <h2>Delete task</h2>
              </div> 
              <div className="modal-titleRip">
                <p>Are you sure you want to delete this task?</p>
              </div>
              <div className="TaskDelete2">
      <button class="taskDelete2">
      <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="20 20 40 43" fill="none">
  <g id="Icon_ionic-ios-checkmark-circle-outline-2" data-name="Icon ionic-ios-checkmark-circle-outline" transform="translate(22 22)">
        <path id="Tracciato_2-2" data-name="Tracciato 2" d="M29.331,13.842l-1.553-1.534a.341.341,0,0,0-.247-.1h0a.327.327,0,0,0-.247.1L16.521,22.722,12.6,18.96a.351.351,0,0,0-.494,0l-1.57,1.508a.328.328,0,0,0,0,.483L15.48,25.7a1.589,1.589,0,0,0,1.032.483,1.663,1.663,0,0,0,1.023-.466h.009L29.34,14.325A.352.352,0,0,0,29.331,13.842Z" transform="translate(-1.927 -1.188)" fill="#d9391e"/>
        <path id="Tracciato_3-2" data-name="Tracciato 3" d="M21.375,5.8a15.571,15.571,0,1,1-11.016,4.561A15.474,15.474,0,0,1,21.375,5.8m0-2.423a18,18,0,1,0,18,18,18,18,0,0,0-18-18Z" transform="translate(-3.375 -3.375)" fill="#d9391e"/>
          </g>
            </svg> 
      <p>{step.name}</p>
                </button>
               </div>
              <div className='modalbuttonDel'>
                 <button className='button-cancel'onClick={closeModalstop}>Cancel</button>
                  <button className='button-Del' onClick={() => {
                    closeModalstop();
                    deletelc();
                    modifyClose(false)
                   
                    }}>Delete</button>
                    </div>
                 
            </div>
          </div>

      )}
     </div>
  );
}

export default ModalDelete;


