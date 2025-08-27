import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import Alert_msg from './Alert_msg'

const Navbar = () => {
  const [username, setUsername] = useState("")
  const [category, setCategory] = useState("")
  const [message, setMessage] = useState("")

  // user any message send through url and receive message
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const msg1 = params.get("msg")
    const msg = params.get("token")

    if (msg1) {
      if (!msg) {
        setMessage(msg1)
      }
      else {
        localStorage.setItem("token", msg)
        window.history.replaceState(null, "", "/");
        setMessage(msg1)
      }
    }

    // user different token decode 
    const storeuser = localStorage.getItem("token");

    if (storeuser) {
      try {
        const decoding = jwtDecode(storeuser);
        const decode_username = decoding.username || decoding.useremail
        const decode_category = decoding.category

        if (decode_username) {
          localStorage.setItem("username", decode_username)
        }
        if (decode_category) {
          localStorage.setItem("user_category", decode_category)
        }

        setUsername(decode_username);
        setCategory(decode_category);
      } catch (error) {
        console.error("Failed to decode token:", error)
      }
    }
  }, []);

  // logout

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("user_category")
  }

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <img src="" alt="logo" />
        </div>
        <div className="menus_option">
          <ul className="menus">
            <Link className="menus_page" to={"/"}>
              <li className="menu_name">Home</li>
            </Link>
            <Link className="menus_page" to={"/search"}>
              <li className="menu_name">Search</li>
            </Link>

            {!username ? (
              <>
                <Link className="menus_page" to={"/login"}>
                  <li className="menu_name">Login</li>
                </Link>
                <Link className="menus_page" to={"/Register"}>
                  <li className="menu_name">Register</li>
                </Link>
                {/* <Link className="menus_page"  to={"/Show"}>
                  <li className="menu_name">Shows</li>
                </Link> */}
              </>
            ) : (
              <>
                <li className="menu_name">
                  <a href="/" onClick={logout} id="username" className="menus_page" >
                    {username}
                  </a>
                </li>
              </>
            )}

            {category.toLocaleLowerCase() === "owner" && (
              <>
                <Link className="menus_page" to={"product"}>
                  <li className="menu_name">Upload</li>
                </Link>
              </>)}
          </ul>
        </div>
        <div className="alert_messages">
          <Alert_msg message={message} />
        </div>
      </nav>
    </>
  )
}

export default Navbar
