import React, { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client';

import { Avatar, ChatContainer, ConversationHeader, InfoButton, Message, MessageInput, MessageList, TypingIndicator, VideoCallButton, VoiceCallButton } from '@chatscope/chat-ui-kit-react';
import kaiIco from '../../../assets/images/akane.svg'
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import './Chat.css'

import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import {
      MainContainer,
      Sidebar,
      Search,
      ConversationList,
      ExpansionPanel,
      Conversation,
      MessageSeparator,
    } from "@chatscope/chat-ui-kit-react";

import { axiosInstance } from '../../../api/config';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faX } from '@fortawesome/free-solid-svg-icons';



const Chat = () => {
    const [users, setUsers]=useState([]);
    const [filteredusers, setFilteredUsers]=useState([]);

    const inputRef = useRef();
    const [msgInputValue, setMsgInputValue] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [messages, setMessages] = useState([]);

    const [messageInputValue, setMessageInputValue] = useState("");
    const [speakingUser,setSpeakingUser] = useState(false)
    const {currentUser, synced} = useSelector(state => state.currentUser)

    const navigate = useNavigate()

    // url of socket server
    // const socket = io("http://localhost:3001")
    const socket = useRef(null);

  useEffect(() => {
    socket.current = io('http://localhost:3001');

    socket.current.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  const handleSend = () => {
    if (messageInputValue.trim() !== '' && speakingUser) {
      const message = {
        content: messageInputValue,
        userId: speakingUser.id,
      };

      socket.current.emit('message', message);
      setMessageInputValue('');
      inputRef.current.focus();
    }
  };



    // hna listen for incoming msgs from server, update msgs state when a new msg is received 
    // useEffect(()=> {
    //   socket.on("message", (message)=> {
    //     // handle incoming messages
    //     setMessages([...messages, message]);
    //   });
    //   return () => {
    //     // clean up the event listener when component unmounts
    //     socket.off("message");
    //   };
    // }, [messages]);


    // // modify handlesend to emit msgs to server
    // const handleSend = (message) => {
    //   if (speakingUser.id) {
    //     socket.emit("message", { content: message, userId: speakingUser.id});
    //   }
    //   setMessageInputValue("");
    //   inputRef.current.focus();

    // };

    // const handleSend = message => {
    //   /* Send a post request with the content of the message and save the response*/
    //   if (speakingUser.id){
    //     axiosInstance.post(`/chats/user/${speakingUser.id}/`,{content:message}).then((res)=>
    //       setMessages([...messages, res.data])).catch(e=>{console.log(e)})
    //   }
    //   // setMessages([...messages, {
    //   //   message,
    //   //   direction: 'outgoing'
    //   // }]);
    //   setMsgInputValue("");
    //   inputRef.current.focus();
    // };

    const handleChangeUser = function (e) {
      document.querySelectorAll('.conversation').forEach((e)=>{e.classList.remove('active')})
      e.target.closest('.conversation').classList.add('active')

      const currUserId = e.target.closest('.conversation').getAttribute('userId')

      if (currUserId != speakingUser.id){
        setSpeakingUser(users.find(ele=> ele.id == currUserId ))
        axiosInstance.get(`/chats/user/${currUserId}/`).then((res)=>{
          setMessages(res.data.results)
        }).catch(e=>{
          console.log(e)
        })
      }

    }

    const handleSearch = (e) => {
      setSearchQuery(e.target.value)
      setFilteredUsers(users.filter(user => {return `${user.username+user.first_name+user.last_name}`.includes(e.target.value)}))
    }

    useEffect(() => {
      axiosInstance.get('/chats/')
       .then(res => {
          setUsers(res.data);
          setFilteredUsers(res.data);
      }).catch((err)=>{console.log(err)})
    }, []);






  return (
    <>

<MainContainer responsive className='container mt-5' style={{minHeight:"75vh", minWidth:"800px"}}>
       <Sidebar position="left" scrollable={false}>
       <div class="cs-search">
          <FontAwesomeIcon icon={faMagnifyingGlass} className='me-3 fs-5' />
          <input type="text" class="cs-search__input flex-grow-1 d-block fs-6" placeholder="Search..." onChange={e=>{handleSearch(e)}} value={searchQuery}></input>
        </div>
         <ConversationList>
         {
  filteredusers.length ? (
    filteredusers.map(user => (
      <>
      <div class="conversation d-flex" onClick={(e) => {handleChangeUser(e)}} userId={user.id} key={user.id}>
        <div class="cs-avatar cs-avatar--md me-3">
            <img src={`http://localhost:8000/media/${user.picture}`} alt="Avatar"/>
          </div>
          <div class="cs-conversation__content justify-content-center">
            <h5 class="fw-bold m-0">{`${user.first_name}${user.last_name?" "+user.last_name:""}` || user.username}
            </h5>
          </div>
      </div></>
    ))
  ) : (
    <p>No users found</p>
  )
}
      </ConversationList>
       </Sidebar>

        <ChatContainer>
            <ConversationHeader onClick={e => {navigate(`/profile/${speakingUser.id}`)}}>
                <ConversationHeader.Back />
                <Avatar src={`http://localhost:8000/media/${speakingUser.picture}`} />
                <ConversationHeader.Content userName={`${speakingUser.first_name}${speakingUser.last_name?" "+speakingUser.last_name:""}` || speakingUser.username} info="Tap to view profile"/>                          
            </ConversationHeader>

            <MessageList scrollBehavior="smooth"  style={{minHeight:'60vh'}}>
            
              {messages.map((message) => <>
                <section class={`cs-message cs-message--${message.sender_id == speakingUser.id?"incoming":"outgoing"}`} data-cs-message="">
                  <div class="cs-message__content-wrapper">
                    <div class="cs-message__content" title={Date(message.created_at)}>
                      <div class="cs-message__html-content">
                        {message.content}
                      </div>
                    </div>
                  </div>
                </section>
              </>)}
            </MessageList>
    
            <MessageInput placeholder="Type message here" onSend={handleSend} onChange={setMsgInputValue} value={msgInputValue} ref={inputRef} />
      </ChatContainer>

      {/* <Sidebar position="right">
  <ExpansionPanel open title="INFO">
    <p>Lorem ipsum</p>
    <p>Lorem ipsum</p>
    <p>Lorem ipsum</p>
    <p>Lorem ipsum</p>
  </ExpansionPanel>
  <ExpansionPanel title="LOCALIZATION">
    <p>Lorem ipsum</p>
    <p>Lorem ipsum</p>
    <p>Lorem ipsum</p>
    <p>Lorem ipsum</p>
  </ExpansionPanel>
  <ExpansionPanel title="MEDIA">
    <p>Lorem ipsum</p>
    <p>Lorem ipsum</p>
    <p>Lorem ipsum</p>
    <p>Lorem ipsum</p>
  </ExpansionPanel>
  <ExpansionPanel title="SURVEY">
    <p>Lorem ipsum</p>
    <p>Lorem ipsum</p>
    <p>Lorem ipsum</p>
    <p>Lorem ipsum</p>
  </ExpansionPanel>
  <ExpansionPanel title="OPTIONS">
    <p>Lorem ipsum</p>
    <p>Lorem ipsum</p>
    <p>Lorem ipsum</p>
    <p>Lorem ipsum</p>
  </ExpansionPanel>
      </Sidebar>             */}


  </MainContainer>
  </>
  );
    
}

export default Chat
