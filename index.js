require('dotenv').config();
const app = require('./src/server');
require('./src/config/database');

app.listen('3306', () => {
    console.log("Server on port: " + '3306');
});