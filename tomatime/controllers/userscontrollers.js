
const databasePool = require('../db.js');

exports.createUser = async(req,res) => {



    function verificanomi(credenziale) {
        credenziale = credenziale.toString();
        let caratteriSpeciali = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;//caratteri speciali

        if (credenziale.length < 3 || credenziale.length > 20) {//controllo lunghezza
            return false;
        }
        
        if (caratteriSpeciali.test(credenziale) == 1) {//con test verifico la non presenza(1 se è presente) dei char nella variabile
            return false;
        }
        
        if (((/[A-Z]/.test(credenziale)) && (/[a-z]/.test(credenziale))) == 0){ 
            return false;// verifico se non c'è almeno 1 char MAIUSC o MINUSC
        }
    
        return true;  // Se la password supera tutte le verifiche, ritorna true
    }



    function verificaCredenziale(credenziale) {
        credenziale = credenziale.toString();
        let caratteriSpeciali = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;//caratteri speciali

        if (credenziale.length < 8 || credenziale.length > 20) {//controllo lunghezza
            return false;
        }
        
        if (caratteriSpeciali.test(credenziale) == 0) {//con test verifico la non presenza(1 se è presente) dei char nella variabile
            return false;
        }
        
        if (((/[A-Z]/.test(credenziale)) && (/[a-z]/.test(credenziale))) == 0){ 
            return false;// verifico se non c'è almeno 1 char MAIUSC o MINUSC
        }
        
        if((/[0-9]/.test(credenziale) == 0)){
            return false;//verifico se non contiene almeno un numero
        }
    
        return true;  // Se la password supera tutte le verifiche, ritorna true
    }

    function validateEmail(inputEmail) {

        let validazione = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        /*
        -->^[a-zA-Z0-9.!#$%&'*+/=?^_{|}-]+: 
        Questa parte corrisponde alla parte locale dell'indirizzo email (prima della @). 
        Accetta lettere minuscole, lettere maiuscole, numeri e i seguenti caratteri speciali: .!#$%&'*+/=?^_{|}-`.
        -->@[a-zA-Z0-9-]+: 
        Questa parte corrisponde alla parte del dominio dell'indirizzo email (dopo la @). 
        Accetta lettere minuscole, lettere maiuscole, numeri e il carattere -.
        -->(?:\.[a-zA-Z0-9-]+)*: 
        Questo gruppo corrisponde ai domini di secondo livello e successivi (ad esempio .com, .co.uk, .net). 
        ?: indica un gruppo non di cattura. Questo gruppo è opzionale e può ripetersi zero o più volte.*/
      
        if (inputEmail.toString().match(validazione)) {
            return true;
        } else {
            return false;
        }
      
    }
    /*Tabella users:    email,name,surname,passwordUser ,registrationDate,Active*/

    let name = req.body.Name;
    let email = req.body.email;
    let passwordUser = req.body.password;
    let ripetiPasswordUser = req.body.confirmPassword;
    let active = 1;//da vedere 


    try{
        if(!name || ! email || !passwordUser || !ripetiPasswordUser ){
            return res.status(400).json({
                msg: "dati incompleti "
            })
        }else if((verificaCredenziale(passwordUser) && verificaCredenziale(ripetiPasswordUser) && verificanomi(name) && validateEmail(email)) == false){
            return res.status(400).json({
                msg: "Credenziali non valide"
            })
        }else if(passwordUser != ripetiPasswordUser){
            return res.status(400).json({
                msg: "Le password non coincidon "
            })
        }else{

            var insertvalue = [
                ["Pomodoro", 25, "pomodoro", email, 1, 1],
                ["Pausa", 5, "pausa", email, 2, 1],
                ["Pomodoro", 25, "pomodoro", email, 3, 1],
                ["Pausa", 5, "pausa", email, 4, 1],
                ["Pomodoro", 25, "pomodoro", email, 5, 1],
                ["Pausa Lunga", 15, "pausa lunga", email, 6, 1]
            ];

            

            const [utenteRegistrato] = await databasePool.execute(`
                INSERT INTO users (email,name,passwordUser,registrationDate,Active) VALUES (?,?,?,NOW(),?)`,
                [email,name,passwordUser,active]
            );
            
            const [insertlifecircle] = await databasePool.query("INSERT INTO lifeCircle(name, duration, lifeType, email, step, active) VALUES ?", [insertvalue]);
    

            return res.status(200).json({
                msg: "Utente registrato "
            })
    
        }
  
        
    }catch(error){
        console.error(error)
        res.sendStatus(500);
    }
}

