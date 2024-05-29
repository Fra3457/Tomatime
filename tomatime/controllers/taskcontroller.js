const databasePool = require("../db.js");
const { use } = require("../routes/taskroute.js");

/*exports.changeState = async (req,res) => {
    
    const id = req.body.id; //id task
    const email = req.body.email;
    const nextState = req.body.nextState;

    try{

        //const NumeroTaskInWorkingAt = checkTaskInWorkingAt(email);    

        const [rows,fields] = await databasePool.execute(
            `SELECT COUNT(*)
             FROM tasks
             WHERE state = "working at" AND email = ?`,
            [email]
        );
            
        const numeroTaskInWorkingAt = rows[0]["COUNT(*)"]; 
        //const numeroTaskInWorkingAt = 1;
        if(numeroTaskInWorkingAt == 1){
            // se c'è già una task in working at per l'utente,non è possibile inserirne altre

            if(nextState != "working at"){
                const [tasks]  = await databasePool.execute(//update dello stato della task
                    `UPDATE tasks
                    SET state = ?
                    WHERE id = ?`,
                    [nextState,id]
                );

                res.status(200).json({
                    msg: "Stato del task modificato"   
                });
            }else{
                res.status(400).json({
                    msg:`C'è già una task in un working at` 
                });
            }
        }
    }catch(error){
        console.error(error)
        res.status(500)
    }
}
*/









exports.countdone = async (req,res) => {
    const email = req.body.email;
    

    if(!email){
        res.status(400).json({
            msg: 'Campi non presenti'
        })
    }else{
        

    try{
        const [task] = await databasePool.query("SELECT COUNT(tasks.id) AS done FROM tasks WHERE tasks.email=? and tasks.state='done'",[email]);
        const number = Number(task[0].done);

        res.status(200).json({
            number: number,
            msg: 'Conteggio effettuato'
        })

    }catch(errore){
        console.error(errore);
        res.status(500)
    }
    }

}




exports.changeState = async (req,res) => {
    
    const {id,email,state} = req.body
    
    const [numeroTaskInWorkingAt] = await databasePool.query("SELECT Count(tasks.state) as count From tasks where tasks.state='working at'");
    const count = numeroTaskInWorkingAt[0].count;
    
    if(count < 1 || state !== 'working at'){
        try{
            if(state=="done"){

                let [task1] = await databasePool.query("UPDATE tasks SET endate=NOW(), state=? WHERE id=? and email=?",[state,id,email])
                // let [end] = await databasePool.query("INSERT INTO tasks(endate) VALUES(NOW())");
                res.status(200).json(task1);
                
            }else{
                
                 const [task] = await databasePool.query("UPDATE tasks SET state=? WHERE id=? and email=?",[state,id,email])
                 res.status(200).json(task);
            }



        }catch(errore){
            console.error(errore);
            res.status(500);
        }
    }else{
        res.status(400).json({

            msg: 'Ci sono già altre task in working at'
        })
    }



    //const id = req.body.id;
    //const email = req.body.email;
    //const state = req.body.state;

    /*if(!id || !email || !state){
        return res.status(400).json({
            msg: 'Inserire tutti i campi'
        })
    }else{*/
        
    //}





}



exports.modifyTask = async (req,res) => {

    const id = req.body.id;
    const name = req.body.name;
    const descrizione = req.body.description;
  
    if(!id){
        res.status(400).json({
            msg: "per favore, inserisci Id e titolo task"
        });
    }

    try{

        let [task] = [];
        const [nomeoriginale] = await databasePool.query("Select name From tasks where id = ?", [id])
        if(descrizione != "" && name != ""){
            [task] = await databasePool.execute(
                `UPDATE tasks
                    SET name = ?, description = ?
                    WHERE id = ?;`,
                [name,descrizione,id]
            )
        }else {
            [task] = await databasePool.execute(
                `UPDATE tasks
                    SET description = ?, name =?
                    WHERE id = ?;`,
                [descrizione, nomeoriginale,id]
            )
            console.log("1",[task])
        }
        const [aggiornata] = await databasePool.query("Select * From tasks where id = ?", [id])
        res.status(200).json({
            msg: "Task modificata con successo",
            aggiornata ,   
        });

    }catch(errore){
        console.error(errore)
        res.sendStatus(400);
    }
}




exports.getodotask = async (req, res) => {
    try{
        const email = req.body.email;
        const [todotask] = await databasePool.query("Select * From tasks where state='to do' and email=?", [email])

        return res.status(200).json(todotask);
    }catch(errore){
        console.error(errore);
        res.sendStatus(500); 
    }
}

exports.getworkingatask = async (req,res) => {
    try{
        const email = req.body.email;
        const [workingatask] = await databasePool.query("Select * From tasks where state='working at' and email=?",[email])
        
        return res.status(200).json(workingatask);
    }catch(errore){
        console.error(errore);
        return res.status(500);
    }
}


exports.getdonetask = async (req,res) => {
    try{
        const email = req.body.email;
        const [donetask] = await databasePool.query("Select * from tasks where state='done' and email=? order by endate desc limit 7",[email])
        return res.status(200).json(donetask);
    }catch(errore){
        console.error(errore);
        return res.status(500);
    }
}



exports.createtask = async (req,res) =>  {
    
        //da aggiungere:non posso creare una task con un email non associata a un utente
            const { name, description, email} = req.body;
            console.log(name,description,email);
        if( !name || !email ){
            return res.status(400).json({
                msg: "Inserire tutti i campi specificati"
            })
        }
        else{
            try {
                const [task] = await databasePool.query("INSERT INTO tasks(name,description,email,creationDate,state) VALUES(?,?,?,NOW(),'to do')",
                [ name,  description, email])
                return res.status(200).json({
                    msg: "Task Creata con successo"
                })
                }catch (errore){
                console.error(errore);
                res.status(500);
            }
        }
    
}


exports.deletetask = async (req,res) => {
    const {id} = req.params;
    console.log(id)
    if(!id){
        res.status(400).json({
            msg:`Fornire identificativo `
        })
    }else{
        try{
            const [task] = await databasePool.query("DELETE FROM tasks Where id=? and state='to do'",[id])
            res.status(200).json({
                msg:'Task Eliminata'
            })

        }catch(errore){
            console.error(errore);
            res.status(500);
        }
    } 
}