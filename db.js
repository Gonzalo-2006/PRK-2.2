import { createPool } from 'mysql2';


export const db = createPool({
    user: "root",
    password: "",
    host: "localhost",
    port: 3306,
    database: "prk2"
})


const conectionDb = db.getConnection((err, connection) => {
    if (err) {
        console.error("Error al conectar a la base de datos:", err.message);
        return;
    }
    console.log("Conexión exitosa a la base de datos.");
    connection.release(); 
});

