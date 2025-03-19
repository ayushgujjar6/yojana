const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const db = require('./DB/db');


require('dotenv').config();

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


  //--------------------------------Category--------------------------------------------------------

app.get('/api/category', (req,res) => {
    db.query("SELECT * FROM category_yojana", (err,result) => {
        if(err){
            console.log("Error: ", err);
            return res.status(500).json({error:"Database Error"});
        }
        res.json(result);
    });
});


app.post("/api/new-category", (req, res) => {
    const {category_name, status} = req.body;

    if ( !category_name || !status ) {
        console.error("Validation Error: Missing fields");
        return res.status(400).json({ error: "All fields are required!" });
    }

    const sql = `INSERT INTO category_yojana (category_name, status, ins_date_time, update_date_time) VALUES (?, ?, NOW(), NOW())`;
    

    db.query(sql, [category_name, status], (err, result) => {
        if (err) {
            console.error("Database Insert Error:", err);  // Debugging
            return result.status(500).json({ error: "Failed to add category", details: err.message });
        }
        res.json({ message: "Category added successfully", id: result.insertId });
    });
});


app.put("/api/category/:id", (req, res) => {
    const { id } = req.params;
    const { category_name, status } = req.body;

    const sql = `UPDATE category_yojana 
                 SET category_name = ?, status = ?, update_date_time = NOW() 
                 WHERE category_id = ?`;

    db.query(sql, [category_name, status, id], (err, result) => {
        if (err) {
            result.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: "Category updated successfully" });
    });
});


app.put("/api/category/deactive/:id", (req, res) => {
    const { id } = req.params;
    
    const sql = `UPDATE category_yojana 
                 SET status = 'Deactive', update_date_time = NOW() 
                 WHERE category_id = ?`;

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error deactivating category:", err);
            res.status(500).json({ error: err.message });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ message: "Category not found" });
            return;
        }
        res.json({ message: "Category deactivated successfully" });
    });
});


//----------------------------------------Sub Category---------------------------------------

app.get('/api/subcategory', (req,res) => {
    db.query('SELECT * FROM sub_category ',  (err,result)=> {
        if(err){
            console.log("Error :" , err);
            return res.status(500).json({error:"Database error"});
        }
        res.json(result);
    });
});



app.post('/api/new-subcategory', (req,res)=> {
    const {subcategory_name, category_id, status} = req.body;
    const sql = `INSERT INTO sub_category (subcategory_name, category_id, status, ins_date_time, update_date_time) VALUES (?, ?, ?, NOW(), NOW())`;

    db.query(sql,[subcategory_name ,category_id, status], (err,result)=> {
        if(err){
            console.log("error:" ,err);
            return res.status(500).json({error:"Failed tp Add"});
        }
        res.status(201).json({message:`${subcategory_name} addeed successfully !`});
        
    });
});


// app.delete("/api/subcategory/:id", (req, res) => {
//     const { id } = req.params;
//     const sql = `DELETE FROM sub_category WHERE subcategory_id = ?`;
//     db.query(sql, [id], (err, result) => {
//         if (err) {
//             console.error("Error deleting subcategory:", err);
//             res.status(500).json({ error: err.message });
//             return;
//         }
//         if (result.affectedRows === 0) {
//             res.status(404).json({ message: "subcategory not found" });
//             return;
//         }
//         res.json({ message: "Subcategory deleted successfully" });
//     });
// });


app.put("/api/subcategory/:id", (req, res) => {
    const { subcategory_name, category_id, status } = req.body;
    const {id} = req.params;

    const sql = `UPDATE sub_category 
                 SET subcategory_name = ?, category_id = ?, status = ? , update_date_time = NOW()  
                 WHERE subcategory_id = ?`;

    db.query(sql, [subcategory_name, category_id ,status ,id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: "Sub category updated successfully" });
    });
});


