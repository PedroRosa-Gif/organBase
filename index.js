require('dotenv').config();
const app = require('./src/server');
require('./src/config/database');

const PORT = app.get('port');

app.listen(PORT, ()=>{
    console.log("Listening server on " + PORT + " port!");
});