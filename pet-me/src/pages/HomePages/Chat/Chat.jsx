import React, { useEffect, useRef, useState } from 'react'
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
const Chat = () => {
    const [users, setUsers]=useState([]);
    const inputRef = useRef();
    const [msgInputValue, setMsgInputValue] = useState("");
    const [messages, setMessages] = useState([]);
    const [messageInputValue, setMessageInputValue] = useState("");
    const [speakingUser,setSpeakingUser] = useState(false)
    const {currentUser, synced} = useSelector(state => state.currentUser)

    const navigate = useNavigate()

    const handleSend = message => {
      /* Send a post request with the content of the message and save the response*/
      if (speakingUser.id){
        axiosInstance.post(`/chats/user/${speakingUser.id}/`,{content:message}).then((res)=>
          setMessages([...messages, res.data])).catch(e=>{console.log(e)})
      }
      // setMessages([...messages, {
      //   message,
      //   direction: 'outgoing'
      // }]);
      setMsgInputValue("");
      inputRef.current.focus();
    };

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

    useEffect(() => {
      axiosInstance.get('/chats/')
       .then(res => {
          setUsers(res.data);
      }).catch((err)=>{console.log(err)})
    }, []);

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