app.put("/api/subcategory/deactive/:id", (req, res) => {
    const {id} = req.params;

    const sql = `UPDATE sub_category 
                 SET status = 'Deactive' , update_date_time = NOW()  
                 WHERE subcategory_id = ?`;

     db.query(sql, [id], (err, result) => {
                    if (err) {
                        console.error("Error deactivating Sub category:", err);
                        res.status(500).json({ error: err.message });
                        return;
                    }
                    if (result.affectedRows === 0) {
                        res.status(404).json({ message: "Sub Category not found" });
                        return;
                    }
                    res.json({ message: "Sub Category deactivated successfully" });
                });            
});


//----------------------------------------Yojana---------------------------------------------

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
    const {category_id, subcategory_id, yojana_type, amount, status, description, link } = req.body;

    if (!category_id || !subcategory_id || !yojana_type || !amount || !status || !description || !link) {
        console.error("Validation Error: Missing fields");
        return res.status(400).json({ error: "All fields are required!" });
    }

    const sql = `INSERT INTO tbl_yojana_type (category_id, subcategory_id, yojana_type, amount, status, description, link, ins_date_time, update_date_time) VALUES (?, ?,?,?, ?, ?, ?, NOW(), NOW())`;
    

    db.query(sql, [category_id, subcategory_id, yojana_type, amount, status, description, link], (err, result) => {
        if (err) {
            console.error("Database Insert Error:", err);  // Debugging
            return res.status(500).json({ error: "Failed to add yojana", details: err.message });
        }
        res.json({ message: "Yojana added successfully", id: result.insertId });
    });
});


// app.delete("/api/yojana/:id", (req, res) => {
//     const { id } = req.params;
//     const sql = `DELETE FROM tbl_yojana_type WHERE yojana_type_id = ?`;
//     db.query(sql, [id], (err, result) => {
//         if (err) {
//             console.error("Error deleting yojana:", err);
//             res.status(500).json({ error: err.message });
//             return;
//         }
//         if (result.affectedRows === 0) {
//             res.status(404).json({ message: "Yojana not found" });
//             return;
//         }
//         res.json({ message: "Yojana deleted successfully" });
//     });
// });



app.put("/api/yojana/:id", (req, res) => {
    const { id } = req.params;
    const { category_id, subcategory_id, yojana_type, amount, status, description, link } = req.body;
   

    const sql = `UPDATE tbl_yojana_type 
                 SET category_id = ?, subcategory_id = ? , yojana_type = ?, amount = ?,  status = ?, description = ?, link = ?, update_date_time = NOW() 
                 WHERE yojana_type_id = ?`;

    db.query(sql, [category_id, subcategory_id, yojana_type,amount, status, description, link, id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            console.log(err);
            return;
        }
        res.json({ message: "Yojana updated successfully" });
    });
});

app.put("/api/yojana/deactive/:id", (req, res) => {
    const { id } = req.params;

    const sql = `UPDATE tbl_yojana_type 
                 SET status = 'Deactive' , update_date_time = NOW() 
                 WHERE yojana_type_id = ?`;

    db.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: "Yojana Deactivated successfully" });
    });
});


//------------------------------------------Yojana-Vice-Document--------------------------------------------------

app.get('/api/document-yojana', (req,res) => {
    db.query("SELECT * FROM document_yojana", (err,result) => {
        if(err){
            console.log("Error: ", err);
            return res.status(500).json({error:"Database Error"});
        }
        res.json(result);
    });
});


app.post("/api/new-document-yojana", (req, res) => {
    const { category_id, subcategory_id, yojana_id, documents, status } = req.body;

    if (!category_id || !subcategory_id || !yojana_id || !Array.isArray(documents) || documents.length === 0 || !status) {
        console.error("Validation Error: Missing fields");
        return res.status(400).json({ error: "All fields are required!" });
    }

    const sql = `INSERT INTO document_yojana 
    (category_id, subcategory_id, yojana_id, document_id, status, ins_date_time, update_date_time) 
    VALUES ?`;

    const values = documents.map(doc_id => [category_id, subcategory_id, yojana_id, doc_id, status, new Date(), new Date()]);

    db.query(sql, [values], (err, result) => {
        if (err) {
            console.error("Database Insert Error:", err);
            return res.status(500).json({ error: "Failed to add Document", details: err.message });
        }
        res.json({ message: "Documents added successfully", affectedRows: result.affectedRows });
    });
});
 
