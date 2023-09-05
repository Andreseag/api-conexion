import { pool } from "../db/db.js";

export const createTableUserApp = async (req, res) => {
  try {
    let sql = 'CREATE TABLE IF NOT EXISTS userapp('+
                'document int(20) primary key,' +
                'fullname varchar(60),'+
                'username varchar(20),'+
                'password varchar(100),'+
                'userprofile varchar(20),'+
                'phone varchar(20),'+
                'email varchar(60),'+
                'creaciondate datetime,'+
                'updatedate datetime,'+
                'lastincome datetime'+
            ')';
    const [result] = await pool.query(sql);
    res.status(200).json({ message: 'Proceso completo' });
  } catch (error) {
    return res.status(500).json({ message: "error al crear la tabla" });
  }
};

export const createNewUserApp = async (req, res) => {
	try {
		let document = '123456';
		let fullname = 'Usuario Prueba';
		let username = 'useradmin';
		let password = '123456';
		let userprofile = 'ADMIN';
		let phone = '3220000000';
		let email = 'correo@correo.com';
		let creaciondate = 'now()';
		let updatedate = null;
		let lastincome = null;
  
		const [rows] = await pool.query(
		  "INSERT INTO `userapp` (`document`, `fullname`, `username`, `password`, `userprofile`, `phone`, `email`, `creaciondate`, `updatedate`, `lastincome`) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NULL, NULL);",
		  [document, fullname, username, password, userprofile, phone, email]
		);
		res.status(200).json({ message: 'Usuario Creado con exito' });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Ya esta creado este usuario." });
	}
};

export const truncateTableUserApp = async (req, res) => {
	try {
		let sql = 'TRUNCATE TABLE `conexiondb`.`userapp`';
    	await pool.query(sql);
		res.status(200).json({ message: 'Proceso completo' });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "ocurrio un error en el proceso." });
	}
};

export const dropTableUserApp = async (req, res) => {
	try {
		let sql = 'DROP TABLE `conexiondb`.`userapp`';
    	await pool.query(sql);
		res.status(200).json({ message: 'Proceso completo' });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "ocurrio un error en el proceso." });
	}
};
