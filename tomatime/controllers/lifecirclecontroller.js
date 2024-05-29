const databasePool = require("../db.js");
const { use } = require("../routes/lifecircleroute.js");





exports.getRemainingTime = async (req, res) => {
    const user_id = req.params.email;
    if (user_id) {
        try {
            
            const [lastTimer] = await databasePool.query(`SELECT * FROM tomatoes WHERE id=(SELECT MAX(id) FROM tomatoes where email = ?)`, [user_id]);
            
            
            if (lastTimer.length > 0) {
                const steptimer = lastTimer[0].step;
                const lifeid = lastTimer[0].lifeCircleId;
                const [lifetomato] = await databasePool.query(`SELECT lifeCircle.id, lifeCircle.duration, lifeCircle.lifeType FROM lifeCircle, tomatoes WHERE tomatoes.lifeCircleId=? and tomatoes.lifeCircleId=lifeCircle.id limit 1`, [lifeid]);
             
                if (lifetomato.length > 0) {
                    const lastTimerDate = new Date(lastTimer[0].startDate);
                    const lastTimerDateGetTime = lastTimerDate.getTime();
                    const timeDifference = Math.abs(lastTimerDateGetTime - Date.now()) / 1000;
                    
                    if ((timeDifference / 60) < lifetomato[0].duration) {
                        const minutes = Math.floor(timeDifference / 60);
                        const seconds = Math.floor(timeDifference % 60);
                        const remainingSeconds = (lifetomato[0].duration * 60) - (minutes * 60 + seconds);

                        return res.status(200).json({
                            seconds: remainingSeconds,
                            step: steptimer,
                            msg: 'Seconds'
                        });
                    } else {
                        // Se il tempo trascorso supera la durata del pomodoro, il pomodoro è completato
                        // Eseguire l'aggiornamento dello stato del timer o altre azioni necessarie
                        // await databasePool.execute(`UPDATE Timer SET state="COMPLETED" WHERE id = ?`, [lastTimer[0].id]);
                        return res.status(200).json({ msg: "Pomodoro completato", msg: 'Complete' });
                    }
                }
            }
            return res.status(200).json({ msg: "Il pomodoro è rotto o completato", msg: 'CompleteOrNot' });
        } catch (errore) {
            console.error(errore);
            return res.sendStatus(500);
        }
    }
    return res.status(400).json({ msg: "Informazioni mancanti" });
}



exports.lifeactive = async (req,res) => {
    const email = req.body.email;

    if(!email){
        res.status(400).json({
            msg: 'Campi mancanti'
        })
    }else{
        try{

            const [lifecount] = await databasePool.query("SELECT Count(active) AS Counted From lifeCircle WHERE active=0 and email=?",[email]);

            let number = Number(lifecount[0].Counted); 


            if(number == 0){
                res.status(400).json({
                    msg: 'Nessun campo attivabile'
                })
            }else
            {
                const [deletestep] = await databasePool.execute("delete from lifeCircle where and email=?",[email])
                const [resetstep]= await databasePool.query("select id from lifeCircle where and email=? order by step",[email] );
                let c=0;
                resetstep.forEach(async (element)=>{
                    c++;
                    const [updatestep]= await databasePool.query("update lifeCircle set lifeCircle.step=? where lifeCircle.id=?", [c,element.id]);

                })
                const [lifeactive] = await databasePool.query("UPDATE lifeCircle SET lifeCircle.active=1 WHERE email=?",[email]);
                res.status(200).json({
                    msg: "Tutti i campi sono stati attivati"
                })
            }




        }catch(errore){
            console.error(errore);
            res.status(500)
        }
    }



}


exports.lifedit = async (req,res) => {

    const {id,email,name, duration, lifeType,  descrizione} = req.body;
    console.log(name,duration,lifeType,descrizione);
    if(!name || !duration || !lifeType ){
        res.status(400).json({
            msg: 'Campi mancanti'
        })
    }else{
        try{
            
            const [lifecircle] = await databasePool.query("UPDATE lifeCircle SET name=?, duration=?, lifeType=?, descrizione=? WHERE id=?",[name,duration,lifeType,descrizione,id]);
           
            res.status(200).json({
                msg: 'Modifica avvenuta con successo'
            })


        }catch(errore){
            console.error(errore)
            res.status(500)
        }
    }


}

exports.lifedelete = async (req,res) => {

    id = req.params.id;

    if(!id){
        res.status(400).json({
            msg: 'Campi mancanti'
        })
    }else{
        try{

            const [lifeCircle] = await databasePool.query("DELETE FROM lifeCircle where id=?",[id]);
            res.status(200).json({
                msg: 'Eliminazione avvenuta'
            })


        }catch(errore){
            console.error(errore)
            res.status(500)
        }
    }



}



