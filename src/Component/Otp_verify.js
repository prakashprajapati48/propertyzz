import React, { useEffect, useState } from 'react'

const Otp_verify = () => {
    const [user_data, setUserData] = useState([])

    useEffect(() => {
        const url = new URLSearchParams(window.location.search)
        const datas = url.get("data")
        if (datas) {
            const parsedData = JSON.parse(decodeURIComponent(datas));
            console.log(parsedData[0])
            setUserData(parsedData);
        }
    }, [])

    return (
        <div className="otp_verification" >
            <div className="opt_form">
                <h2>Otp Verification</h2>
                <form action="http://localhost:5000/otp-verify" method="post">
                    <input type="hidden" name="user_fullname" value={user_data[0] || ""} />
                    <input type="hidden" name="user_email" value={user_data[1] || ""} />
                    <input type="hidden" name="hash_pass" value={user_data[2] || ""} />
                    <input type="hidden" name="user_category" value={user_data[3] || ""} />
                    <input type="number" name="otp_number" id="otp_number" placeholder="Enter Otp" /> <br />
                    <button type="submit" id="otp_number_btn" className="otp_number_btn" >Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Otp_verify
