import { pool } from "../db/db.js";

export const createTableUserApp = async (req, res) => {
  try {
    let sql = `CREATE TABLE IF NOT EXISTS userapp(
                document int(20) primary key,
                fullname varchar(60),
                username varchar(20),
                password varchar(100),
                userprofile varchar(20),
                phone varchar(20),
                email varchar(60),
                creaciondate datetime,
                updatedate datetime,
                lastincome datetime
            )`;
	let sqlpg = `CREATE TABLE IF NOT EXISTS userapp(
                document int primary key,
                fullname varchar(60),
                username varchar(20),
                password varchar(100),
                userprofile varchar(20),
                phone varchar(20),
                email varchar(60),
                creaciondate timestamp,
                updatedate timestamp,
                lastincome timestamp
            )`;
    //const [result] = await pool.query(sql);
	await pool.query(sqlpg);
    res.status(200).json({ message: 'Proceso completo CREATE TABLE userapp.' });
  } catch (error) {
	console.log(error);
    return res.status(500).json({ message: "ocurrio un error en el proceso CREATE TABLE userapp" });
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
  
		/*
		await pool.query(
		  "INSERT INTO `userapp` (`document`, `fullname`, `username`, `password`, `userprofile`, `phone`, `email`, `creaciondate`, `updatedate`, `lastincome`) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NULL, NULL);",
		  [document, fullname, username, password, userprofile, phone, email]
		);
		*/

		await pool.query(
			"INSERT INTO userapp (document, fullname, username, password, userprofile, phone, email, creaciondate, updatedate, lastincome) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NULL, NULL);",
			[document, fullname, username, password, userprofile, phone, email]
		  );

		res.status(200).json({ message: 'Usuario Creado con exito' });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "ocurrio un error en el proceso INSERT INTO TABLE userapp." });
	}
};

export const truncateTableUserApp = async (req, res) => {
	try {
		let sql = 'TRUNCATE TABLE `conexiondb`.`userapp`';
		let sqlpg = "TRUNCATE TABLE userapp";
    	await pool.query(sqlpg);
		res.status(200).json({ message: 'Proceso completo TRUNCATE TABLE userapp.' });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "ocurrio un error en el proceso TRUNCATE TABLE userapp." });
	}
};

export const dropTableUserApp = async (req, res) => {
	try {
		let sql = 'DROP TABLE `conexiondb`.`userapp`';
		let sqlpg = 'DROP TABLE userapp';
    	await pool.query(sqlpg);
		res.status(200).json({ message: 'Proceso completo DROP TABLE userapp' });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "ocurrio un error en el proceso DROP TABLE userapp." });
	}
};


export const createTableMedia= async (req, res) => {
	try {
	  let sql = `CREATE TABLE IF NOT EXISTS media(
				  id int(20) primary key AUTO_INCREMENT,
				  news varchar(20),
				  type varchar(20),
				  media varchar(400),
				  reference varchar(40),
				  creaciondate datetime,
				  updatedate datetime
			  )`;
		let sqlpg = `CREATE TABLE IF NOT EXISTS media(
				id serial primary key,
				news varchar(20),
				type varchar(20),
				media varchar(400),
				reference varchar(40),
				creaciondate timestamp,
				updatedate timestamp
			)`;
	  	await pool.query(sqlpg);
	  	res.status(200).json({ message: 'Proceso completo CREATE TABLE Media' });
	} catch (error) {
		console.log(error);
	  return res.status(500).json({ message: "ocurrio un error en el proceso CREATE TABLE Media" });
	}
  };

  export const truncateTableMedia = async (req, res) => {
	try {
		let sql = 'TRUNCATE TABLE `conexiondb`.`media`';
		let sqlpg = 'TRUNCATE TABLE media';
    	await pool.query(sqlpg);
		res.status(200).json({ message: 'Proceso completo TRUNCATE TABLE Media' });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "ocurrio un error en el proceso TRUNCATE TABLE Media." });
	}
};

export const dropTableMedia = async (req, res) => {
	try {
		let sql = 'DROP TABLE `conexiondb`.`media`';
		let sqlpg = 'DROP TABLE media';
    	await pool.query(sqlpg);
		res.status(200).json({ message: 'Proceso completo DROP TABLE Media' });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "ocurrio un error en el proceso DROP TABLE Media." });
	}
};



export const createTableNews= async (req, res) => {
	try {
	  let sql = `CREATE TABLE IF NOT EXISTS news(
				   id int(20) primary key AUTO_INCREMENT,
				   title varchar(1000),
				   description TEXT,
				   category varchar(100),
				   author varchar(100),
				   publicationdate DATE,
				   newsbody LONGTEXT,
				   discharges TEXT,
				   creaciondate datetime,
				   updatedate datetime
			   )`;
		let sqlpg = `CREATE TABLE IF NOT EXISTS news(
				   id serial primary key,
				   title varchar(1000),
				   slug varchar(1000),
				   description TEXT,
				   category varchar(100),
				   author varchar(100),
				   publicationdate DATE,
				   newsbody TEXT,
				   discharges TEXT,
				   creaciondate timestamp,
				   updatedate timestamp
			   )`;
			   console.log(sqlpg);
	  	await pool.query(sqlpg);
	  	res.status(200).json({ message: 'Proceso completo CREATE TABLE News' });
	} catch (error) {
		console.log(error);
	  return res.status(500).json({ message: "ocurrio un error en el proceso CREATE TABLE News" });
	}
  };

  export const truncateTableNews = async (req, res) => {
	try {
		let sql = 'TRUNCATE TABLE `conexiondb`.`news`';
		let sqlpg = 'TRUNCATE TABLE news';
    	await pool.query(sqlpg);
		res.status(200).json({ message: 'Proceso completo TRUNCATE TABLE News' });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "ocurrio un error en el proceso TRUNCATE TABLE News." });
	}
};

export const dropTableNews = async (req, res) => {
	try {
		let sql = 'DROP TABLE `conexiondb`.`news`';
		let sqlpg = 'DROP TABLE news';
    	await pool.query(sqlpg);
		res.status(200).json({ message: 'Proceso completo DROP TABLE News' });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "ocurrio un error en el proceso DROP TABLE News." });
	}
};