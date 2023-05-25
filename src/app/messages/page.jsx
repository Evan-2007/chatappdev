'use client';
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import style from "./messages.module.css";

function Messages() { // pass router as prop
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const result = await axios.get("/api/messages");
        setMessages(result.data.reverse());
      } catch (error) {
        console.error(error);
      }
    };

    const pollMessages = async () => {
      try {
        const result = await axios.get("/api/messages?timeout=60000");
        if (result.data.length > messages.length) {
          setMessages(result.data.reverse());
          messagesEndRef.current.scrollIntoView({ behavior: "auto" });
        }
      } catch (error) {
        console.error(error);
      }
      pollMessages();
    };
    
    pollMessages();
    fetchMessages();

    // Scroll to the bottom of the message container when the component is initially rendered
    messagesEndRef.current.scrollIntoView({ behavior: "auto" });

    return () => {
      setMessages([]);
    };
  }, []);

  return (
    <div className={`${style.container} ${style.darkTheme}`} ref={messagesContainerRef}>

      {messages.map((message) => (
        <div key={message.id} className={style.message}>
          <div className={style.messageHeader}>
          <img 
            className={style.userImage}
            src={message.userImage ? message.userImage : "../../../public/images/profile-default.svg"}
            alt={message.userName}
          />
            <h2 className={style.name}>{message.userName}</h2>
            <div className={style.timeContainer}>
              <p>
                {new Date(message.timestamp).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
                &nbsp; at &nbsp;
                {new Date(message.timestamp).toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                })}
              </p>
            </div>
          </div>

          <h3>{message.input}</h3>
          <hr className={style.divider} />
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default Messages;
