import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReplyCard from "./ReplyCard";
import { Link } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';
import { useState } from "react";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../api/config";

const CommentCard = (props) => {
    const {comment} = props
    comment.created_at = new Date(comment.created_at)
    const {currentUser, synced} = useSelector(state => state.currentUser)
    const [replies, setReplies] = useState(comment.replies)

    const reportComment = (e) => {
      e.preventDefault()
      let reason = e.target.querySelector('textarea').value
      
      axiosInstance.post(`/posts/comment/${comment.id}/reports/`, {reason:reason}).then(()=>{
        let alert = document.getElementById('success')
        alert.lastChild.innerText = "Report Sent Successfully."
        document.getElementById(`closeCommentModal${comment.id}`).click()
        alert.hidden = false
        setTimeout(()=>{
            document.getElementById('success').hidden = true
        },3000)
      }).catch((e)=>{
        console.log(e)
        let alert = document.getElementById('fail')
        if (e.response.data.includes("unique")){
            alert.lastChild.innerText = "You already sent a report before"
        } else {
            alert.lastChild.innerText = "Something went wrong!."
        }
        alert.hidden = false
        setTimeout(()=>{
            document.getElementById('fail').hidden = true
        },3000)
      })
    }

    const deleteComment = (e) => {
      axiosInstance.delete(`/posts/comment/${comment.id}/`).then(()=>{
        e.target.closest('.comment-card').remove()
      }).catch(e => console.log(e))
    }

    const addReply = (e) => {
      e.preventDefault()

      let content = e.target.querySelector('textarea').value
        axiosInstance.post(`posts/comment/${comment.id}/replies/`, {'content':content}).then((res)=>{
          const newReply = res.data
          setReplies([...replies, newReply])
          console.log(replies)
        }).catch(err => {
            console.log(err)
        })}

    return (
        <div class="d-flex flex-start mb-4 ps-2 comment-card">

          <Link to={`/profile/${comment.user_id}`}>
            <img class="rounded-circle shadow-1-strong me-3"
              src={`${comment.user_picture}`} alt="avatar" width="65"
              height="65" />
          </Link>

          <div class="card w-100">
            <div class="card-body p-3 ">
              <div class="position-relative">
                {synced? <>
                  <div className="dropstart float-end">
                    <div className="p-2" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <FontAwesomeIcon icon={faEllipsisVertical} />
                    </div>
                        {currentUser.id === comment.user_id?<>
                          <ul class="dropdown-menu">
                            <li>
                              <button class="btn text-danger w-100 text-start" onClick={(e)=>deleteComment(e)}>Delete</button>                                 
                            </li>
                          </ul>
                        </>:<>
                          <ul class="dropdown-menu">
                            <li>
                              <button class="btn w-100 text-start" 
                              data-bs-toggle="modal" data-bs-target={`#ReportModal${comment.id}`}>
                                  Report
                              </button>
                            </li>
                          </ul>
                          <div class="modal fade" id={`ReportModal${comment.id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Report this comment</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form method="POST" onSubmit={e=>reportComment(e)}>
                                    <div class="mb-3">
                                        <label for="message-text" class="col-form-label">Report Cause:</label>
                                        <textarea minLength={15} name="review" class="form-control" id="message-text" required style={{resize:'none',outline:'none'}}></textarea>
                                    </div>
                                    <div class="modal-footer">
                                        <button id={`closeModal${comment.id}`} type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="submit" class="btn btn-primary">Send Report</button>
                                    </div>
                                    
                                    </form>
                                </div>
                                </div>
                            </div>
                          </div>                  
                        </>}
                  </div>
                </>:<></>}

                <h4 className="m-0">{comment.username}</h4>
                <p class="small text-muted">{comment.created_at.toLocaleDateString("en-US", { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })}</p>

                <p> {comment.content} </p>
              </div>
            </div>
            { replies.length ? <>
            <Accordion class="card-footer py-3 border-0" style={{backgroundColor:"#f8f9fa"}}>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Replies</Accordion.Header>
                <Accordion.Body>
                <div className="replies" style={{maxHeight:"50vh", overflow:"auto"}}>
                  {replies.map((reply) => {
                      
                      return <><ReplyCard reply={reply} key={reply.id}/></>
                  })}
                    </div>
                    {synced && (
                    <form className="add-reply border-top pt-3 pb-5" onSubmit={e=>{addReply(e)}}>
                      <div class="d-flex flex-start w-100">
                        <hr />
                        <img class="rounded-circle shadow-1-strong me-3"
                          src={`${currentUser.picture}`} alt="avatar" width="40"
                          height="40" />
                        <div class="form-outline w-100">
                          <textarea class="form-control" id="textAreaExample" rows="2" name="content" required
                            style={{backgroundColor:"#fff" , resize:'none' , border:'none' , outline:'none'}}></textarea>
                        </div>
                      </div>
                      <div class="float-end mt-2 pt-1">
                        <button type="submit" class="btn btn-primary btn-sm me-3">Reply</button>
                        <button type="reset" class="btn btn-outline-primary btn-sm">Cancel</button>
                      </div>
                    </form>
                    )}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            </> : <></>}

          </div>
          
        </div>
    )
}

export default CommentCard;