import React from 'react'
import mysql2 from 'mysql2'
import express from 'express'

const Newuser = () => {
    const connection = mysql2.createConnection({
        host: "localhost",
        user: "root",
        password: "Banch/10",
        database: "seeker",
        port: 3307
    })

    const app = express()

    if(connection){
        console.log("Connected successfully")
    }
    else{
        console.log("Not connected!")
    }

    app.listen(3100,(req,res)=>{
        res.send("Done")
    })
    return (
        <div>
            <p>Hello</p>
        </div>
    )
}

export default Newuser
