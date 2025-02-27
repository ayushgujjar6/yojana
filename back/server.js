const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const db = require('./DB/db');



const PORT  = 5555;


const app =express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));



app.post('/api/login', (req,res) => {
    const {email, password } = req.body;

    db.query('SELECT * FROM user WHERE email = ?', [email], async(err, results) => {
        if(err){
            return res.status(505).json({error :'Database Error'});
        }
        if(results.length == 0){
            return res.status(401).json({error : 'Email ID not found'});
        }

        const user = results[0];

        const isMatch = await bcrypt.compare(password,user.password) ;
        if(!isMatch){
            return res.status(401).json({error : 'Email ID or Password is Invalid'});
        }

        const token = jwt.sign({id: user.id}, SECRET_KEY ,{expiresIn: '1h'});

        db.query('UPDATE user SET status = "yes", time = NOW() WHERE id = ?', [user.id]);
        res.json({message: 'Login Successfully', token});

    });
});


app.post('/api/register', async(req,res) => {
    const {email, password, mobileno ,name} = req.body;
    if(!name || !email || !password || !mobileno)
    {
        return res.status(400).json({error: 'All field Required'});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    
    db.query('INSERT INTO user (name, email, password, mobileno, status, time) VALUES (?,?,?,?,?, NOW())', 
        [name, email, hashedPassword, mobileno, "yes"],
        (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({error : 'Database Error' + err.sqlMessage});
            }
            res.status(201).json({message: `${name} registerd successfully !`});
        }
    );
});



app.get('/api/total-yojana', (req, res) => {
    db.query("SELECT COUNT(*) AS total FROM tbl_yojana_type", (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ totalYojana: result[0].total });
    });
  });


app.get('/api/yojana', (req,res) => {
    db.query("SELECT * FROM tbl_yojana_type", (err,result) => {
        if(err){
            console.log("Error: ", err);
            return res.status(500).json({error:"Database Error"});
        }
        res.json(result);
    });
});


app.post("/api/new-yojana", (req, res) => {
    const {category_id,sub_category_id,yojana_type, status, description, link } = req.body;

    if (!category_id || !sub_category_id || !yojana_type || !status || !description || !link) {
        console.error("Validation Error: Missing fields");
        return res.status(400).json({ error: "All fields are required!" });
    }

    const sql = `INSERT INTO tbl_yojana_type (category_id, sub_category_id, yojana_type, status, description, link, ins_date_time, update_date_time) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`;
    

    db.query(sql, [category_id,sub_category_id,yojana_type, status, description, link], (err, result) => {
        if (err) {
            console.error("Database Insert Error:", err);  // Debugging
            return res.status(500).json({ error: "Failed to add yojana", details: err.message });
        }
        res.json({ message: "Yojana added successfully", id: result.insertId });
    });
});


app.delete("/api/yojana/:id", (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM tbl_yojana_type WHERE yojana_type_id = ?`;
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error deleting yojana:", err);
            res.status(500).json({ error: err.message });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ message: "Yojana not found" });
            return;
        }
        res.json({ message: "Yojana deleted successfully" });
    });
});



app.put("/api/yojana/:id", (req, res) => {
    const { id } = req.params;
    const { yojana_type, status, description, link } = req.body;

    const sql = `UPDATE tbl_yojana_type 
                 SET yojana_type = ?, status = ?, description = ?, link = ?, update_date_time = NOW() 
                 WHERE yojana_type_id = ?`;

    db.query(sql, [yojana_type, status, description, link, id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: "Yojana updated successfully" });
    });
});


//------------------------------------------Taluka-----------------------------------------------------



app.get('/api/taluka', (req,res) => {
    db.query("SELECT * FROM taluka", (err,result) => {
        if(err){
            console.log("Error: ", err);
            return res.status(500).json({error:"Database Error"});
        }
        res.json(result);
    });
});


app.post("/api/new-taluka", (req, res) => {
    const {taluka_name_eng, taluka_name_marathi, pincode, status } = req.body;

    if (!taluka_name_eng || !taluka_name_marathi || !pincode || !status) {
        console.error("Validation Error: Missing fields");
        return res.status(400).json({ error: "All fields are required!" });
    }

    const sql = `INSERT INTO taluka ( taluka_name_eng, taluka_name_marathi,  ins_date_time, update_date_time, status ,pincode) VALUES (?, ?,NOW(), NOW(), ? , ?)`;
    

    db.query(sql, [ taluka_name_eng, taluka_name_marathi, status, pincode], (err, result) => {
        if (err) {
            console.error("Database Insert Error:", err);  // Debugging
            return res.status(500).json({ error: "Failed to add yojana", details: err.message });
        }
        res.json({ message: "Yojana added successfully", id: result.insertId });
    });
});


app.delete("/api/taluka/:id", (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM taluka WHERE taluka_id = ?`;
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error deleting yojana:", err);
            res.status(500).json({ error: err.message });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ message: "Yojana not found" });
            return;
        }
        res.json({ message: "Yojana deleted successfully" });
    });
});



