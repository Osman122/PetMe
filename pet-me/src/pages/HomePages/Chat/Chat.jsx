import React, { useRef, useState } from 'react'
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
const Chat = () => {
    const inputRef = useRef();
    const [msgInputValue, setMsgInputValue] = useState("");
    const [messages, setMessages] = useState([]);
    const [messageInputValue, setMessageInputValue] = useState("");
  
    const handleSend = message => {
      setMessages([...messages, {
        message,
        direction: 'outgoing'
      }]);
      setMsgInputValue("");
      inputRef.current.focus();
    };
  
  return (
    <>

<MainContainer responsive className='container mt-5' style={{minHeight:"75vh", minWidth:"800px"}}>
       <Sidebar position="left" scrollable={false}>
         <Search placeholder="Search..." />
         <ConversationList>
         <Conversation name="Lilly" lastSenderName="Lilly" info="Yes i can do it for you">
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
                     </Conversation>
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
