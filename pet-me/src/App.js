// import { BrowserRouter } from "react-router-dom";
// import '../node_modules/bootstrap/dist/css/bootstrap.css';
// import '../node_modules/bootstrap/dist/js/bootstrap.js';
// import "bootstrap/dist/css/bootstrap.min.css";
// // import './App.css';
// import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
// import {
//     BasicStorage,
//     ChatMessage,
//     ChatProvider,
//     Conversation,
//     ConversationId,
//     ConversationRole,
//     IStorage,
//     MessageContentType,
//     Participant,
//     Presence,
//     TypingUsersList,
//     UpdateState,
//     User,
//     UserStatus
// } from "@chatscope/use-chat";
// import {ExampleChatService} from "@chatscope/use-chat/dist/examples";
// import {Chat} from "./pages/HomePages/Chat/Chat.jsx";
// import {nanoid} from "nanoid";
// import {Col, Container, Row} from "react-bootstrap";
// import {akaneModel, eliotModel, emilyModel, joeModel, users} from "./Data/Data";
// import {AutoDraft} from "@chatscope/use-chat/dist/enums/AutoDraft";
// import './app.css'

// import Router from "./router/Router";
// import { Alert } from "react-bootstrap";
// const messageIdGenerator = (message) => nanoid();
// const groupIdGenerator = () => nanoid();

// const akaneStorage = new BasicStorage({groupIdGenerator, messageIdGenerator});
// const eliotStorage = new BasicStorage({groupIdGenerator, messageIdGenerator});
// const emilyStorage = new BasicStorage({groupIdGenerator, messageIdGenerator});
// const joeStorage = new BasicStorage({groupIdGenerator, messageIdGenerator});

// // Create serviceFactory
// const serviceFactory = (storage, updateState) => {
//   return new ExampleChatService(storage, updateState);
// };

// const akane = new User({
//     id: akaneModel.name,
//     presence: new Presence({status: UserStatus.Available, description: ""}),
//     firstName: "",
//     lastName: "",
//     username: akaneModel.name,
//     email: "",
//     avatar: akaneModel.avatar,
//     bio: ""
// });
// const emily = new User({
//   id: emilyModel.name,
//   presence: new Presence({status: UserStatus.Available, description: ""}),
//   firstName: "",
//   lastName: "",
//   username: emilyModel.name,
//   email: "",
//   avatar: emilyModel.avatar,
//   bio: ""
// });

// const eliot = new User({
//   id: eliotModel.name,
//   presence: new Presence({status: UserStatus.Available, description: ""}),
//   firstName: "",
//   lastName: "",
//   username: eliotModel.name,
//   email: "",
//   avatar: eliotModel.avatar,
//   bio: ""
// });

// const joe = new User({
//   id: joeModel.name,
//   presence: new Presence({status: UserStatus.Available, description: ""}),
//   firstName: "",
//   lastName: "",
//   username: joeModel.name,
//   email: "",
//   avatar: joeModel.avatar,
//   bio: ""
// });

// const chats = [
//   {name: "Akane", storage: akaneStorage},
//   {name: "Eliot", storage: eliotStorage},
//   {name: "Emily", storage: emilyStorage},
//   {name: "Joe", storage: joeStorage}
// ];

// function createConversation(id, name) {
//   return new Conversation({
//       id,
//       participants: [
//           new Participant({
//               id: name,
//               role: new ConversationRole([])
//           })
//       ],
//       unreadCounter: 0,
//       typingUsers: new TypingUsersList({items: []}),
//       draft: ""
//   });
// }

// // Add users and conversations to the states
// chats.forEach(c => {

//   users.forEach(u => {
//       if (u.name !== c.name) {
//           c.storage.addUser(new User({
//               id: u.name,
//               presence: new Presence({status: UserStatus.Available, description: ""}),
//               firstName: "",
//               lastName: "",
//               username: u.name,
//               email: "",
//               avatar: u.avatar,
//               bio: ""
//           }));

//           const conversationId = nanoid();

//           const myConversation = c.storage.getState().conversations.find(cv => typeof cv.participants.find(p => p.id === u.name) !== "undefined");
//           if (!myConversation) {

//               c.storage.addConversation(createConversation(conversationId, u.name));

//               const chat = chats.find(chat => chat.name === u.name);

//               if (chat) {

//                   const hisConversation = chat.storage.getState().conversations.find(cv => typeof cv.participants.find(p => p.id === c.name) !== "undefined");
//                   if (!hisConversation) {
//                       chat.storage.addConversation(createConversation(conversationId, c.name));
//                   }

//                 }

//               }
  
//           }
//       });
  
//   });


// function App() {
//   return (
//     <BrowserRouter>

//       <Router />

//       <Alert id="fail-auth" variant="danger" className="m-2" hidden={true} dismissible></Alert>
//       <div className="h-100 d-flex flex-column overflow-hidden">
//             <Container fluid className="p-4 flex-grow-1 position-relative overflow-hidden">
//                 <Row className="h-50 pb-2 flex-nowrap">
//                     <Col>
//                         <ChatProvider serviceFactory={serviceFactory} storage={akaneStorage} config={{
//                             typingThrottleTime: 250,
//                             typingDebounceTime: 900,
//                             debounceTyping: true,
//                             autoDraft: AutoDraft.Save | AutoDraft.Restore
//                         }}>
//                             <Chat user={akane}/>
//                         </ChatProvider>
//                     </Col>
//                     <Col>
//                         <ChatProvider serviceFactory={serviceFactory} storage={eliotStorage} config={{
//                             typingThrottleTime: 250,
//                             typingDebounceTime: 900,
//                             debounceTyping: true,
//                             autoDraft: AutoDraft.Save | AutoDraft.Restore
//                         }}>
//                             <Chat user={eliot}/>
//                         </ChatProvider>
//                     </Col>
//                 </Row>
//                 <Row className="h-50 pt-2 flex-nowrap">
//                     <Col>
//                         <ChatProvider serviceFactory={serviceFactory} storage={emilyStorage} config={{
//                            typingThrottleTime: 250,
//                             typingDebounceTime: 900,
//                             debounceTyping: true,
//                             autoDraft: AutoDraft.Save | AutoDraft.Restore
//                         }}>
//                             <Chat user={emily}/>
//                         </ChatProvider>
//                     </Col>
//                     <Col>
//                         <ChatProvider serviceFactory={serviceFactory} storage={joeStorage} config={{
//                             typingThrottleTime: 250,
//                             typingDebounceTime: 900,
//                             debounceTyping: true,
//                             autoDraft: AutoDraft.Save | AutoDraft.Restore
//                         }}>
//                             <Chat user={joe}/>
//                         </ChatProvider>
//                     </Col>
//                 </Row>
//             </Container>
            
//         </div>
//     </BrowserRouter>
//   );
// }

// export default App;



// ------------------------------------------------
import { BrowserRouter } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js';

import './app.css'

import Router from "./router/Router";
import { Alert } from "react-bootstrap";


function App() {
  return (
    <BrowserRouter>

      <Router />

      <Alert id="fail-auth" variant="danger" className="m-2" hidden={true} dismissible></Alert>
      
    </BrowserRouter>
  );
}

export default App;

// -----------------------------------------------