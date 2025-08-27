import React, { useState } from 'react'

const Alert_msg = (props) => {
    let { message } = props
    const [showdata, setShowdata] = useState("")

    const messagesMap = {
        "account created": "Your account is successfully created!",
        "otp not match": "Entered OTP does not match",
        "done": "Done",
        "Password not match": "Entered password does not match",
        "login success": "You have login",
        "user_already_exists": "You Already Created account",
        "data successfully uploaded": "data successfully uploaded"
    };

    // if (message === "") {
    //     setShowdata("none")
    // }

    // else{
    //     setShowdata("block")
    // }

    // const [mesg,setMesg] = useState("")
    let mesg = messagesMap[message] || ""

    setTimeout(() => {
        let para = document.getElementById("para")
        mesg = ""
        para.innerText = mesg
        para.style.marginBottom = "-20px";
    }, 100000);

    return (
        <>
            {message !== "" ? (<>
                <p id="para">{mesg}</p>
                <p className='lines'></p>
            </>)
                : (<p id="para"  >{mesg}</p>)}
            {/* style={{ display: "none" }} */}
            {/* <p id="para">{mesg}</p> */}
        </>
        // <div>
        //     {/* <p id="para" >{mesg}</p> */}
        //     {mesg !== "" ? (<p id="para" >{mesg}</p>) :
        //         (<p id="para" style={{ display: "none" }}>{mesg}</p>)}
        // </div>
    )
}

export default Alert_msg
