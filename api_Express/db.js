import mysql from "mysql2";

export const db = mysql.createConnection({
    host: "localhost",
    user: "USERNAME",
    password: "YOUR_DATABASE_PASSWORD",
    database: "YOUR_SCHEMA_NAME",
});
