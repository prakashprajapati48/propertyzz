const express = require('express');
require('dotenv').config();
const mysql2 = require('mysql2')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const path = require('path');
const fs = require('fs');
const multer = require("multer")
const nodemailer = require("nodemailer");
const { createServer } = require("http")
const { Server } = require("socket.io")
const app = express()

app.use(cors())
const server = createServer(app)

// import React, { useState } from 'react';
// import express from 'express'
// import mysql2 from "mysql2";
// import dotenv from 'dotenv';
// import cors from "cors";
// import bcrypt from "bcrypt";
// import jwt from 'jsonwebtoken'
// import path from 'path'
// import fs from "fs";
// import multer from "multer";
// import { dirname } from 'path';
// import nodemailer from "nodemailer";
// dotenv.config();

// const app = express()

// user upload images and details
const uploadPath = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },

    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage })

app.use(express.json())
app.use('/uploads', express.static(uploadPath));
app.use(express.urlencoded({ extended: true }))

// Database in connection create
const connection = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    // password: "Banch/10",
    database: "seeker",
    // port: 3307
    // host: process.env.DB_HOST,
    // user: process.env.DB_USER,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_NAME,
    // port: 3307
})

// New user signup then verify user is not fake
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'aakashprajapati897@gmail.com',
        pass: 'kgpa tcwl offg peod'
    }
})

const jwt_token = "Spaceastro"
// const jwt_token = process.env.JWT_SECRET

// const [otp_no, setOtp] = useState("")
// const [user_all_data, setUser_data] = useState("")
let setUser_data = [];
let otp_num;

// New user verify otp generate
let otp_number_generate = () => {
    // otp_num = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    // return String(otp_num);
    return Math.floor(1000 + Math.random() * 9000).toString();
}

let setOtp = otp_number_generate();

// Express in new user account creating handle
app.post('/register', async (req, res) => {
    const { user_fullname, user_email, user_pass, user_category } = req.body;
    const salt = bcrypt.genSaltSync(10)
    const hash_pass = bcrypt.hashSync(user_pass, salt)

    const checkuser = `SELECT * FROM userdata WHERE useremail = ?`;

    connection.query(checkuser, [user_email], (cherr, chres) => {
        if (cherr) {
            console.log(cherr)
        }

        if (chres.length > 0) {
            console.log("user alredy exist")
            return res.redirect(302, `http://localhost:3000?msg=user_already_exists`);
        }

        let mailOptions = {
            from: 'prakashprajapati97929@gmail.com',
            to: user_email,
            subject: 'Sending Email using Node.js',
            text: setOtp
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        const datas = [user_fullname, user_email, hash_pass, user_category]

        setUser_data = datas

        // res.status(301).redirect("http://localhost:3000/Otp_verify")
        res.redirect(`http://localhost:3000/Otp_verify?data=${encodeURIComponent(JSON.stringify(datas))}`);
    })
})

// Opt is correct check
app.post('/otp-verify', (req, res) => {
    const { user_fullname, user_email, hash_pass, user_category, otp_number } = req.body;

    // let otp_num = Number(otp_number)
    const qu = `INSERT INTO userdata (username, useremail, pass,user_category,timestamp)VALUES ( ?,?,?,?, CURRENT_TIMESTAMP)`

    if (otp_number === setOtp) {
        // console.log(user_all_data)
        console.log(otp_number + "is")
        console.log(`user_name is : ${user_fullname}`)

        connection.query(qu, [user_fullname, user_email, hash_pass, user_category], (err, result) => {
            if (err) {
                console.error(err)
                return res.status(401).send("Data insertion error")
            };

            console.log("Insert successfully" + result)
            res.redirect(301, "http://localhost:3000?msg=account created")
        })
    }

    else {
        console.log("Otp not match!")
        res.redirect(301, "http://localhost:3000?msg=otp not match")
    }
})

// User is exist or not check
app.post('/login', (req, res) => {
    const { login_email, login_pass } = req.body;

    const query = "SELECT * FROM userdata WHERE useremail = ?";

    connection.query(query, [login_email], (err, results) => {
        if (err) {
            console.log("Error in database: ")
        }

        if (results.length === 0) {
            return res.redirect(301, "http://localhost:3000?msg=User not found")
        }

        const userpass = results[0].pass
        const chpass = bcrypt.compareSync(login_pass, userpass)

        if (!chpass) {
            console.log("User password not correct!")
            return res.redirect(302, "http://localhost:3000?msg=Password not match")
        }

        const token = jwt.sign({
            id: results[0].userId,
            username: results[0].username,
            useremail: results[0].useremail,
            category: results[0].user_category
        }, jwt_token, { expiresIn: '1h' })

        res.redirect(301, `http://localhost:3000?token=${token}&msg=login success`)
    })
})

// User uploaded image save in database
app.post('/product', upload.array('uplod_file', 12), (req, res) => {
    const filePaths = req.files.map(file => file.filename)
    const query = `INSERT INTO property (username,propertyImage,propertyTitle, propertyDesc, propertyPrice,country,timestamp)VALUES (?,?,?,?,?,?, CURRENT_TIMESTAMP)`
    const { username, upload_file_title, upload_file_desc, price, country } = req.body

    connection.query(query, [username, JSON.stringify(filePaths), upload_file_title, upload_file_desc, price, country], (err, result) => {
        if (err) {
            console.error("Error in insertion process: ", err)
            return res.status(401).send("Data insertion error")
        }

        res.redirect(301, "http://localhost:3000?msg=data successfully uploaded")

    })
})

// User show all data
app.get("/product-item", (req, res) => {
    const query = "SELECT * FROM property;"

    connection.query(query, (err, result) => {
        if (err) {
            console.error("Error data collection" + err)
        }

        const neresult = result.map(item => ({
            ...item,
            propertyImage: JSON.parse(item.propertyImage).map(
                filename => `http://localhost:5000/uploads/${filename}`
            )
        }))

        res.json(neresult)
    })
})

// User own uploaded data show
app.get("/data_retriver", (req, res) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1]
    let decod;

    try {
        decod = jwt.verify(token, jwt_token)
    } catch (err) {
        return res.json({ error: "invalid token" })
    }

    const username = decod.username

    const query = "SELECT * FROM property WHERE username = ?"

    connection.query(query, [username], (err, results) => {
        if (err) {
            console.error("error in connection")
            return res.status(500).json({ error: "Database error" });
        }
        // res.json(results)
        const neresult = results.map(item => ({
            ...item,
            propertyImage: JSON.parse(item.propertyImage).map(
                filename => `http://localhost:5000/uploads/${filename}`
            )
        }))

        res.json(neresult)
    })
})