// app.delete("/api/document-yojana/:id", (req, res) => {
//     const { id } = req.params;
//     const sql = `DELETE FROM document_yojana WHERE document_id = ?`;
//     db.query(sql, [id], (err, result) => {
//         if (err) {
//             console.error("Error deleting document:", err);
//             res.status(500).json({ error: err.message });
//             return;
//         }
//         if (result.affectedRows === 0) {
//             res.status(404).json({ message: "Document not found" });
//             return;
//         }
//         res.json({ message: "Document deleted successfully" });
//     });
// });



app.put("/api/document-yojana/:id", (req, res) => {
    const { id } = req.params;
    const { category_id, subcategory_id, documents, status } = req.body;

    const sql = `UPDATE document_yojana 
                 SET category_id = ?, subcategory_id = ?, yojana_id = ?, document_id = ?, status = ?, update_date_time = NOW() 
                 WHERE document_id = ?`;

    const values = [category_id, subcategory_id, yojana_id, documents, status, id]; 


    db.query(sql, [values], (err, result) => {
        if (err) {
            result.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: "Document updated successfully" });
    });
});


app.put("/api/document-yojana/deactive/:id", (req, res) => {
    const { id } = req.params;

    const sql = `UPDATE document_yojana 
                 SET status = 'Deactive', update_date_time = NOW() 
                 WHERE document_id = ?`;

    db.query(sql, [id], (err, result) => {
        if (err) {
            result.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: "Document Deactivated successfully" });
    });
});


//------------------------------------------Document-------------------------------------------------


app.get('/api/document', (req,res) => {
    db.query("SELECT * FROM document", (err,result) => {
        if(err){
            console.log("Error: ", err);
            return res.status(500).json({error:"Database Error"});
        }
        res.json(result);
    });
});


app.post("/api/new-document", (req, res) => {
    const { document_name, status} = req.body;

    if ( !document_name || !status ) {
        console.error("Validation Error: Missing fields");
        return res.status(400).json({ error: "All fields are required!" });
    }

    const sql = `INSERT INTO document (document_name, status, ins_date_time, update_date_time) VALUES (?, ?, NOW(), NOW())`;
    

    db.query(sql, [document_name, status], (err, result) => {
        if (err) {
            console.error("Database Insert Error:", err);  // Debugging
            return res.status(500).json({ error: "Failed to add Document", details: err.message });
        }
        res.json({ message: "Document added successfully", id: result.insertId });
    });
});

 
// app.delete("/api/document/:id", (req, res) => {
//     const { id } = req.params;
//     const sql = `DELETE FROM document WHERE document_id = ?`;
//     db.query(sql, [id], (err, result) => {
//         if (err) {
//             console.error("Error deleting document:", err);
//             res.status(500).json({ error: err.message });
//             return;
//         }
//         if (result.affectedRows === 0) {
//             res.status(404).json({ message: "Document not found" });
//             return;
//         }
//         res.json({ message: "Document deleted successfully" });
//     });
// });


app.put("/api/document/deactive/:id", (req, res) => {
    const { id } = req.params;

    const sql = `UPDATE document 
                 SET  status = 'Deactive' , update_date_time = NOW() 
                 WHERE document_id = ?`;

    db.query(sql, [id], (err, result) => {
        if (err) {
            result.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: "Document Deactivated successfully" });
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
        res.json({ message: "Taluka added successfully", id: result.insertId });
    });
});


// app.delete("/api/taluka/:id", (req, res) => {
//     const { id } = req.params;
//     const sql = `DELETE FROM taluka WHERE taluka_id = ?`;
//     db.query(sql, [id], (err, result) => {
//         if (err) {
//             console.error("Error deleting yojana:", err);
//             res.status(500).json({ error: err.message });
//             return;
//         }
//         if (result.affectedRows === 0) {
//             res.status(404).json({ message: "Yojana not found" });
//             return;
//         }
//         res.json({ message: "Taluka deleted successfully" });
//     });
// });

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
        res.json({ message: "Taluka updated successfully" });
    });
});

