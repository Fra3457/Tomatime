import React from "react";
localStorage.setItem('taskWork', false);
let TaskWork = localStorage.getItem('taskWork');

function Set_TaskWorkOn() {
    console.log(TaskWork)
    return (<>{localStorage.setItem('taskWork', true)}
                {TaskWork = localStorage.getItem( 'taskWork')} 
                {console.log(TaskWork)}
                {window.location.reload()}</>)
}
export {Set_TaskWorkOn,TaskWork};