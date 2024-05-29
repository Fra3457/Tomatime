// const express = require("express");
// const router = express.Router();

// const autoreController = require('../controllers/autoreController.js')

// router.get('/', autoreController.getAllAutori);
// router.post('/', autoreController.createAutore);
// router.put('/:id', autoreController.editAutore);
// router.delete('/:id', autoreController.deleteAutore);



// module.exports = router;

// SOpra c'è il codice di esempio

const express = require("express");
const router = express.Router();

const usersController = require('../controllers/userscontrollers')
//bisogna richiamare il controller(contiene i metodi) e poi fare le varie chiamate(post)

router.post('/login', usersController.loginUser);
router.post('/register', usersController.createUser);
router.post('/logout', usersController.logoutUser);

module.exports = router;