exports.lifeget = async (req,res) => {
    const email = req.body.email;
   


    if(!email){
        res.status(400).json({
            msg: 'Campi non inseriti'
        })
    }else{
        try{
            const [lifecircle] = await databasePool.query("SELECT * FROM lifeCircle WHERE email=? ORDER BY step",[email]);
            console.log(lifecircle);
            res.status(200).json({
                lifecircle,
                msg: 'Campi ricevuti con successo'
            })
        }catch(errore)
        {
            console.error(errore);
            res.status(500)
        }
    }



}

 
exports.lifereset = async (req,res) => {

    const email = req.body.email;

        
    
    try{
        
        
     if(!email){
            res.status(400).json({
                msg: 'Dati mancanti'
            });
        }else {


        var insertvalue = [
            ["Pomodoro", 25, "tomato", email, 1],
            ["Pausa", 5, "break", email, 2],
            ["Pomodoro", 25, "tomato", email, 3],
            ["Pausa", 5, "break", email, 4],
            ["Pomodoro", 25, "tomato", email, 5],
            ["Pausa Lunga", 15, "long break", email, 6]
        ];



        const [lifecircle] = await databasePool.query("DELETE FROM lifeCircle WHERE email=?",[email]);
    
        const [insertlifecircle] = await databasePool.query("INSERT INTO lifeCircle(name, duration, lifeType, email, step) VALUES ?", [insertvalue]);
    
        
        res.status(200).json({
            msg: 'Resettato'
        })
        }
    }catch(errore){
        console.error(errore);
        res.status(500);
    }
    
}




exports.getnextstep = async (req, res) => {
    try {
        const email = req.body.email;
        let step = Number(req.body.step);
        const [maxstep] = await databasePool.query("SELECT MAX(step) as bigger FROM lifeCircle where email = ? ",[email]);
        const stepmax = Number(maxstep[0].bigger);
        if (step == stepmax) {
            const [firstTime] = await databasePool.execute(
                "SELECT *  FROM lifecircle WHERE step = 1 AND email = ?",
                    [email]
            );
            return res.status(200).json(firstTime);
        } else {
        const stepprox=step+1;
        const [lifeCircle] = await databasePool.query("Select * From lifeCircle where email=? and step=? ", [email, stepprox])

        res.status(200).json(lifeCircle);}
        
    } catch (errore) { 
        console.error(errore);
        res.sendStatus(500);
    } 
}
 


exports.createlifecircle = async (req, res) => {


    const {name, duration, lifeType,descrizione, email} = req.body;
    
    const [numero] = await databasePool.query("SELECT COUNT(*) AS count FROM lifeCircle WHERE email=?",[email]);
    const count = Number(numero[0].count + 1);
    console.log(count);



    if (!name || !duration || !lifeType || !email) {
        return res.status(400).json({
            msg: "Inserire tutti i campi specificati"
        })
    } else {
        try {
            const [lifeCircle] = await databasePool.query("INSERT INTO lifeCircle(name,duration,lifeType,email,descrizione,step) VALUES(?,?,?,?,?,?)", [name,duration,lifeType,email, descrizione,count])
            return res.status(200).json({
                msg: "LifeCicle Creato con successo"
            })


        } catch (errore) {
            console.error(errore);
            res.sendStatus(500);
        }




    }
}


exports.deletecicle = async (req, res) => {
    const step = req.body.step;

    if (!step) {
        return res.status(400).json({
            error: 'Non sono stati passati i valori necessari'
        });
    }else{
        try{
        const [lifeCircle] = await databasePool.query("DELETE FROM lifeCircle WHERE step=?", [step]);
        

        


        res.status(200).json({
            msg: 'Ciclo eliminato'
        })
        var initialstep,modstep;
        var [stepnumber] = await databasePool.query("SELECT step FROM lifecircle");
        var numeroprova = stepnumber[0].step;
        console.log(stepnumber);
        console.log(numeroprova);
        
        stepnumber.forEach(async (element) => {
            initialstep = element.step;
            modstep = initialstep;
           if(modstep>step){
            modstep = modstep - 1;
            var [updatestep] = await databasePool.query("UPDATE lifecircle SET step=? WHERE step=?",modstep,initialstep)
           } 
        });



        }catch(errore){
            console.error(errore);
            res.status(500)
        }
    }
        
    
}


exports.getFirstTimerAndInterruptTimer = async(req,res)=>{
    const email = req.body.email;
    try{

        const [firstTime] = await databasePool.execute(
            "SELECT lifecircle.duration,lifecircle.lifeType  FROM lifecircle WHERE step = 1 AND email = ?",
                [email]
        );

        return res.status(200).json({ firstTime, step : 1 });
    
    }catch(error){
        console.error(error)
        res.sendStatus(500)
    }
    
    
}




exports.getTimerNextStep = async (req, res) => {
    const email = req.body.email;
    const step = Number(req.body.step);
    
    const [maxstep] = await databasePool.query("SELECT MAX(step) as bigger FROM lifeCircle where email = ? ",[email]);
    const stepmax = Number(maxstep[0].bigger);
    
    if (step > stepmax) {
        return res.status(400).json({
            msg: 'Non ci sono più record da mostrare'
        });
    }

    try {
        let stepCheDeveArrivare = step + 1;
        if (step == stepmax) {
            const [firstTime] = await databasePool.execute(
                "SELECT lifecircle.duration,lifecircle.lifeType  FROM lifecircle WHERE step = 1 AND email = ?",
                    [email]
            );
            return res.status(200).json({
                duration: firstTime,
                step: 1
            });
        } else {
            const [time] = await databasePool.execute(
                "SELECT duration, lifeType FROM lifecircle WHERE step = ? AND email = ?",
                [stepCheDeveArrivare, email]
            );
            return res.status(200).json({
                duration: time,
                step: stepCheDeveArrivare
            });
        }
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
};



