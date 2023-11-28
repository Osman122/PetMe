import React, { useEffect, useRef, useState, useContext } from 'react'
import { Avatar, ChatContainer, ConversationHeader, InfoButton, Message, MessageInput, MessageList, TypingIndicator, VideoCallButton, VoiceCallButton } from '@chatscope/chat-ui-kit-react';
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import './Chat.css'
import Annon from '../../../assets/images/annon_user.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import NotificationContext from '../../../Context/NotificationContext';

import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import {
      MainContainer,
      Sidebar,
      Search,
      ConversationList,
    } from "@chatscope/chat-ui-kit-react";

import { axiosInstance } from '../../../api/config';

const Chat = () => {
    const [users, setUsers]=useState([]);
    const inputRef = useRef();
    const [msgInputValue, setMsgInputValue] = useState("");
    const [messages, setMessages] = useState([]);
    const [speakingUser,setSpeakingUser] = useState(false)
    const {currentUser, synced} = useSelector(state => state.currentUser)
    const {notifications, setNotifications} = useContext(NotificationContext)
    const [messagesInterval, setMessagesInterval] = useState()
    const msgListRef = useRef();

    const scrollToBottom = () => {
      msgListRef.current.scrollToBottom("auto")
    }

    const deleteMessage = (e, id) => {
      axiosInstance.delete(`/chats/${id}/`).then(()=>{
        setMessages(messages.filter(m => m.message_id != id))
      }).catch(e => console.log(e))
    }

    const navigate = useNavigate()

    const handleSend = message => {
      if (speakingUser.id){
        axiosInstance.post(`/chats/user/${speakingUser.id}/`,{content:message}).then((res)=>
          setMessages([...messages, res.data])).catch(e=>{console.log(e)})
      }

      setMsgInputValue("");
      inputRef.current.focus();
    };

    const fetchUserMessages = (user=speakingUser) => {
      if (user) {
        axiosInstance.get(`/chats/user/${user.id}/`).then((res)=>{
          setMessages(res.data.results)
          setNotifications(false)
          setTimeout(scrollToBottom,500)
        }).catch(e=>{
          console.log(e)
        })
      }
    }

    const handleChangeUser = function (e, user) {
      document.querySelectorAll('.conversation').forEach((e)=>{e.classList.remove('active')})
      e.target.closest('.conversation').classList.add('active')

      if (user.id != speakingUser.id){
        setSpeakingUser(user)
        fetchUserMessages(user)
      }
    }

    const fetchMessages = () => {
      axiosInstance.get('/chats/')
        .then(res => {setUsers(res.data)})
        .catch((err)=>{console.log(err)})
    };

    useEffect(() => {
      fetchMessages()
      fetchUserMessages()

    }, [notifications]);

  return (
    <>

<MainContainer responsive className='container mt-5' style={{minHeight:"75vh", minWidth:"800px"}}>
       <Sidebar position="left" scrollable={false}>
         <Search placeholder="Search..." />
         <ConversationList>
         {
  users.length ? (
    users.map(user => (
      <>
      <div class="conversation d-flex" onClick={(e) => {handleChangeUser(e, user)}} key={user.id}>
        <div class="cs-avatar cs-avatar--md me-3">
            <img src={`${user.picture}`} alt="Avatar"/>
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
            <ConversationHeader onClick={e => {if (speakingUser) navigate(`/profile/${speakingUser.id}`)}}>
                <ConversationHeader.Back />
                  <Avatar src={`${speakingUser? speakingUser.picture : Annon}`} />
                  <ConversationHeader.Content userName={speakingUser?`${speakingUser.first_name}${speakingUser.last_name?" "+speakingUser.last_name:""}` || speakingUser.username:"Choose a user from the list" } info="Tap to view profile"/>                          
            </ConversationHeader>

            <MessageList ref={msgListRef} scrollBehavior="smooth"  style={{height:'60vh', overflow:"auto"}}>
            
              {messages && speakingUser ?(messages.map((message) => <>

                {/* <Message model={{
                  message: message.content,
                  sentTime: Date(message.created_at),
                  sender: speakingUser.username,
                  direction: message.sender_id == speakingUser.id?"incoming":"outgoing"
                }} /> */}
                
                <section class={`cs-message cs-message--${message.sender_id == speakingUser.id?"incoming":"outgoing"}`} data-cs-message="">
                  <div class="cs-message__content-wrapper d-flex flex-row">
                    
                    {message.sender_id != speakingUser.id?
                    <div className='delete-message d-flex align-items-center pe-3 text-danger opacity-25 d-none' 
                    onClick={e => deleteMessage(e,message.message_id)} title="Delete Message">
                      <FontAwesomeIcon icon={faX} />
                    </div>
                    :<></>}

                    <div class="cs-message__content" title={Date(message.created_at)}>
                      <div class="cs-message__html-content">
                        {message.content}
                      </div>

                    </div>
                  </div>
                </section>
              </>)):<></>}
            </MessageList>
    
            <MessageInput placeholder="Type message here" onSend={handleSend} onChange={setMsgInputValue} value={msgInputValue} ref={inputRef} />
      </ChatContainer>
  </MainContainer>
  </>
  );
    
}

export default Chat