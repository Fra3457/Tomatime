import React, { useState } from 'react';
import Dropdown from '../button/ModalCreate/Dropdown';
import axios from 'axios';
import ModalDelete from './delete';
import Step from '../step/step';


const ModalEdit = (props) => {
    const [showModalModify, setShowModalModify] = useState(false);
    const {email, id, getall, step} = props
    const [name, setname]= useState("")
    const [descrizione, setdescrizione] = useState("")
    const [duration, setduration] = useState("")
    const [lifeType, setLifeType] = useState("")

    const edit = async ()=>{
        const inputs= {name,id, email, descrizione, duration, lifeType};
        const response = await axios.put("http://localhost:3000/lifecircle/edit", inputs)
        const results = response.status
        if(results==200){
          console.log(response.data);
          getall();
        }
      }
    const openModal = () => {
        setShowModalModify(true);
    };

    const closeModal = () => {
        setShowModalModify(false);
    };

    return (
        <div>
            <div onClick={openModal}><Step step_title={step}/></div>
            
            {showModalModify && (
                <div className="modal-overlay-create">
                    <div className="modal-create">
                        <div className="modal-content-create">
                            <div className='modal-title-create'>
                                <div className='underline-create'>
                                    <div>
                                        <input type="text" placeholder={step.name} className='input-title-create' onChange={e => {setname(e.target.value)}} />
                                    </div>
                                    <div><ModalDelete step={step} id={id} getall={getall} modifyClose={setShowModalModify} /></div>
                                </div>
                            </div>
                            <textarea className='description-create' placeholder={step.descrizione} onChange={e => {setdescrizione(e.target.value)}} ></textarea>
                            <div className='input-tomato-edit'>
                                <input type="number" placeholder={step.duration} onChange={e => {setduration(e.target.value)}} /><span className='number-create'>duration</span>
                                <Dropdown  lifeType={setLifeType} />
                            </div>
                            <div className='position-button'>
                                <div>
                                </div>
                                <div>
                                    <button className='button-cancel' onClick={closeModal}>Cancel</button>
                                    <button className='button-add'onClick={(e)=>{e.preventDefault(); edit();closeModal();}}>Edit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModalEdit;