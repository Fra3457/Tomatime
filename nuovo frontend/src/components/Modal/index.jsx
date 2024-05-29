import React, { useState } from 'react';
import Home from '../Home/Home';
import axios from 'axios';

function CreateTask(props) {
  const { fetchTaskToDo, email } = props;
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const fetchNewTask = async () => {
    const newTask = { name, description, email};
    console.log(newTask);
    const response = await axios.post(`http://localhost:3000/task`, newTask);
    const results = response.status;
    if (results == 200) {
        console.log(response.data);
        fetchTaskToDo()
    }
}
   

  return (
    <div>
      <div className="Bottone" >
            <button class="bottone"onClick={openModal}>
        <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="5 0 30 40" fill="none">
          <g id="Icon_ionic-ios-add-circle-outline" data-name="Icon ionic-ios-add-circle-outline">
            <path id="Tracciato_4" data-name="Tracciato 4" d="M27.763,18.437H21.239V11.913a1.4,1.4,0,1,0-2.8,0v6.524H11.913a1.342,1.342,0,0,0-1.4,1.4,1.356,1.356,0,0,0,1.4,1.4h6.524v6.524a1.357,1.357,0,0,0,1.4,1.4,1.394,1.394,0,0,0,1.4-1.4V21.239h6.524a1.4,1.4,0,1,0,0-2.8Z" transform="translate(-1.408 -1.408)" fill="#d9391e"/>
            <path id="Tracciato_5" data-name="Tracciato 5" d="M21.59,5.827a15.757,15.757,0,1,1-11.148,4.615A15.659,15.659,0,0,1,21.59,5.827m0-2.452A18.215,18.215,0,1,0,39.8,21.59,18.212,18.212,0,0,0,21.59,3.375Z" transform="translate(-3.375 -3.375)" fill="#d9391e"/>
          </g>
        </svg>
      <p>Add Task</p>
      </button>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-content">
                <div className='modal-title'>
                    <div className='pencil'>
                        <i class="fa-solid fa-pencil fa-flip-horizontal fa"></i>
                    </div>
                    <div className='underline'>
                        <div>                            
                            <input id='title' type="text" placeholder='Send message' onChange={e => {setName(e.target.value)}} className='input-title' />                        
                        </div>   
                    </div>                  
                </div>             
              <textarea id='desc' className='description' placeholder='Send a message to Tony: see you tomorrow?'onChange={e => {setDescription(e.target.value)}} ></textarea>
              <div className='position-button'>
                <div>
                </div>
                <div>
                    <button className='button-cancel'onClick={closeModal}>Cancel</button>
                  <button className='button-add' onClick={() => {
                      const title = document.getElementById("title").value;
                    console.log(title);
                    if (title) { closeModal();  fetchNewTask()}
                      else { alert('Please insert a valid task')}
                    }}>Add Task</button>
                </div>
            </div>                
            </div>
          </div>
        </div>
      )} 
    </div>
  );
};

export default CreateTask;