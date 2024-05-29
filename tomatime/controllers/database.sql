create database tomatime;
use tomatime;

CREATE TABLE users(
    email varchar(30) NOT NULL,
    name varchar(20) NOT NULL,
    surname varchar(20) NOT NULL,
    passwordUser varchar(30) NOT NULL,
    registrationDate date NOT NULL,
    Active int NOT NULL,
    PRIMARY KEY(email),
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

INSERT INTO lifeCircle(name, duration, lifeType, email, step) 
VALUES 
    ('Pomodoro', 25, 'tomato', 'marco@gmail.com', 1),
    ('Pausa', 5, 'break', 'marco@gmail.com', 2),
    ('Pomodoro', 25, 'tomato', 'marco@gmail.com', 3),
    ('Pausa', 5, 'break', 'marco@gmail.com', 4),
    ('Pomodoro', 25, 'tomato', 'marco@gmail.com', 5),
    ('Pausa Lunga', 15, 'long break', 'marco@gmail.com', 6);
