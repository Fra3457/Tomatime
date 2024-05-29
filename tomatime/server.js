
const express = require("express")
const cors = require("cors");
const app = express();
const port = 3000;
const usersroutes = require("./routes/usersroutes.js");

app.use(cors());
const taskroute = require('./routes/taskroute.js');

const lifecircleroute = require("./routes/lifecircleroute.js");

const tomatoroute = require("./routes/tomatoroutes.js");

app.use(express.json());
app.use('/task', taskroute);
app.use('/users',usersroutes);
app.use('/lifecircle',lifecircleroute);
app.use('/tomato',tomatoroute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

