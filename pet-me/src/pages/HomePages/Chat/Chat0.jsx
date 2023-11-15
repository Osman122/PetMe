// import React from 'react'
// import hinata from '../../../assets/images/hinata.jpeg'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faMagnifyingGlass, faUser, faVolumeXmark } from '@fortawesome/free-solid-svg-icons'
// // import {
// //     MainContainer,
// //     MessageHeader,
// //     MessageInput,
// //     MessageList
// //     } from "@minchat/react-chat-ui";
// import "react-chat-elements/dist/main.css"
// import { ChatItem, ChatList, Input, MessageBox } from "react-chat-elements";
// import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
// import {
//   MainContainer,
//   ChatContainer,
//   MessageList,
//   Message,
//   MessageInput,
// } from "@chatscope/chat-ui-kit-react";


// const Chat = () => {
//   return (
//     <>
//     <br/>
//     <br/>
//     <br/>
//     <br/>
//     <br/>
//     <div className='container' style={{height:"50vw"}}> 
//         <div className='row' style={{height:"100%"}}>
//             <div className='col-3'>
//                 <h1 style={{color:"#8c594d"}}>Chats</h1> 
//                 <input style={{borderRadius:"1rem", position:"relative", backgroundColor:"#e6e6e6", textAlign:"center",padding:"0.5rem"}} type='search' placeholder='Search Messages'/>
            
//                 <FontAwesomeIcon icon={faMagnifyingGlass} style={{position:"absolute",left: "19rem",
//     top: "12rem", color:"#8c594d"}} />
//                  <ChatList
//   className='chat-list'
//   dataSource={[
//     {
//       avatar: 'https://avatars.githubusercontent.com/u/80540635?v=4',
//       alt: 'kursat_avatar',
//       title: 'Kursat',
//       subtitle: "Why don't we go to the No Way Home movie this weekend ?",
//       date: new Date(),
//       unread: 3,
//     }
// ]} />
//  <ChatItem
//   avatar="https://avatars.githubusercontent.com/u/41473129?v=4"
//   alt="kursat_avatar"
//   title="Emre"
//   subtitle="What are you doing ?"
//   date={new Date()}
//   muted={true}
//   showMute={true}
//   showVideoCall={true}
//   unread={2}
// />;
//   <ChatList
//   className='chat-list'
//   dataSource={[
//     {
//       avatar: 'https://avatars.githubusercontent.com/u/80540635?v=4',
//       alt: 'kursat_avatar',
//       title: 'Kursat',
//       subtitle: "Why don't we go to the No Way Home movie this weekend ?",
//       date: new Date(),
//       unread: 3,
//     }
// ]} />
//  <ChatItem
//   avatar="https://avatars.githubusercontent.com/u/41473125?v=4"
//   alt="kursat_avatar"
//   title="Emre"
//   subtitle="What are you doing ?"
//   date={new Date()}
//   muted={true}
//   showMute={true}
//   showVideoCall={true}
//   unread={2}
// />;
// <ChatItem
//   avatar="https://avatars.githubusercontent.com/u/41373129?v=4"
//   alt="kursat_avatar"
//   title="Emre"
//   subtitle="What are you doing ?"
//   date={new Date()}
//   muted={true}
//   showMute={true}
//   showVideoCall={true}
//   unread={2}
// />;
//   <ChatList
//   className='chat-list'
//   dataSource={[
//     {
//       avatar: 'https://avatars.githubusercontent.com/u/80540636?v=4',
//       alt: 'kursat_avatar',
//       title: 'Kursat',
//       subtitle: "Why don't we go to the No Way Home movie this weekend ?",
//       date: new Date(),
//       unread: 5,
//     }
// ]} />

//             </div>
           
//     {/*---------------- -------------------------------------- */}
//             <div className='col-6' style={{boxShadow:"0 0 3px", height:"100%"}}>
//                 <div className='header d-flex m-3' style={{width:"100%", borderBottom: "1px solid #e6e6e6"
// }}>
//                     <div className='img me-3'>
//                         <img src={hinata} alt='hinata' style={{borderRadius:"50%", height:"60px"}}/>
//                     </div>
//                     <div className='content m-2'>
//                         <h3 style={{color:"#8c594d"}}>Hinata</h3>
//                     <p style={{color:"#000000", opacity:"50%"}}>Active 9m ago</p>
//                     </div>
//                 </div>


//                 <div style={{ position: "relative", height: "500px" }}>
//   <MainContainer>
//     <ChatContainer>
//       <MessageList>
//         <Message
//           model={{
//             message: "Hello my friend",
//             sentTime: "just now",
//             sender: "Joe",
//           }}
//         />
//          <Message
//           model={{
//             message: "Hellooo",
//             sentTime: "just now",
//             sender: "Joe",
//           }}
//         />
//       </MessageList>
//       <MessageInput placeholder="Type message here" />
//     </ChatContainer>
//   </MainContainer>
// </div>;

//                             {/* <MessageBox
//             position='left'
//             title='Burhan'
//             type='text'
//             text="Hi there !"
//             date={new Date()}
//             replyButton={true}
//             />


//                     <MessageBox
//                     position="right"
//                     title="Emre"
//                     type="meetingLink"
//                     text="Hiiii"
//                     date={new Date()}
//                     />

// <MessageBox
//             position='left'
//             title='Burhan'
//             type='text'
//             text="I wanna adopt Shams !"
//             date={new Date()}
//             replyButton={true}
//             />


//                     <MessageBox
//                     position="right"
//                     title="Emre"
//                     type="meetingLink"
//                     text="Great News!!"
//                     date={new Date()}
//                     />

// <MessageBox
//   position={"right"}
//   type={"photo"}
//   title={"Kursat"}
//   text="Here's a picture of him"
//   data={{
//       uri: "https://picsum.photos/200/200",
//   }}
// />


// <Input
//   placeholder="Type here..."
//   multiline={true}
// /> */}
//             </div>
//     {/* --------------------------------------------------------------------- */}
//             <div className='col-3'>
//                 <div>
//                     <img src={hinata} alt='hinata' style={{borderRadius:"50%"}}/>
//                     <h3 style={{color:"#8c594d"}}>Hinata</h3>
//                     <p style={{color:"#000000", opacity:"50%"}}>Active 9m ago</p>
//                 </div>
//                 <div className='d-flex gap-4'>
//                     <div className='d-flex-column'>
//                         <FontAwesomeIcon icon={faUser} style={{backgroundColor:"#e6e6e6", padding:"1rem", borderRadius:"50%", cursor:"pointer"}}/>
//                         <p style={{color:"#8c594d"}}>Profile</p>
//                     </div>
//                     <div className='d-flex-column'>
//                         <FontAwesomeIcon icon={faVolumeXmark} style={{backgroundColor:"#e6e6e6", padding:"1rem", borderRadius:"50%",  cursor:"pointer"}} />
//                         <p style={{color:"#8c594d"}}>Mute</p>
//                     </div>
//                     <div className='d-flex-column'>
//                         <FontAwesomeIcon icon={faMagnifyingGlass} style={{backgroundColor:"#e6e6e6", padding:"1rem", borderRadius:"50%",  cursor:"pointer"}}/>
//                          <p style={{color:"#8c594d"}}>Search</p>
//                     </div>
                   
//                 </div>
//                 <h5 style={{color:"#8c594d"}}>Chat Info</h5>
//             </div>

//         </div>

//     </div>

   



//     </>
//   )
// }

// export default Chat
