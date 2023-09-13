/*
import {createPool} from "mysql2/promise.js";
export const pool = createPool({
    host: "localhost",
    user: "root",
    password: "",
    port: "3306",
    database: "conexiondb"
});
*/
import pg from 'pg';
const { Pool } = pg;
export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'conexiondb',
  password: '0',
  port: 5432, 
});