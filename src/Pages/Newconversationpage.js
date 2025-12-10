import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css'; // Import PerfectScrollbar styles
import { BigLoader } from '../Modals/Loaders';
import axios from 'axios';
import whiteBG from '../assets/whiteBG.png';
import unreadIMG from '../assets/unreadIMG.png';
import readIMG from '../assets/readIMG.png';

export const Newconversationpage = ({ chatRoom, setChatRoom }) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [buttonloading, setButtonloading] = useState(false);
  const ws = useRef(null);
  const chatContainerRef = useRef(null);

  const backgroundStyle = {
    backgroundImage: `url(${whiteBG})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '100%',
  };

  const senderChatStyle = {
    backgroundColor: '#D9D9D9',
    color: 'black',
    padding: '1rem',
    textAlign: 'left',
    borderRadius: '10px',
  };

  const receiverChatStyle = {
    backgroundColor: '#FEBD69',
    color: 'black',
    padding: '1rem',
    textAlign: 'right',
    borderRadius: '10px',
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDay = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' });
  };

  let previousDay = null;

  const conversationId = chatRoom ? chatRoom._id : null;
  const accessedToken = JSON.parse(localStorage.getItem('userData'));

  const axiosInstance = axios.create({
    baseURL: 'https://campusbuy-backend-nkmx.onrender.com',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const setAuthToken = (token) => {
    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axiosInstance.defaults.headers.common['Authorization'];
    }
  };

  if (accessedToken && accessedToken.accessToken) {
    setAuthToken(accessedToken.accessToken);
  }
  const READ_CONVERSATION_API_KEY = `https://campusbuy-backend-nkmx.onrender.com/createreadmessages/${conversationId}`;

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  useEffect(() => {
    scrollToBottom();
    const response = axiosInstance.put(READ_CONVERSATION_API_KEY);
  }, [chatRoom.conversation]);

  useEffect(() => {
    ws.current = new WebSocket('https://campusbuy-backend-nkmx.onrender.com');

    ws.current.onopen = () => {
      console.log('WebSocket Client Connected');
    };

    ws.current.onmessage = (message) => {
      const parsedMessage = JSON.parse(message.data);
      if (parsedMessage.type === 'MESSAGE_RECEIVED' && parsedMessage.payload.conversationId === conversationId) {
        setChatRoom((prev) => ({
          ...prev,
          conversation: [...prev.conversation, parsedMessage.payload.message],
        }));
      }
    };

    ws.current.onclose = () => {
      console.log('WebSocket Client Disconnected');
    };

    return () => {
      ws.current.close();
    };
  }, [conversationId]);

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    setButtonloading(true);
    if (!accessedToken) {
      setTimeout(() => {
        navigate('/signin');
      }, 3000);
    } else {
      try {
        const newMessage = {
          type: 'NEW_MESSAGE',
          payload: {
            yourId: accessedToken.id || accessedToken._id ,
            message,
            conversationId,
          },
        };

        ws.current.send(JSON.stringify(newMessage));

        setMessage('');
        setButtonloading(false);
      } catch (error) {
        setButtonloading(false);
        console.error('Error sending your message:', error);
      }
    }
  };

  return (
    <div>
<div style={backgroundStyle} className="w-[100%] max-lg:hidden flex flex-col justify-start items-center text-black ">
      <PerfectScrollbar style={{ height: 'calc(100vh - 150px)',  }} containerRef={(ref) => chatContainerRef.current = ref}>
        <div className="w-[100%] flex text-sm m-2 flex-1">
          <div className="w-[100%]">
            {chatRoom
              ? chatRoom.conversation.map((conversations, index) => {
                  const currentDay = formatDay(conversations.createdAt);
                  const formattedTime = formatTime(conversations.createdAt);
                  const displayDay = currentDay !== previousDay ? currentDay : null;
                  previousDay = currentDay;
                  return (
                    <div className="w-[100%] flex flex-col" key={index}>
                      {displayDay && <h5 className="text-center text-gray-700 m-2">{displayDay}</h5>}
                      <div className="w-[100%] px-2">
                        <div
                          className="w-[100%] flex text-sm"
                          style={conversations.sender === accessedToken.id || accessedToken._id ? senderChatStyle : receiverChatStyle}
                        >
                          <div className="w-[100%]">
                            <div className="w-[90%] flex items-start">{conversations.message}</div>
                          </div>
                          {conversations.sender === accessedToken.id || accessedToken._id ? (
                            <div className="w-[20%] flex justify-end items-end">
                              <img src={conversations.unread === true ? unreadIMG : readIMG} alt="." width={20} />
                            </div>
                          ) : null}
                        </div>
                        <div className="text-[8px] text-gray-700 w-[100%] flex justify-between items-start">
                          {conversations.sender === accessedToken.id || accessedToken._id ? <strong>You</strong> : null}
                          <strong>{formattedTime}</strong>
                        </div>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </PerfectScrollbar>
      <form onSubmit={sendMessage} className="text-black mt-[1rem] p-2 w-[100%] rounded-lg shadow-lg">
        <input
          className="w-[100%] bg-[#F0FFF0] p-2 rounded-sm"
          placeholder="Type here"
          value={message}
          onChange={handleMessage}
        />
        <button type="submit" className="border-2 text-black bg-[#379B07] rounded-sm p-2 inline-block w-full mt-2">
          <strong>{buttonloading ? <BigLoader /> : 'Send'}</strong>
        </button>
      </form>
    </div>
    <div style={backgroundStyle} className="w-[100%] hidden max-lg:flex flex-col justify-start items-center text-black">
      <PerfectScrollbar style={{ height: 'calc(34vh - 40px)',  }} containerRef={(ref) => chatContainerRef.current = ref}>
        <div className="w-[100%] flex text-sm m-2 flex-1">
          <div className="w-[100%]">
            {chatRoom
              ? chatRoom.conversation.map((conversations, index) => {
                  const currentDay = formatDay(conversations.createdAt);
                  const formattedTime = formatTime(conversations.createdAt);
                  const displayDay = currentDay !== previousDay ? currentDay : null;
                  previousDay = currentDay;
                  return (
                    <div className="w-[100%] flex flex-col" key={index}>
                      {displayDay && <h5 className="text-center text-gray-700 m-2">{displayDay}</h5>}
                      <div className="w-[100%] px-2">
                        <div
                          className="w-[100%] flex text-sm"
                          style={conversations.sender === accessedToken.id || accessedToken._id ? senderChatStyle : receiverChatStyle}
                        >
                          <div className="w-[100%]">
                            <div className="w-[90%] flex items-start">{conversations.message}</div>
                          </div>
                          {conversations.sender === accessedToken.id || accessedToken._id ? (
                            <div className="w-[20%] flex justify-end items-end">
                              <img src={conversations.unread === true ? unreadIMG : readIMG} alt="." width={20} />
                            </div>
                          ) : null}
                        </div>
                        <div className="text-[8px] text-gray-700 w-[100%] flex justify-between items-start">
                          {conversations.sender === accessedToken.id || accessedToken._id ? <strong>You</strong> : null}
                          <strong>{formattedTime}</strong>
                        </div>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </PerfectScrollbar>
      <form onSubmit={sendMessage} className="text-black mt-[1rem] p-2 w-[100%] rounded-lg shadow-lg">
        <input
          className="w-[100%] bg-[#F0FFF0] p-2 rounded-sm"
          placeholder="Type here"
          value={message}
          onChange={handleMessage}
        />
        <button type="submit" className="border-2 text-black bg-[#379B07] rounded-sm p-2 inline-block w-full mt-2">
          <strong>{buttonloading ? <BigLoader /> : 'Send'}</strong>
        </button>
      </form>
    </div>
    </div>
    
  );
};
