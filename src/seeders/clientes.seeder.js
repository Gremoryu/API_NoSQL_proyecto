require('dotenv').config()
require('../configs/db.config');

const bcrypt = require('bcrypt');
const saltosBcrypt = parseInt(process.env.SALTOS);
const cliente = require('../models/cliente.model');
const mongoose = require('mongoose');

const clientes = [
    { nombre: "nombre1", a_paterno: 'ap1', a_materno: '', email: "email1@gmail.com", password: bcrypt.hashSync('1234', saltosBcrypt) },
    { nombre: "nombre2", a_paterno: 'ap2', a_materno: '', email: "email2@gmail.com", password: bcrypt.hashSync('1234', saltosBcrypt) },
    { nombre: "nombre3", a_paterno: 'ap3', a_materno: '', email: "email3@gmail.com", password: bcrypt.hashSync('1234', saltosBcrypt) },
    { nombre: "nombre4", a_paterno: 'ap4', a_materno: '', email: "email4@gmail.com", password: bcrypt.hashSync('1234', saltosBcrypt) },
    { nombre: "nombre5", a_paterno: 'ap5', a_materno: '', email: "email5@gmail.com", password: bcrypt.hashSync('1234', saltosBcrypt) },
    { nombre: "nombre6", a_paterno: 'ap6', a_materno: '', email: "email6@gmail.com", password: bcrypt.hashSync('1234', saltosBcrypt) },
    { nombre: "nombre7", a_paterno: 'ap7', a_materno: '', email: "email7@gmail.com", password: bcrypt.hashSync('1234', saltosBcrypt) },
    { nombre: "nombre8", a_paterno: 'ap8', a_materno: '', email: "email8@gmail.com", password: bcrypt.hashSync('1234', saltosBcrypt) },
    { nombre: "nombre9", a_paterno: 'ap9', a_materno: '', email: "email9@gmail.com", password: bcrypt.hashSync('1234', saltosBcrypt) },
    { nombre: "nombre10", a_paterno: 'ap10', a_materno: 'am10', email: "email10@gmail.com", password: bcrypt.hashSync('1234', saltosBcrypt) },
];

cliente.deleteMany({})
    .then(() => {
        return cliente.insertMany(clientes);
    })
    .then(() => {
        console.log("Clientes creados");
        mongoose.connection.close();
    })
    .catch((error) => {
        console.log(error);
        mongoose.connection.close();
    });