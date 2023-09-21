import pg from 'pg';
const { Pool } = pg;
export const pool = new Pool({
  user: 'root',
  host: 'dpg-ck09bdg21fec73e3db90-a',
  database: 'conexiondb',
  password: 'KRGrgmazEU5fs3gbFwKIpARvfdoRRh8s',
  port: 5432, 
});


/*
  MASTER
  export const pool = new Pool({
    user: 'root',
    host: 'dpg-ck09bdg21fec73e3db90-a',
    database: 'conexiondb',
    password: 'KRGrgmazEU5fs3gbFwKIpARvfdoRRh8s',
    port: 5432, 
  });
*/

/*
  DEV
  export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'conexiondb',
    password: '0',
    port: 5432, 
  });
*/

/*
  MYSQL
  import {createPool} from "mysql2/promise.js";
  export const pool = createPool({
      host: "localhost",
      user: "root",
      password: "",
      port: "3306",
      database: "conexiondb"
  });
*/