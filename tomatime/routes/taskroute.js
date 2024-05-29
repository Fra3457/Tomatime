const express = require("express");
const router = express.Router();


const taskcontroller = require('../controllers/taskcontroller');

router.post("/todo/", taskcontroller.getodotask);
router.post("/workingat/", taskcontroller.getworkingatask)
router.post("/done/", taskcontroller.getdonetask);
router.delete("/:id",taskcontroller.deletetask);
router.post("/",taskcontroller.createtask);
router.put('/cambiastato', taskcontroller.changeState);
router.put('/modificatask', taskcontroller.modifyTask);
router.post('/countdone',taskcontroller.countdone);

module.exports = router;


/*
create database tomatime;
use tomatime;

CREATE TABLE users(
    email varchar(30) NOT NULL,
    username varchar(30) NOT NULL,
    name varchar(20) NOT NULL,
    surname varchar(20) NOT NULL,
    passwordUser varchar(30) NOT NULL,
    registrationDate date NOT NULL,
    Active bit NOT NULL,
    PRIMARY KEY(email,username),
    UNIQUE(email)
);

CREATE TABLE tasks(
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name varchar(20) NOT NULL,
    description varchar(30),
    email varchar(30) NOT NULL,
    creationDate datetime NOT NULL,
    state varchar(20) NOT NULL,
    endate datetime,
    FOREIGN KEY (email) REFERENCES users(email)
);

CREATE TABLE lifeCircle(
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name varchar(20),
    duration int NOT NULL,
    lifeType varchar(20) NOT NULL,
    email varchar(30) NOT NULL,
    step int NOT NULL,    
    FOREIGN KEY (email) REFERENCES users(email)
);

CREATE TABLE tomatoes(
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    startDate datetime NOT NULL,
    brokenDate datetime,    
    tomatoType varchar(10) NOT NULL,
    lifeCircleId int NOT NULL,
    FOREIGN KEY (lifeCircleId) REFERENCES lifeCircle(id),
    email varchar(30) NOT NULL,
    FOREIGN KEY (email) REFERENCES users(email)
);
*/

/*
creazione                               ok
    name varchar(20),
    duration int NOT NULL,
    lifeType varchar(20) NOT NULL,
    email varchar(30) NOT NULL,
    

get di tutto ok
get step successivo ok

modifica:
    name varchar(20),
    duration int NOT NULL,
    lifeType varchar(20) NOT NULL,
    

Save: 
    mi viene passato un array di id i quali sono in ordine di step e io devo associare gli id agli step in ordine
    const [id] = req.body


Delete:
    ti permette di eliminare una tupla lifecyrcle


Ripristina:
    impostazione di fabbrica


*/ 

