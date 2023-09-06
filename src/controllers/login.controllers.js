import { pool } from "../db/db.js";

export const login = async (req, res) => {
  try {
    let status = true;
    const { username, password } = req.body;
    const [rows] = await pool.query("SELECT `document`,`fullname`,`userprofile`,`phone`,`email` FROM `userapp` WHERE `username` = ? AND `password` = ?", 
    [ username, password])
    if (rows.length === 0) {
      status = false;
    }
    res.json({status, data:rows});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error realizar el login" });
  }
};