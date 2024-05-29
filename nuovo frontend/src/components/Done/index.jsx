import React from 'react';

function Done(props) {
    const { task_title, id } = props;
    return (
        <div>
            <div className='task-done' id={id}>
                <div className='check'>
                    <i class="fa-solid fa-circle-check fa"></i>
                </div>
                <div className='text'>
                    {task_title}
                </div>
            </div>
        </div>
    );
}

export default Done;