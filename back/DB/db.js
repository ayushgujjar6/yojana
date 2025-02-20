const mysql = require('mysql2');

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'governmentscheme'
});


db.connect((e) => {
    if(e)
    {
        console.error('DB connection failed : ' + e.stack);
        return;
    }
    else{
        console.log('Connected to MySQL Database');
    }
});

module.exports = db;