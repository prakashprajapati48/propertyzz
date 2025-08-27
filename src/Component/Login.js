import React, {  useState } from 'react'
import property_img from '../Icon/property_login_img.jpg'

const Login = () => {

  const [show_pass, setShow_pass] = useState(false)

  return (
    <div className="login_all_data">
      <div className="login_page">
        <>
          <div className="login_image">
            <img src={property_img} alt="..." width={"50%"} className="login_img" />
          </div>

          <form action="http://localhost:5000/login" method="post" className="login_form">
            <h3 htmlFor="lgoin">Login</h3>
            <div className="login_username">
              <span className="user_icon"></span>
              <input type="email" name="login_email" className="login_email" placeholder="Enter email" />
            </div> <br />

            <div className="login_userpass">
              <span className="user_pass"></span>
              <input type={show_pass ? "text" : "password"} name="login_pass" className="login_pass" placeholder="Enter password" />
            </div> <br />

            <div className="show_pass_label">
              <input type="checkbox" name="show_login_pass" id="show_login_pass" checked={show_pass} onChange={(e)=> setShow_pass(e.target.checked)} />
              <label htmlFor="" className="login_pass_label" >Show Password</label>
            </div><br />

            <button type="submit" value="login" className="login_btn" >Login</button>
          </form>
          <div className="google_login">
            <span className="google_icon"></span>
            <p className="google_login_para">Login with google</p>
          </div>
        </>
      </div>
    </div>
  )
}

export default Login