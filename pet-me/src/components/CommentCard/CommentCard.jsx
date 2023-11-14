import { faReply, faFlag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReplyCard from "./ReplyCard";
import { Link } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../api/config";

const CommentCard = (props) => {
    const {comment} = props
    const {currentUser, synced} = useSelector(state => state.currentUser)

    const [showReplies, setShowReplies] = useState(false)
    const [replies, setReplies] = useState([])

    useEffect(()=>{
      setReplies(comment.replies)
    },[replies])

    const reportReply = (e) => {
      console.log(e.target.closest('.card'))
    }

    const addReply = (e) => {
      e.preventDefault()

      let content = e.target.querySelector('textarea').value
        axiosInstance.post(`posts/comment/${comment.id}/replies/`, {'content':content}).then((res)=>{
          const newReply = res.data
          setReplies([...replies, newReply])

      }).catch(err => {
        console.log(err)
      })
    }

    return (
        <div class="d-flex flex-start mb-4">

        <Link to={`/profile/${comment.user_id}`}>
          <img class="rounded-circle shadow-1-strong me-3"
            src={`${comment.user_picture}`} alt="avatar" width="65"
            height="65" />
        </Link>

        <div class="card w-100">
          <div class="card-body p-4 ">
            <div class="position-relative">
            <button class="btn btn-outline-danger float-end" 
              href="/" onClick={(e)=>reportReply(e)}>
                <FontAwesomeIcon icon={faFlag} /> 
              </button>  
              <button class="btn btn-outline-primary position-absolute reply" style={{right:"50px"}}>
                <FontAwesomeIcon icon={faReply} onClick={() => setShowReplies(!showReplies)}/>   
              </button>
              <h5>{comment.username}</h5>
              <p class="small"></p>

              <p> {comment.content} </p>
            </div>
          </div>
          { comment.replies.length ? <>
          <div class="card-footer py-3 border-0" style={{backgroundColor:"#f8f9fa"}}>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Replies</Accordion.Header>
              <Accordion.Body>
              <div className="replies">
                {comment.replies.map((reply) => {
                    return <ReplyCard reply={reply} key={reply.id}/>
                })}
              </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          </div> 
          </> : <></>}
            {synced && (
            <form className="add-reply p-3" style={{ display: showReplies ? 'block' : 'none' }} onSubmit={e=>{addReply(e)}}>
              <div class="d-flex flex-start w-100">
                <hr />
                <img class="rounded-circle shadow-1-strong me-3"
                  src={`${currentUser.picture}`} alt="avatar" width="40"
                  height="40" />
                <div class="form-outline w-100">
                  <textarea class="form-control" id="textAreaExample" rows="2" name="content" required
                    style={{backgroundColor:"#fff"}}></textarea>
                </div>
              </div>
              <div class="float-end mt-2 pt-1">
                <button type="submit" class="btn btn-primary btn-sm me-3">Reply</button>
                <button type="button" class="btn btn-outline-primary btn-sm">Cancel</button>
              </div>
            </form>
            )}
          </div>
          

        </div>
    )
}

export default CommentCard;