import express from 'express'
import {db}  from './db.js';
import cookieParser from 'cookie-parser';
//
import path from 'path';
import {fileURLToPath} from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { methods as authentication} from './controllers/authentication.js';
//import { methods as authorization} from './middlewares/authorization.js';

//Servidor
const app = express(); 
app.listen(3000)
console.log('server on port ',3000)


//Configuracion
app.use(express.static(__dirname + "/public"))
app.use(express.json())
app.use(cookieParser());
//

//Rutas
app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/src/home/home.html")
})

app.get("/Login",(req, res) =>{
    res.sendFile(__dirname + "/src/login.html")
})

app.get("/Register",(req,res)=>{
    res.sendFile(__dirname + "/src/register.html")
})

app.get("/Profile",(req,res)=>{
    res.sendFile(__dirname + "/src/profile.html")
})
app.get("/Admin",(req,res)=>{
    res.sendFile(__dirname + "/src/admin.html")
})

//Rutas de productos
app.get("/Bufandas",(req,res)=>{
    res.sendFile(__dirname + "/src/product/Bufandas.html")
})

app.get("/Gorros",(req,res)=>{
    res.sendFile(__dirname + "/src/product/Gorros.html")
})

app.get("/Guantes",(req,res)=>{
    res.sendFile(__dirname + "/src/product/Guantes.html")
})

app.get("/Medias",(req,res)=>{
    res.sendFile(__dirname + "/src/product/Medias.html")
})

app.get("/Contacto",(req,res)=>{
    res.sendFile(__dirname + "/src/product/Contacto.html")
})
app.get("/navbar",(req,res)=>{
    res.sendFile(__dirname + "/src/product/navbar.html")
})

//Autentication
app.post("/api/register",authentication.register)
app.post("/api/login",authentication.login)
