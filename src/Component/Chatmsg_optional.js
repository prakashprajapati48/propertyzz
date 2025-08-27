
import React, { useState, useEffect } from 'react'
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const Chatmsg = (props) => {

  const [msg, setMsg] = useState("")
  const [usermsg, setUsermsg] = useState([])
  const { owneruserdata } = props
  const [selectedUser, setSelectedUser] = useState([])
  const owneruser = owneruserdata.owneruser;
  const propertyId = owneruserdata.productID;
  const user_category = localStorage.getItem("user_category")

  const username = localStorage.getItem("username");
  useEffect(() => {
    socket.emit("get_user_messages", username, owneruser, propertyId, user_category);

    socket.on("user_messages", (messages) => {
      setUsermsg(messages);
    });

    return () => {
      socket.off("user_messages");
    };
  }, []);

  const [sender_msg_user, setSender_msg] = useState(username)

  const sendMesg = (e) => {
    e.preventDefault();
    socket.emit("send_message", { sender_id: username, receiver_id: sender_msg_user, inpumes: msg, propertyId: propertyId })
    setMsg("")
  }

  // rental user handling
  const sendMesg1 = (e) => {
    e.preventDefault();
    socket.emit("send_message", { sender_id: username, receiver_id: owneruser, inpumes: msg, propertyId: propertyId })
    setMsg("")
  }

  useEffect(() => {
    if (usermsg.length > 0) {
      const uniqueuser = [...new Set(usermsg.filter(m => m.sender_id !== username).map(m => m.sender_id))]
      // const uniqueuser = [...new Set(usermsg.map(m => m.sender_id))]
      setSelectedUser(uniqueuser)
    }
  }, [usermsg])

  const [display_msg, setDisplay] = useState([])
  const [display_msg_rec, setDisplay_rec] = useState([])

  let displayMsg = (msg) => {
    setSender_msg(msg)
    {
      usermsg.map((m, idx) => {
        let filtermesg = usermsg.filter((m, idx) => m.sender_id === msg)
        let filtermesgrec = usermsg.filter((m, idx) => m.receiver_id === msg)
        setDisplay(filtermesg)
        setDisplay_rec(filtermesgrec)
      })
    }
  }

  return (
    <div>
      {user_category === "owner" ? (
        <>
          {
            selectedUser.map((user, idx) => (
              <p key={idx} className='displayowner' onClick={() => displayMsg(user)} >{user}</p>
            ))
          }

          < div className="display_chat">
            {/* {[...display_msg, ...display_msg_rec].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
              .map((m, idx) => ( */}
            {usermsg.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)).filter((m) => m.sender_id === username || m.receiver_id === username).map((m, idx) => (
              <p key={idx} className={m.sender_id === username ? "my-message" : "their-message"} >{m.message_text}</p>
            ))}

            <form onSubmit={sendMesg} id='dataform'>
              <input type="text" name="msg" id="inpmsg" value={msg} onChange={(e) => setMsg(e.target.value)} placeholder='Enter message' />
              <input type="hidden" name="owneruser" value={user_category === "owner" ? selectedUser : ""} />
              <button type="submit">send</button>
            </form>
          </div>
        </>
      ) : (
        <>
          <div className="display_chat">
            {usermsg.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)).filter((m) => m.sender_id === username || m.receiver_id === username).map((m, idx) => (
              <p key={idx} className={m.sender_id === username ? "my-message" : "their-message"} >{m.message_text}</p>
            ))}
          </div>

          <form onSubmit={sendMesg1} id='dataform'>
            <input type="text" name="msg" id="inpmsg" value={msg} onChange={(e) => setMsg(e.target.value)} placeholder='Enter message' />
            <input type="hidden" name="owneruser" value={user_category === "rental" ? username : ""} />
            <button type="submit">send</button>
          </form>
        </>
      )
      }
    </div >
  )
}

export default Chatmsg