// User change in some own data
app.post("/update_data", (req, res) => {
    const { ids, updateTitle, updateDesc, updatePrice } = req.body

    const updateQuery = `UPDATE property SET propertyPrice = ?, propertyTitle = ?, propertyDesc = ? WHERE propertyId = ? `;

    connection.query(updateQuery, [updatePrice, updateTitle, updateDesc, ids], (err, result) => {
        if (err) console.error(err);

        res.redirect(301, "http://localhost:3000?msg=data updated successfully")
    })
})

app.post("/search-item", (req, res) => {
    const { search_item, location_filter, price_filter } = req.body;
    // console.log(search_item)
    // console.log(location_filter)
    // console.log(price_filter)
    const sql = "SELECT * FROM `property` WHERE `propertyTitle`= ? OR `propertyPrice` = ? OR `country`= ?"
    connection.query(sql, [search_item, price_filter, location_filter], (err, results) => {
        if (err) console.log(err);

        // console.log(results)
        // res.json({results: results}).redirect(301,"http://localhost:3000/rent_user")
        let newresult = results.map(item => ({
            ...item,
            propertyImage: JSON.parse(item.propertyImage).map(filename => `http://localhost:5000/uploads/${filename}`)
        }))
        res.redirect(302, "http://localhost:3000/rent_user?results=" + encodeURIComponent(JSON.stringify(newresult)))
        console.log(newresult)
    })
    console.log("Searching data!")
})

// Server connect with frontend file
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

// User send or rececive messages handler
io.on("connection", (socket) => {
    console.log("Socket id:", socket.id);

    socket.on("join", (username) => {
        socket.join(username);  // each user joins their own room
        console.log(username, "joined room");
    });

    socket.on("send_message", data => {

        const sql = "INSERT INTO messages (sender_id, receiver_id,message_text,PropertyID) VALUES (?, ?,?,?)";
        connection.query(sql, [data.sender_id, data.receiver_id, data.inpumes, data.propertyId], (err, result) => {
            // connection.query(sql, [data.username, data.inpumes, data.owneruser, data.uid], (err, result) => {
            if (err) throw err;
            console.log("Message stored in DB");
        });

        io.to(data.receiver_id).emit("receive_message", {
            sender_id: data.sender_id,
            receiver_id: data.receiver_id,
            message_text: data.inpumes,
            PropertyID: data.propertyId
        });

        // also send back to sender
        io.to(data.sender_id).emit("receive_message", {
            sender_id: data.sender_id,
            receiver_id: data.receiver_id,
            message_text: data.inpumes,
            PropertyID: data.propertyId
        });
    })

    socket.on("get_user_messages", (username, owneruser, propertyId, user_category) => {

        if (username !== owneruser) {
            // const sql = "SELECT * FROM messages WHERE receiver_id = ? AND sender_id = ?"
            const sql = "SELECT * FROM `messages`WHERE ((sender_id = ? AND receiver_id = ?)OR (sender_id = ? AND receiver_id = ?))AND `PropertyID` = ?"
            connection.query(sql, [username, owneruser, owneruser, username, propertyId], (err, results) => {
                if (err) throw err;
                socket.emit("user_messages", results);
                // console.log(results)
            });
            // console.log("owner name is: ",owneruser)
        }

        else {
            // const sql = "SELECT * FROM `messages` WHERE `receiver_id` = ? AND `PropertyID` = ?"
            // let seuser = "abc2"
            // const sql = "SELECT * FROM `messages`WHERE ((sender_id = ? AND receiver_id = ?)OR (sender_id = ? AND receiver_id = ?))AND `PropertyID` = ?"
            // const sql = "SELECT * FROM `messages`WHERE ((receiver_id = ?)) OR ((sender_id = ?)) AND `PropertyID` = ? "
            const sql = "SELECT * FROM `messages` WHERE(receiver_id = ? OR sender_id = ?) AND PropertyID = ?"
            // console.log(propertyId, " :Is Id")
            connection.query(sql, [username, username, propertyId], (err, results) => {
                if (err) throw err;

                socket.emit("user_messages", results)
                // console.log(results)
            })
        }
    });

});

server.listen(5000, () => {
    console.log(`Server + Socker.IO running on http://localhost:5000 `)
})

// app.listen(5000, () => {
//     console.log(`Server is run on http://localhost:5000`)
// })