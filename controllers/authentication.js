import bcryptjs from 'bcryptjs';

import  JsonWebToken  from 'jsonwebtoken';
import dotenv from 'dotenv';

//Acceso a las variables de entorno
dotenv.config();



//Datos de prueba
const users = [{
    user: "Chalo",
    email: "chalo@gmail.com",
    password: "$2a$05$y1bgqDyc8UntsKNnELfMV.suooMk/akSV2svAgMdxJNW4zbusLHeO"
}]
//-----


async function login (req, res){
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password){
       return res.status(400).send({status: "Error", message: "La informacion no es valida"})
    }
    const revisarUsuario = users.find(users => users.email === email);
    if(!revisarUsuario){
       return res.status(400).send({status:"Error",message:"Usuario no existe"})
    }

    const loginCorrecto = await bcryptjs.compare(password,revisarUsuario.password);
    if(!loginCorrecto){
       return res.status(400).send({status:"Error",message:"Usuario no existe"})
    }
    const token = JsonWebToken.sign(
        {email:revisarUsuario.email},
        process.env.JWT_SECRET,
        {expiresIn:process.env.JWT_EXPIRATION}
    );
    const cookieOption = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        path: "/",
    }

    res.cookie("jwt",token,cookieOption);
    
    res.send({status: "OK", message: "Usuario creado", redirect: "/profile"})

}






//------

async function register (req, res){
    console.log(req.body)

    //Validar informacion del usuario
    const user = req.body.user;
    const email = req.body.email;
    const password = req.body.password;
    if(!user || !email || !password){
       return res.status(400).send({status: "Error", message: "La informacion no es valida"})
    }

    //Verificar si el usuario ya existe
    const revisarUsuario = users.find(users => users.user === user);
    if(revisarUsuario){
       return res.status(400).send({status:"Error",message:"Usuario ya registrado"})
    }

    //Encriptar la contraseña del usuario
    const salt = await bcryptjs.genSalt(5)
    const hashpassword = await bcryptjs.hash(password,salt)

    const nuevoUsuario = {
        user, email, password: hashpassword
    }

    //Subir usuari
    users.push(nuevoUsuario)

    console.log(users)
    res.status(200).send({status:"Ok",message:"Usuario creado...",redirect:"/profile"})
}

export const methods = {
    login,
    register
}