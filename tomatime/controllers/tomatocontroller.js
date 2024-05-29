//per la creazione mi vengono passati: tomatotype ed email attaccando users e lifecircle.
const databasePool = require("../db.js");
const { use } = require("../routes/taskroute.js");

/*
exports.tomatocreate = async (req,res) => {
    const {email,step} = req.body;
    //console.log(email,step);
    if(!email || !step){
        res.status(400).json({
            msg: 'Inserire tutti i valori specificati'
        })
    }else{

        try{
            
            const [lifeCircleId] = await databasePool.query("SELECT id FROM lifeCircle WHERE email=? and step=?",[email,step]);
            //console.log(lifeCircleId);
            const needstep = lifeCircleId[0].id;
            console.log(needstep);
            const [tomato] = await databasePool.query("INSERT INTO tomatoes(startDate,tomatoType,lifeCircleId,email) VALUES(NOW(),'',?,?)",[needstep,email]);
            const [tomatoid] = await databasePool.query("SELECT tomatoes.id FROM tomatoes INNER JOIN lifeCircle ON tomatoes.lifeCircleId = lifeCircle.id WHERE lifeCircle.step = ? AND lifeCircle.email = ?",[step,email])

            //console.log(tomatoid);

            res.status(200).json(tomatoid);

        }catch(errore){
            console.error(errore);
            res.status(500).json({
                msg: 'Pomodoro non creato'
            })
        }

    }
}   


*/


exports.countbroke = async (req,res) => {
    const email = req.body.email;
    
    if(!email){
        res.status(400).json({
            msg: 'Campi non presenti'
        })
    }else{
    try{
        const [tomato] = await databasePool.query("SELECT COUNT(tomatoes.id) AS broke FROM tomatoes WHERE tomatoes.email=? and tomatoes.tomatotype='broken'",[email]) 
        const number = tomato[0].broke;
        res.status(200).json({
            number: number,
            msg: 'Conteggio effettuato'
        })
    }catch(errore){
        console.error(errore);
        res.status(500);
    }
}
}

exports.countomato = async (req,res) => {
    const email = req.body.email;
    if(!email){
        res.status(400).json({
            msg: 'Campi non presenti'
        })
    }else{
    try{
        const [tomato] = await databasePool.query("SELECT COUNT(tomatoes.id) AS tomato FROM tomatoes WHERE tomatoes.email=? and tomatoes.tomatotype='tomato'",[email]) 
        const number = tomato[0].tomato;
        res.status(200).json({
            number: number,
            msg: 'Conteggio effettuato'
        })
    }catch(errore){
        console.error(errore);
        res.status(500);
    }
}
}



exports.tomatocreate = async (req, res) => {
    const { email, currentStep } = req.body;
    
    if (!email || !currentStep) {
        return res.status(400).json({
            msg: 'Inserire tutti i campi specificati'
        });
    } else {
        try {
            // Controlla se esiste un record in lifecircle corrispondente all'email e allo step specificati
            const [lifeCircle] = await databasePool.query("SELECT id FROM lifecircle WHERE email=? and step=?", [email, currentStep]);
            
            // Se non c'è un record corrispondente, restituisci un errore
            if (lifeCircle.length === 0) {
                return res.status(400).json({
                    msg: 'Nessun record trovato in lifecircle per l\'email e lo step specificati'
                });
            }
            
            // Crea il pomodoro utilizzando l'ID del record trovato in lifecircle
            const [tomato] = await databasePool.query("INSERT INTO tomatoes(startDate, tomatoType, lifeCircleId, email) VALUES(NOW(), '', ?, ?)", [lifeCircle[0].id, email]);
            
            // Ottieni l'ID del pomodoro appena creato
            const tomatoId = tomato.insertId;
            
            // Restituisci l'ID del pomodoro creato
            return res.status(200).json({
                tomatoId: tomatoId,
                msg: 'Pomodoro creato con successo'
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                msg: 'Errore durante la creazione del pomodoro'
            });
        }
    }
};



/*
exports.broketomato = async (req,res) => {
    const {step,email} = req.body;
    if(!step || !email){
        res.status(400).json({
            msg: 'Inserire tutti i campi specificati'
        })
    }else{
        try{
            const [tomato] = await databasePool.query("UPDATE tomatoes SET tomatotype='broken' FROM tomatoes,lifeCircle WHERE tomatoes.lifeCircleid=lifeCircle.id and  lifeCircle.step=? and tomatoes.email=?",[step,email])
            res.status(200).json({
                msg: 'Pomodoro rotto'
            })

        }catch(errore){
            console.error(errore);
            res.status(500).json({
                msg: 'Impossibile rompere il pomodoro'
            })
        }
    }
}
*/
exports.broketomato = async (req, res) => {
    const { email } = req.body;
    
    if (!email) {
        return res.status(400).json({
            msg: 'Inserire tutti i campi specificati'
        });
    } else {
        try {
            const [maxid] = await databasePool.query(`
    select Max(id) as massimo
    FROM tomatoes
    WHERE email = ?`,
    [email]
);

const [tomato] = await databasePool.query(`
    UPDATE tomatoes 
    SET tomatoType='broken' 
    where id = ?`, 
    [maxid[0].massimo]
);
            
            res.status(200).json({
                msg: 'Pomodoro rotto'
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                msg: 'Impossibile rompere il pomodoro'
            });
        }
    }
};


exports.tomato = async (req, res) => {
    const { email } = req.body;
    
    if ( !email) {
        return res.status(400).json({
            msg: 'Inserire tutti i campi specificati'
        });
    } else {
        try {
            const [maxid] = await databasePool.query(`
                select Max(id) as massimo
                FROM tomatoes
                WHERE email = ?`,
                [email]
            );
            
            const [tomato] = await databasePool.query(`
                UPDATE tomatoes 
                SET tomatoType='tomato',brokenDate=NULL
                WHERE id = ?`, 
                [maxid[0].massimo]
            
            );            
            res.status(200).json({
                msg: 'Pomodoro intero'
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                msg: 'Impossibile rendere intero il pomodoro'
            });
        }
    }
};






 