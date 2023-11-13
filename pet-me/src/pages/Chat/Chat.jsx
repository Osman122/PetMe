import React from 'react'
import hinata from '../../assets/images/hinata.jpeg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faUser, faVolumeXmark } from '@fortawesome/free-solid-svg-icons'

const Chat = () => {
  return (
    <>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <div className='container' style={{height:"50vw"}}>
        <div className='row' style={{height:"100%"}}>
            <div className='col-3'>
                <h1 style={{color:"#8c594d"}}>Chats</h1> 
                <input style={{borderRadius:"1rem", position:"relative", backgroundColor:"#e6e6e6", textAlign:"center",padding:"0.5rem"}} type='search' placeholder='Search Messages'/>
            
                <FontAwesomeIcon icon={faMagnifyingGlass} style={{position:"absolute",left: "19rem",
    top: "12rem", color:"#8c594d"}} />
                
            </div>
    {/*---------------- -------------------------------------- */}
            <div className='col-6' style={{boxShadow:"0 0 3px", height:"100%"}}>
                <div className='header d-flex m-3' style={{width:"100%", borderBottom: "1px solid #e6e6e6"
}}>
                    <div className='img me-3'>
                        <img src={hinata} alt='hinata' style={{borderRadius:"50%", height:"60px"}}/>
                    </div>
                    <div className='content m-2'>
                        <h3 style={{color:"#8c594d"}}>Hinata</h3>
                    <p style={{color:"#000000", opacity:"50%"}}>Active 9m ago</p>
                    </div>
                </div>
            </div>
    {/* --------------------------------------------------------------------- */}
            <div className='col-3'>
                <div>
                    <img src={hinata} alt='hinata' style={{borderRadius:"50%"}}/>
                    <h3 style={{color:"#8c594d"}}>Hinata</h3>
                    <p style={{color:"#000000", opacity:"50%"}}>Active 9m ago</p>
                </div>
                <div className='d-flex gap-4'>
                    <div className='d-flex-column'>
                        <FontAwesomeIcon icon={faUser} style={{backgroundColor:"#e6e6e6", padding:"1rem", borderRadius:"50%", cursor:"pointer"}}/>
                        <p style={{color:"#8c594d"}}>Profile</p>
                    </div>
                    <div className='d-flex-column'>
                        <FontAwesomeIcon icon={faVolumeXmark} style={{backgroundColor:"#e6e6e6", padding:"1rem", borderRadius:"50%",  cursor:"pointer"}} />
                        <p style={{color:"#8c594d"}}>Mute</p>
                    </div>
                    <div className='d-flex-column'>
                        <FontAwesomeIcon icon={faMagnifyingGlass} style={{backgroundColor:"#e6e6e6", padding:"1rem", borderRadius:"50%",  cursor:"pointer"}}/>
                         <p style={{color:"#8c594d"}}>Search</p>
                    </div>
                   
                </div>
                <h5 style={{color:"#8c594d"}}>Chat Info</h5>
            </div>

        </div>

    </div>

    </>
  )
}

export default Chat
