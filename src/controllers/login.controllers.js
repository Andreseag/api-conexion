import { pool } from "../db/db.js";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const [rows] = await pool.query("SELECT `document`,`fullname`,`userprofile`,`phone`,`email` FROM `userapp` WHERE `username` = ? AND `password` = ?", 
    [ username, password])
    res.json(rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error realizar el login" });
  }
};