app.put("/api/taluka/deactive/:id", (req, res) => {
    const { id } = req.params;

    const sql = `UPDATE taluka 
                 SET status = 'Deactive' , update_date_time = NOW()  
                 WHERE taluka_id = ?`;

    db.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: "Taluka Deactivated successfully" });
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

// app.delete("/api/panchayat/:id", (req, res) => {
//     const { id } = req.params;
//     const sql = `DELETE FROM gram_panchayat WHERE panchayat_id = ?`;
//     db.query(sql, [id], (err, result) => {
//         if (err) {
//             console.error("Error deleting yojana:", err);
//             res.status(500).json({ error: err.message });
//             return;
//         }
//         if (result.affectedRows === 0) {
//             res.status(404).json({ message: "Panchayat not found" });
//             return;
//         }
//         res.json({ message: "Panchayat deleted successfully" });
//     });
// });


app.put("/api/panchayat/:id", (req, res) => {
    const { panchayat_eng, panchayat_marathi, taluka_id, status } = req.body;
    const { id } = req.params;

    const sql = `UPDATE gram_panchayat 
                 SET panchayat_eng = ?, panchayat_marathi = ?, taluka_id = ? , status = ? , update_date_time = NOW()  
                 WHERE panchayat_id = ?`;

    db.query(sql, [panchayat_eng, panchayat_marathi,taluka_id, status ,id], (err, result) => {
        if (err) {
            result.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: "Panchayat updated successfully" });
    });
});

app.put("/api/panchayat/deactive/:id", (req, res) => {
    const { id } = req.params;

    const sql = `UPDATE gram_panchayat 
                 SET status = 'Deactive' , update_date_time = NOW()  
                 WHERE panchayat_id = ?`;

    db.query(sql, [id], (err, result) => {
        if (err) {
            result.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: "Panchayat Deactivated successfully" });
    });
});

//-----------------------------------------------Village------------------------------------------------------

app.get('/api/village/:taluka_id?/:panchayat_id?', (req, res) => {
    let { taluka_id, panchayat_id } = req.params;
    let query = `SELECT * FROM village_tbl WHERE 1=1`; // Always true to simplify conditions
    let values = [];

    if (taluka_id && taluka_id !== "All") {
        query += ` AND taluka_id = ?`;
        values.push(taluka_id);
    }

    if (panchayat_id && panchayat_id !== "All") {
        query += ` AND panchayat_id = ?`;
        values.push(panchayat_id);
    }

    db.query(query, values, (err, result) => {
        if (err) {
            console.log("Error:", err);
            return res.status(500).json({ error: "Database error" });
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


//   app.delete("/api/village/:id", (req, res) => {
//     const { id } = req.params;
//     const sql = `DELETE FROM village_tbl WHERE village_id = ?`;
//     db.query(sql, [id], (err, result) => {
//         if (err) {
//             console.error("Error deleting village:", err);
//             res.status(500).json({ error: err.message });
//             return;
//         }
//         if (result.affectedRows === 0) {
//             res.status(404).json({ message: "Village not found" });
//             return;
//         }
//         res.json({ message: "Village deleted successfully" });
//     });
// });


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


app.put("/api/village/deactive/:id", (req, res) => {
        const { id } = req.params;

    
        const sql = `UPDATE village_tbl 
                     SET status = 'Deactive' ,update_date_time = NOW()  
                     WHERE village_id = ?`;
    
       
                     db.query(sql, [id], (err, result) => {
                        if (err) {
                            res.status(500).json({ error: err.message });
                            return;
                        }
                        res.json({ message: "Village Deactivated successfully" });
                    });
        });











app.listen(process.env.PORT, () => {
    console.log(`Server running on ${process.env.PORT}`);
});