app.put("/api/taluka/:id", (req, res) => {
    const { taluka_name_eng, taluka_name_marathi, pincode, status } = req.body;
    const { id } = req.params;

    const sql = `UPDATE taluka 
                 SET taluka_name_eng = ?, taluka_name_marathi = ? ,status = ? , pincode = ?, update_date_time = NOW()  
                 WHERE taluka_id = ?`;

    db.query(sql, [taluka_name_eng, taluka_name_marathi, status,  pincode ,id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: "Yojana updated successfully" });
    });
});

//--------------------------------------Panchayat-----------------------------------------------

app.get('/api/panchayat', (req,res) => {
    const {taluka_id} = req.params;
    db.query('SELECT * FROM gram_panchayat ',  (err,result)=> {
        if(err){
            console.log("Error :" , err);
            return res.status(500).json({error:"Database error"});
        }
        res.json(result);
    });
});



app.get('/api/panchayat/:taluka_id', (req,res) => {
    const {taluka_id} = req.params;
    db.query(`SELECT * FROM gram_panchayat WHERE taluka_id = ?`,[taluka_id],  (err,result)=> {
        if(err){
            console.log("Error :" , err);
            return res.status(500).json({error:"Database error"});
        }
        res.json(result);
    });
});


app.post('/api/new-panchayat', (req,res)=> {
    const {panchayat_eng, panchayat_marathi, taluka_id, status} = req.body;
    const sql = `INSERT INTO gram_panchayat (panchayat_eng, panchayat_marathi, taluka_id, status, ins_date_time, update_date_time) VALUES (?, ?, ?,?, NOW(), NOW())`;

    db.query(sql,[panchayat_eng,panchayat_marathi,taluka_id, status], (err,result)=> {
        if(err){
            console.log("error:" ,err);
            return res.status(500).json({error:"Failed tp Add"});
        }
        res.status(201).json({message:`${panchayat_eng} addeed successfully !`});
        
    });
});


app.delete("/api/panchayat/:id", (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM gram_panchayat WHERE panchayat_id = ?`;
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error deleting yojana:", err);
            res.status(500).json({ error: err.message });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ message: "Panchayat not found" });
            return;
        }
        res.json({ message: "Panchayat deleted successfully" });
    });
});


app.put("/api/panchayat/:id", (req, res) => {
    const { taluka_name_eng, taluka_name_marathi, status } = req.body;
    const { id } = req.params;

    const sql = `UPDATE gram_panchayat 
                 SET panchayat_eng = ?, panchayat_marathi = ?, status = ? , update_date_time = NOW()  
                 WHERE panchayat_id = ?`;

    db.query(sql, [panchayat_eng, panchayat_marathi,status ,id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: "Panchayat updated successfully" });
    });
});

//-----------------------------------------------Village------------------------------------------------------


app.get('/api/village/:taluka_id/:panchayat_id', (req,res) => {
    const {taluka_id, panchayat_id} = req.params;
    db.query(`SELECT * FROM village_tbl WHERE taluka_id = ? AND panchayat_id = ?`,[taluka_id, panchayat_id],  (err,result)=> {
        if(err){
            console.log("Error :" , err);
            return res.status(500).json({error:"Database error"});
        }
        res.json(result);
    });
});


app.post('/api/new-village', (req,res)=> {
    const {village_eng, village_marathi,taluka_id, panchayat_id} = req.body;
    const sql = `INSERT INTO village_tbl (village_eng, village_marathi,taluka_id, panchayat_id, status, ins_date_time, update_date_time) VALUES (?, ?, ?, ?,'yes', NOW(), NOW())`;

    db.query(sql,[village_eng,village_marathi, taluka_id, panchayat_id], (err,result)=> {
        if(err){
            console.log("error:" ,err);
            return res.status(500).json({error:"Failed tp Add"});
        }
        res.status(201).json({message: `${village_eng} addeed successfully !`});
        
    });
});


  app.delete("/api/village/:id", (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM village_tbl WHERE village_id = ?`;
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error deleting village:", err);
            res.status(500).json({ error: err.message });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ message: "Village not found" });
            return;
        }
        res.json({ message: "Village deleted successfully" });
    });
});


app.put("/api/village/:id", (req, res) => {
    const { id } = req.params;
    const { village_eng, village_marathi} = req.body;

    const sql = `UPDATE village_tbl 
                 SET village_eng = ?, village_marathi = ?, update_date_time = NOW()  
                 WHERE village_id = ?`;

   
                 db.query(sql, [village_eng, village_marathi, id], (err, result) => {
                    if (err) {
                        res.status(500).json({ error: err.message });
                        return;
                    }
                    res.json({ message: "Village updated successfully" });
                });
    });











app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});