exports.loginUser = async (req,res) => {

    function verificaCredenziale(credenziale) {
        credenziale = credenziale.toString();
        let caratteriSpeciali = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;//caratteri speciali

        if (credenziale.length < 8 || credenziale.length > 20) {//controllo lunghezza
            return false;
        }
        
        if (caratteriSpeciali.test(credenziale) == 0) {//con test verifico la non presenza(1 se è presente) dei char nella variabile
            return false;
        }
        
        if (((/[A-Z]/.test(credenziale)) && (/[a-z]/.test(credenziale))) == 0){ 
            return false;// verifico se non c'è almeno 1 char MAIUSC o MINUSC
        }
        
        if((/[0-9]/.test(credenziale) == 0)){
            return false;//verifico se non contiene almeno un numero
        }
    
        return true;  // Se la password supera tutte le verifiche, ritorna true
    }

    function validateEmail(inputEmail) {

        let validazione = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        /*
        -->^[a-zA-Z0-9.!#$%&'*+/=?^_{|}-]+: 
        Questa parte corrisponde alla parte locale dell'indirizzo email (prima della @). 
        Accetta lettere minuscole, lettere maiuscole, numeri e i seguenti caratteri speciali: .!#$%&'*+/=?^_{|}-`.
        -->@[a-zA-Z0-9-]+: 
        Questa parte corrisponde alla parte del dominio dell'indirizzo email (dopo la @). 
        Accetta lettere minuscole, lettere maiuscole, numeri e il carattere -.
        -->(?:\.[a-zA-Z0-9-]+)*: 
        Questo gruppo corrisponde ai domini di secondo livello e successivi (ad esempio .com, .co.uk, .net). 
        ?: indica un gruppo non di cattura. Questo gruppo è opzionale e può ripetersi zero o più volte.*/
      
         return inputEmail.toString().match(validazione) !== null;
      
    }
    
    let {email, passwordUser} = req.body;
    email = email.toString();
    passwordUser = passwordUser.toString();

    try{
        console.log(verificaCredenziale(passwordUser));
        console.log(validateEmail(email));
        if((verificaCredenziale(passwordUser) && validateEmail(email))== true){
            const [users]  = await databasePool.query(//users sarà un array
                "SELECT * FROM users WHERE email = ? AND passwordUser = ? LIMIT 1",
                [email,passwordUser]
            
            ); 
                
            if (users.length > 0 ) {
                const [usersflag]  = await databasePool.query(
                    "UPDATE users SET Active=1 WHERE email = ? AND passwordUser = ?",
                    [email,passwordUser]
                );  // rende attivo il profilo
                return res.status(200).json({
                    msg: " Ti sei loggato con successo"
                })    
            }else{
                return res.status(400).json({
                    msg: "Utente non presente "
                })  
            }  
        
        }else return res.status(400).json({
            msg: "Credeziali non valide"
        })    
        
    }catch(error){
        console.error(error)
        return res.sendStatus(500)
    }        
}

exports.logoutUser = async (req,res) => {

    let email = req.body.email;


    try{
        const [users]  = await databasePool.query(//users sarà un array
            "SELECT * FROM users WHERE email = ? ",
            [email]
        ); 

            if (users.length > 0 ) {
                const [usersflag]  = await databasePool.query(
                    "UPDATE users SET Active=0 WHERE email = ?",
                    [email]
                );  // rende inattivo il profilo
                return res.status(200).json({
                    msg: " Ti sei disconnesso con successo"
                })    
            }else{
                return res.status(400).json({
                    msg: "Utente non presente "
                })  
            }  

    }catch(error){
        console.error(error)
        return res.sendStatus(500)
    }


}

