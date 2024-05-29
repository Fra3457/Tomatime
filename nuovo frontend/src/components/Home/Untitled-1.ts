
function Home() {
    
    const [tasksToDo, setTasksToDo] = useState([]) //array contenente le tasks
    const [taskWorkOn, setTaskWorkOn] = useState([])
    const [changes, setchanges] = useState(0);
    const [taskDone, setTaskDone] = useState([]) 
    //const email =  {email:"peppe@gmail.com"} ;
    const [isActiveHome, setIsActiveHome] = useState()

    function toggleHome() {
        setIsActiveHome(!isActiveHome);
    }

    const { email } = useParams();
    console.log("email prova", email)
    
    const fetchTaskToDo = async () => {
    const response = await axios.post(`http://localhost:3000/task/todo`,{email});
    const results = response.status;
    if (results == 200) {
        console.log(response.data);
        setTasksToDo(response.data)}
        
    
    }
    useEffect(() => {
        fetchTaskToDo();
    }, []);
    const fetchTaskWorkOn = async () => {
    const response = await axios.post(`http://localhost:3000/task/workingat`,{email});
    const results = response.status;
    if (results == 200) {
        console.log(response.data);
        setTaskWorkOn(response.data);
        console.log("prova", taskWorkOn);
        // setTaskWorkOn(taskWorkOn.map((element) => { return element }));
        // console.log("prova22222",taskWorkOn)
        }
        
        
    
}
    useEffect(() => {
        fetchTaskWorkOn();
    }, []);
    const fetchTaskDone = async () => {
    const response = await axios.post(`http://localhost:3000/task/done`,{email});
    const results = response.status;
    if (results == 200) {
        console.log(response.data);
        setTaskDone(response.data)}
        
    
}
    useEffect(() => {
        fetchTaskDone();
    }, []);
    function fetchTasks() {
        fetchTaskToDo();
        fetchTaskWorkOn();
        fetchTaskDone();
    }
    function check() {
        if(taskWorkOn.lenght>0){return true}else{return false}
    }

    const hasTasksInWorkingAt = taskWorkOn.length > 0;
    
    
    // React.useEffect(() => {
    //     axios.get(API)
    //         .then((Response) => {
    //             setTasks(response.data);
    //         })
    //         .catch((error) => {
    //             console.error("errore: ", error);
    //         });
    // }, []);
    return (
        <>
            
        {/* intestazione */}
        <section className="hero-section">
            {/* logo TOMATIME */}
            <img src={Logo} alt="Tomatime" className='logo_home' />
            {/* contatori  */}
            --<Counter email={email} changes={changes} className='counter'/>
            {/* icona account */}
            --<DropdownMenu email={email} controllc={1}/>
        </section>
        {/* Kanban board */}
        <section className="kanbanBoard">
            {/* TO DO */}
            <div className="tasks_to_do">
                    <span>TO DO</span>
                    {console.log(tasksToDo)}
                    { tasksToDo.map((element) => { 
                        if (element != "null") return <Visualizza desc={element.description} email={email} fetchTaskToDo={fetchTasks} task_title={element.name} id={element.id} />
                    })}
                {/* ADD TASK */}
                    <CreateTask fetchTaskToDo={fetchTasks} email={ email} class/>
            </div>
                {/* sezione rettangolo giallo */}
            <div>
            --<Tomato isActiveHome={isActiveHome}  />
                    <div className="time_to_focus" >
                        <span>TIME TO FOCUS</span>
                        {/* TIMER */}
                        --<Countdown  email={ email} changes={setchanges} onToggleHome={toggleHome} isActiveHome={isActiveHome} hasTasksInWorkingAt ={hasTasksInWorkingAt} />
                    
                {/* WORKING AT */}
                <div className="work_at">
                        <p>WORKING AT</p>
                        <section id="workingTask"><WorkingAt p={taskWorkOn.map((element) => { if (element != "null") console.log(element);return ( element.name)})} /></section>
                    <div className="todo_done_btn" id="todo_done_btn">
                            {/* return to TO DO */}
                            --<ToDo active={check} email={email} id={taskWorkOn.map((element) =>{ if (element != "null") console.log(element);return ( element.id)})} fetchTasks={fetchTasks} />
                        {/* return to DONE */}
                        --<To_Done active={check} email={email} id={taskWorkOn.map((element) =>{ if (element != "null") console.log(element);return ( element.id)})} changes={setchanges} fetchTasks={fetchTasks} />
                    </div>    
                </div></div>
            </div>
                {/* DONE */}
                <span className="doneSpan">DONE</span>
            <div className="tasks_done">
                    { taskDone.map((element) => { 
                        if (element != "null") return <Done task_title={element.name} id={element.id} />
                    })}
            </div>
        </section>
    </>
    );
}
export default Home;