import React, { useEffect, useRef, useState } from 'react'
import { Avatar, ChatContainer, ConversationHeader, InfoButton, Message, MessageInput, MessageList, TypingIndicator, VideoCallButton, VoiceCallButton } from '@chatscope/chat-ui-kit-react';
import kaiIco from '../../../assets/images/akane.svg'
import './Chat.css'
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
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
const Chat = () => {
    const [users, setUsers]=useState([]);
    const inputRef = useRef();
    const [msgInputValue, setMsgInputValue] = useState("");
    const [messages, setMessages] = useState([]);
    const [messageInputValue, setMessageInputValue] = useState("");
    const [speakingUser,setSpeakingUser] = useState(false)
  
    const handleSend = message => {
      setMessages([...messages, {
        message,
        direction: 'outgoing'
      }]);
      setMsgInputValue("");
      inputRef.current.focus();
    };


    // const currentUserDomain = 'http://127.0.0.1:8000/accounts/user/42'

    useEffect(() => {
      axiosInstance.get('/chats/')
       .then(res => {
          setUsers(res.data);
          console.log(res.data)
      }).catch((err)=>{console.log(err)})
      }, []);

      
  return (
    <>

<MainContainer responsive className='container mt-5' style={{minHeight:"75vh", minWidth:"800px"}}>
       <Sidebar position="left" scrollable={false}>
         <Search placeholder="Search..." />
         <ConversationList>
         {
  Array.isArray(users) && users.length > 0 ? (
    users.map(user => (
      <Conversation
        key={user[0]}
        name={`${user[3]} ${user[4]}`}
        lastSenderName={user[2]}
        info="Yes i can do it for you"
      >
        <Avatar src={`http://localhost:8000/media/${user[1]}`} name={`${user[3]} ${user[4]}`} size="md" />
      </Conversation>
    ))
  ) : (
    <p>No users found</p>
  )
}
         {/* <Conversation name="Lilly" lastSenderName="Lilly" info="Yes i can do it for you">
         <Avatar src="" name="" size="md" />
                     </Conversation>
                    
                     <Conversation name="Joe" lastSenderName="Joe" info="Yes i can do it for you">
                     <Avatar src="" name="" size="md" />
                     </Conversation>
                    
                     <Conversation name="Emily" lastSenderName="Emily" info="Yes i can do it for you" unreadCnt={3}>
                       <Avatar src="" name="Emily" status="available" />
                     </Conversation>
                    
                     <Conversation name="Kai" lastSenderName="Kai" info="Yes i can do it for you" unreadDot>
                       <Avatar src="" name="Kai" status="unavailable" />
                     </Conversation>
                                
                     <Conversation name="Akane" lastSenderName="Akane" info="Yes i can do it for you">
                       <Avatar src="" name="Akane" status="eager" />
                     </Conversation>
                                        
                     <Conversation name="Eliot" lastSenderName="Eliot" info="Yes i can do it for you">
                       <Avatar src="" name="Eliot" status="away" />
                     </Conversation>
                                                        
                     <Conversation name="Zoe" lastSenderName="Zoe" info="Yes i can do it for you" active>
                       <Avatar src="" name="Zoe" status="dnd" />
                     </Conversation>
                    
                     <Conversation name="Patrik" lastSenderName="Patrik" info="Yes i can do it for you">
                       <Avatar src="" name="Patrik" status="invisible" />
                     </Conversation> */}
         </ConversationList>
       </Sidebar>

 
                            <ChatContainer>
                                <ConversationHeader>
                                <ConversationHeader.Back />
                                    <Avatar src={kaiIco} name="Kai" />
                                    <ConversationHeader.Content userName="Kai" info="Active 10 mins ago" />
                                    <ConversationHeader.Actions>
                                        <VoiceCallButton />
                                        <VideoCallButton />
                                        <InfoButton />
                                    </ConversationHeader.Actions>          
                                    </ConversationHeader>
                                    <MessageList scrollBehavior="smooth"  style={{minHeight:'60vh'}}>
                                      {messages.map((m, i) => <Message key={i} model={m} />)}
                                    </MessageList>
                            
                                    <MessageInput placeholder="Type message here" onSend={handleSend} onChange={setMsgInputValue} value={msgInputValue} ref={inputRef} />
                          </ChatContainer>



                          <Sidebar position="right">
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
                   </Sidebar>            


                          </MainContainer>

                          </>
  );
    
}

export default Chat
