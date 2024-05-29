import React, {useState, useEffect} from "react";
import Freccia from "../../assets/rightarrows_87880.png";
import Verificato from "../../assets/verificato";
import axios from "axios";


function Visualizza(props) {
    const { task_title, id, fetchTaskToDo, email,desc} = props;
  console.log(id, task_title);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const modify = { id, name, description };
  const fetchModify = async () => {
    console.log(modify);
    const response = await axios.put(`http://localhost:3000/task/modificatask`, modify);
    const results = response.status;
    if (results == 200) {
        console.log(response);}
        fetchTaskToDo()
    
  }
  const Delete = async () => {
    console.log(modify.id);
    const response = await axios.delete(`http://localhost:3000/task/${modify.id}`);
    const results = response.status;
    if (results == 200) {
        console.log(response);}
        fetchTaskToDo()
    
}
    
    
  const [showModal, setShowModal] = useState(false);
  const [showSecondModal, setShowSecondModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openSecondModal = () => {
    setShowSecondModal(true);
  };

  const closeSecondModal = () => {
    setShowSecondModal(false);
  };
  const changestate = async () => {
    const response = await axios.put(`http://localhost:3000/task/cambiastato`, {id ,email,'state':'working at'});
    const results = response.status;
    if (results == 200) {
        console.log(response);}
        fetchTaskToDo()
  }
  return (
        <>
      <div className="Task1" id={id} >
        
            <button class="task1"><div style={{ display: 'flex' }} onClick={openModal}>
                    <Verificato /> <p>{task_title}</p></div>
                    <img src={Freccia} alt="Freccia" className='freccia' onClick={async (e)=>{e.preventDefault()
                  await changestate()}} />
                        </button></div>
            
    
      {showModal && (
        <div className="modal-overlay">
          <div className="modal_alfonso">
            <div className="modal-content_alfonso">
              <div className="modal-title_alfonso">
                <div className="pencil_alfonso">
                  <i className="fa-solid fa-pencil fa-flip-horizontal fa"></i>
                </div>
                <div className="underline_alfonso">
                  <div>
                    <input id="title" type="text" placeholder={task_title} onChange={e => {setName(e.target.value)}} className="input-title_alfonso" />
                    <div>
                    
                    </div>
                  </div>
                </div>
              </div>
              <textarea id="desc" className="description_alfonso" onChange={e => {setDescription(e.target.value)}} placeholder={desc}></textarea>
              <div className="position-button_alfonso">
                <div>
                <button className='deletebutton_alfonso' onClick={openSecondModal}>
                <svg id="Componente_6_38"  data-name="Componente 6 – 38" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
                  <g id="Rettangolo_14" className="rettangolo_cestino" data-name="Rettangolo 14" fill="none" stroke="#d9391e" strokeWidth="1">
                    <rect width="36" height="36" rx="8" stroke="none"/>
                    <rect x="0.5" y="0.5" width="35" height="35" rx="7.5" fill="none"/>
                  </g>
                  <path className="cestino"id="Icon_material-delete" data-name="Icon material-delete" d="M8.643,22.278A2.261,2.261,0,0,0,10.929,24.5h9.143a2.261,2.261,0,0,0,2.286-2.222V8.944H8.643ZM23.5,5.611h-4L18.357,4.5H12.643L11.5,5.611h-4V7.833h16Z" transform="translate(2.5 3.5)" fill="#d9391e"/>
                </svg>   </button>     
                <button className='button-cancel_alfonso'onClick={closeModal}>Cancel</button>
                  <button className='button-add_alfonso' type="submit" onClick={async (e) => {
                    e.preventDefault(); closeModal();
                  await fetchModify()}}>Edit Task</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showSecondModal && (
        <div className="modal-overlay_alfonso">
          <div className="modal2_alfonso">
            <div className="modal-content_alfonso">
              <div className="modal-title2_alfonso">
                <h2>Delete task</h2>
                <p>Are you sure you want to delete this task?</p>
              </div>
              <div className="TaskDelete">
      <button class="taskDelete">
                    <Verificato /> <p>{task_title}</p>
</button>
 </div> <div className="buttons_alfonso">
                <button className='button-cancel_alfonso' onClick={() => { closeSecondModal(); closeModal()}}>Cancel</button>
                  <button className='button-add_alfonso' type="submit"  onClick={async (e) => { e.preventDefault(); await Delete()}}>Delete</button></div>
            </div>
          </div>
        </div>
      )}
        
        </>
  );
}

export default Visualizza;