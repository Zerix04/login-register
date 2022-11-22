const express = require("express");
const bcrypt = require("bcrypt");
const mysql = require("mysql");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const app = express();

app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'log-regDB'
})

app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true,
    })
)

app.use(bodyParser.urlencoded({ extended: true }));

// proses Register database disini

app.post("/register", (req, res) => {

    // mengambil data dari frontend
    const username = req.body.username;
    const password = req.body.password;
    const nama = req.body.nama;

    console.log(username, password, nama);

    bcrypt.hash(password, 10, (err, hash) => {
        db.query("INSERT INTO user(username,password,nama) VALUES (?,?,?) ", [username, hash, nama], (err, result) => {
            console.log(err);
        });


    })



})

app.listen('3001', () => {
    console.log('Server running');
})