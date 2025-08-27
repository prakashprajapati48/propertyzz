import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const Chatmsg = (props) => {

  const [msg, setMsg] = useState("")
  const [usermsg, setUsermsg] = useState([])
  const { owneruserdata } = props
  const [users, setUsers] = useState([])
  const owneruser = owneruserdata.owneruser;
  const propertyId = owneruserdata.productID;
  const user_category = localStorage.getItem("user_category")
  const [sender_selected_user, setSender_selected_user] = useState("")
  const [form_show, setForm_show] = useState("0")
  const username = localStorage.getItem("username");
  const [styles, setStyle] = useState("3.4rem")
  const navigate = useNavigate()

  // user any message send or receive handling
  useEffect(() => {
    socket.emit("join", username);

    socket.emit("get_user_messages", username, owneruser, propertyId, user_category);

    socket.on("user_messages", (messages) => {
      setUsermsg(messages);
    });

    socket.on("receive_message", (newMsg) => {
      setUsermsg((prev) => [...prev, newMsg]);
    });

    return () => {
      socket.off("user_messages");
      socket.off("receive_message");
    };
  }, []);

  const [sender_msg_user, setSender_msg] = useState()

  // house keeper own house message sends handling
  const sendMesg = (e) => {
    if (!username) {
      e.preventDefault();
      setMsg("")
      navigate("/login?msg=Please login")
    }
    else {
      e.preventDefault();
      socket.emit("send_message", { sender_id: username, receiver_id: sender_msg_user, inpumes: msg, propertyId: propertyId })
      setMsg("")
    }
  }

  // rental user handling
  const sendMesg1 = (e) => {
    if (!username) {
      e.preventDefault();
      setMsg("")
      navigate("/login?msg=Please login")
    }
    else {
      e.preventDefault();
      socket.emit("send_message", { sender_id: username, receiver_id: owneruser, inpumes: msg, propertyId: propertyId })
      setMsg("")
    }
  }

  // Filter multiple user in any user name not repeat
  useEffect(() => {
    if (usermsg.length > 0) {
      const uniqueuser = [...new Set(usermsg.filter(m => m.sender_id !== username).map(m => m.sender_id))]
      setUsers(uniqueuser)
      setStyle("6rem")
    }
  }, [usermsg])

  // const [display_msg, setDisplay] = useState([])
  // const [display_msg_rec, setDisplay_rec] = useState([])

  // User select specifice select then user message show
  let displayMsg = (msg) => {
    setSender_msg(msg)
    setSender_selected_user(msg)
    setForm_show("1px solid gray")

    {
      usermsg.map((m, idx) => {
        // let filtermesg =
        usermsg.filter((m, idx) => m.sender_id === msg)
        // let filtermesgrec =
        usermsg.filter((m, idx) => m.receiver_id === msg)
        // setDisplay(filtermesg)
        // setDisplay_rec(filtermesgrec)
      })
    }
  }

  return (
    <>
      <div className="messages_data">
        {user_category === "owner" ? (
          <>
            <b>
              <label htmlFor="all_user_messages" className="all_user_messages" >Users Message</label>
            </b>
            <div className="users_send_message">
              {
                users.map((user, idx) => (
                  <p key={idx} className='displayowner' onClick={() => displayMsg(user)} >{user}</p>
                ))
              }
            </div>

            <div className="messenger" style={{ height: styles, border: form_show }}>
              < div className="display_chat">
                {/* {[...display_msg, ...display_msg_rec].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
              .map((m, idx) => ( */}
                {usermsg.filter((m) => (m.sender_id === sender_msg_user) || (m.receiver_id === sender_msg_user)).map((m, idx) => (
                  <p key={idx} className={m.sender_id === username ? "my-message" : "their-message"} >{m.message_text}</p>
                ))}

                {sender_selected_user && (
                  <form onSubmit={sendMesg} id='dataform'>
                    <input type="text" name="msg" id="inpmsg" value={msg} onChange={(e) => setMsg(e.target.value)} placeholder='Enter message' className="msg_input" /> <br />
                    <input type="hidden" name="owneruser" value={user_category === "owner" ? users : ""} /> <br />
                    <button type="submit" className="form_btn" >send</button>
                    {/* {username === "" ? <button className="form_btn">send</button> : (
                    <button type="submit" className="form_btn">send</button>
                  )} */}
                  </form>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <label htmlFor="rental_label_chats" className="rental_label_chats">Chat</label>
            <div className="messenger rental_messenger" style={{ height: styles }}>
              <div className="display_chat">
                {usermsg.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)).filter((m) => m.sender_id === username || m.receiver_id === username).map((m, idx) => (
                  <p key={idx} className={m.sender_id === username ? "my-message" : "their-message"} >{m.message_text}</p>
                ))}

                <form onSubmit={sendMesg1} id='dataform'>
                  <input type="text" name="msg" id="inpmsg" value={msg} onChange={(e) => setMsg(e.target.value)} placeholder='Enter message' className="msg_input" />  <br />
                  <input type="hidden" name="owneruser" value={user_category === "rental" ? username : ""} />  <br />
                  <button type="submit" className="form_btn" >send</button>
                  {/* {!username  ? <button className="form_btn">send</button> : (
                  <button type="submit" className="form_btn">send</button>
                )} */}
                </form>
              </div>
            </div>
          </>
        )
        }
      </div >
    </>
  )
}

export default Chatmsg