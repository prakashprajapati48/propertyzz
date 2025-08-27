import React, { useRef, useState } from 'react'
// import home_icon from '../Icon/search-line.png'
import home_icon from '../Icon/home_icon.svg'
import rental_icon from '../Icon/rental_user_icon.svg'
// import show_password_icon from '../Icon/eye-fill.svg'
import show_password_icon from '../Icon/show_password_icon.png'
import hide_password_icon from '../Icon/hide_password_icon.png'
import { Link } from 'react-router-dom';

const Register = () => {
  const inputRef = useRef(null);
  const [selectedRole, setSelectedRole] = useState("Owner");
  const [bcolor, setBgcolor] = useState(false)
  const [bcolor1, setBgcolor1] = useState(false)
  const [showPassword, setShowpass] = useState(false)
  const [showConfirmPassword, setShowConfirmpass] = useState(false)

  const valueselect = (select_user_Role) => {
    setSelectedRole(select_user_Role)

    if (select_user_Role === "owner") {
      setBgcolor(true)
      setBgcolor1(false)
    }
    else {
      setBgcolor1(true)
      setBgcolor(false)
    }
  }

  let requrieCheck = (e) => {
    let butcheck = document.getElementsByClassName("signup_btn")
    let rental_option = document.getElementsByClassName("rental_option")
    let user_pass = document.getElementById("user_pass")
    let confirm_password = document.getElementById("confirm_user_pass")
    let category = document.getElementsByClassName("select_category_label")

    category[0].innerHTML = "";
    category[0].style.color = "";

    if (user_pass.value !== confirm_password.value) {
      category[0].innerHTML = "Both password not match"
      category[0].style.color = "red"
      e.preventDefault()
      return;
    }

    if (butcheck[0].style.background === "none" && rental_option[0].style.background === "none") {
      category[0].style.color = "red"
      category[0].innerHTML = "Please select category"
      e.preventDefault()
      return;
    }

    // else{
    //   category[0].style.color = ""
    //   category[0].innerHTML = ""
    // }

    // else{
    //   category[0].style.color = ""
    //   category[0].innerHTML = ""
    // }
  }

  return (
    <>
      <div className="signup_form_data">
        <div className="signup_forms">
          <div className="signup_header">
            <img src={home_icon} alt="signup_logo" className="signup_logo" />
            <h2 className="singup-header" >Signup</h2>
            <Link to={"/login"} className="singup_login_redirect" >
              <label htmlFor="" className="signup_login" >Login</label>
            </Link>
          </div>
          <label htmlFor="" className="select_category_label" ></label>

          <div className="signup_category" >
            <button className="owner_option signup_btn" value="onwer" onClick={() => valueselect("owner")} style={{ background: bcolor ? "#228be6" : "none" }} >
              <img src={home_icon} alt="owner" className="signup_icon" />
              <span className="owner_users user_category">I'm an Owner</span>
            </button>

            <button className="rental_option signup_btn" value="rental" onClick={() => valueselect("rental")} style={{ background: bcolor1 ? "#228be6" : "none" }}>
              <img src={rental_icon} alt="rental" className="signup_icon" />
              <span className="rental_users user_category">I'm a Rental User</span>
            </button>
          </div>

          <form action="http://localhost:5000/register" method="post" onSubmit={requrieCheck} >
            <input type="hidden" name="user_category" value={selectedRole} className="signup_inputs" required />
            <input type="email" ref={inputRef} name="user_email" id="user_email" placeholder="Email" className="signup_inputs" required /> <br />

            <input type="text" name="user_fullname" id="user_fullname" placeholder="Name" className="signup_inputs" required /> <br />

            <input type={showPassword ? "text" : "password"} name="user_pass" id="user_pass" className="signup_inputs" placeholder="Password" minLength={8} required />
            <span className="show_pass" onClick={() => setShowpass(!showPassword)}>{showPassword ? (<img className="password_visibility" alt="show_icon" src={show_password_icon} />) : (<img className="password_visibility" alt="show_icon" src={hide_password_icon} />)}</span> <br />

            <input type={showConfirmPassword ? "text" : "password"} name="confirm_user_pass" id="confirm_user_pass" className="signup_inputs" placeholder="Confirm password" minLength={8} required />
            <span className="confirm_show_pass" onClick={() => setShowConfirmpass(!showConfirmPassword)} >{showConfirmPassword ? (<img className="password_visibility" alt="show_icon" src={show_password_icon} />) : (<img className="password_visibility" alt="show_icon" src={hide_password_icon} />)}</span>
            <br />

            <input type="hidden" name="user_role" value={selectedRole} className="signup_inputs" />
            <button type="submit" name="user_submit" className="signup_submit" >Submit</button>
          </form>

          <div className="login_redirect">
            <p>Already have an account?
              <Link to={"/login"} className='singup_login_redirect'> login</Link>
            </p>
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  )
}

export default Register
