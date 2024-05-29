const express = require("express");
const router = express.Router();


const tomatocontroller = require('../controllers/tomatocontroller.js');

router.post('/',tomatocontroller.tomatocreate);
router.post('/broke',tomatocontroller.broketomato);
router.post('/tomato',tomatocontroller.tomato);
router.post('/countbroke',tomatocontroller.countbroke);
router.post('/countomato',tomatocontroller.countomato);


module.exports = router;