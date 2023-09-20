import { pool } from "../db/db.js";





export const createUserapp= async (req, res) => {
    const data = req.body;
    try {
        await pool.query(
			"INSERT INTO userapp (document, fullname, username, password, userprofile, phone, email, creaciondate, updatedate, lastincome) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NULL, NULL);",
			[data.document, data.fullname, data.username, data.password, data.userprofile, data.phone, data.email]
		);
        return res.status(200).json({ message: "complete process create userapp"}); 
    } catch (error) {
        return res.status(500).json({ message: "error creating userapp" });
    }
};



export const getUserapp= async (req, res) => {
    try {
        const sqlpg = 'SELECT * FROM userapp';
        const result = await pool.query(sqlpg);
        res.json({ result: result.rows });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "error get Userapp" });
    }
};










export const deleteUserapp= async (req, res) => {
    let {id} = req.params;
    let sqlpg = "DELETE FROM userapp WHERE id = '"+id+"'";
    try {
        await pool.query(sqlpg);  
        return res.status(200).json({ message: "Process Delete Complete ", id });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "error delete userapp" });
    }
};
