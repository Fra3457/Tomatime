import React, {useState} from 'react';
import   StopButtonIconSvg from '../../../assets/stop-button'
import axios from 'axios';
function StopButton(props) {
    const [showModal, setShowModal] = useState(false);
    const {reset,changes, currentStep, email, active} = props;
    const BrokeTomato = async () => {
      const response = await axios.post(`http://localhost:3000/tomato/broke`,{email, 'step': Number(currentStep)} );
      const results = response.status;
      if (results == 200) {
          console.log(response.data);
          changes(+1)
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
        <div id="stop" className="stopButton" onClick={openModalstop}>
        <StopButtonIconSvg    /></div>
        {showModal && (
          <div className="modal-overlayStop">
            <div className="modalStop">
                <div className="modal-titlestop">
                  <h2>Stop tomato</h2>
                  <p>Do you want to restart another tomato?</p>
                </div>
                <div className='modalbuttonstop'>
                   <button className='button-cancel'onClick={closeModalstop}>Cancel</button>
                    <button className='button-Stop' onClick={() => {closeModalstop(); BrokeTomato(); reset(); active();
                      }}>Stop it!</button>
                </div>  
              </div>
            </div>
  
        )}
       </div>
    );
}

export default StopButton;

