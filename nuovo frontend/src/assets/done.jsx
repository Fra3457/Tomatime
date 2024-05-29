import React from "react";
import axios from "axios";
function To_Done(props) {
  const { id, email, active , fetchTasks, changes} = props;
  console.log("id task work_to_done", id[0])
  console.log("done button", props)
  const modify = async () => {
    const response = await axios.put(`http://localhost:3000/task/cambiastato`, {'id':id[0],email,'state':'done'});
    const results = response.status;
    if (results == 200) {
        console.log(response);
        changes(+1)
      
      }
        fetchTasks()
  }
  if (id) {
    return (
      <div onClick={async (e) => { e.preventDefault(); await modify() }}>
        <svg style={{ opacity: 1 }} className="Done_btn" id="done_btn" data-name="Componente 10 – 16" xmlns="http://www.w3.org/2000/svg" width="148" height="40" viewBox="0 0 148 40">
            <rect id="Rettangolo_14" data-name="Rettangolo 14" width="148" height="40" rx="8" fill="none"/>
            <g id="Raggruppa_23" data-name="Raggruppa 23" transform="translate(-800 -979)">
              <text id="Done" transform="translate(874 1005.5)" fill="#d9391e" font-size="20" font-family="Sora"><tspan x="-27" y="0">Done</tspan></text>
              <g id="Icon_feather-arrow-left" data-name="Icon feather-arrow-left" transform="translate(939.5 1014.5) rotate(180)">
                <path id="Tracciato_22" data-name="Tracciato 22" d="M23.5,18H7.5" transform="translate(0 -2.5)" fill="none" stroke="#d9391e" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                <path id="Tracciato_23" data-name="Tracciato 23" d="M15.5,23.5l-8-8,8-8" fill="none" stroke="#d9391e" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
              </g>
            </g>
          </svg>
      </div>
    )
   }
    // else {
    //   return (
    //     <>
    //       <svg style={{ opacity: .5 }} className="Done_btn" id="done_btn" data-name="Componente 10 – 16" xmlns="http://www.w3.org/2000/svg" width="148" height="40" viewBox="0 0 148 40">
    //         <rect id="Rettangolo_14" data-name="Rettangolo 14" width="148" height="40" rx="8" fill="none"/>
    //         <g id="Raggruppa_23" data-name="Raggruppa 23" transform="translate(-800 -979)">
    //           <text id="Done" transform="translate(874 1005.5)" fill="#d9391e" font-size="20" font-family="Sora"><tspan x="-27" y="0">Done</tspan></text>
    //           <g id="Icon_feather-arrow-left" data-name="Icon feather-arrow-left" transform="translate(939.5 1014.5) rotate(180)">
    //             <path id="Tracciato_22" data-name="Tracciato 22" d="M23.5,18H7.5" transform="translate(0 -2.5)" fill="none" stroke="#d9391e" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
    //             <path id="Tracciato_23" data-name="Tracciato 23" d="M15.5,23.5l-8-8,8-8" fill="none" stroke="#d9391e" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
    //           </g>
    //         </g>
    //       </svg>
    //     </>
    //   ) }
}
export default To_Done;