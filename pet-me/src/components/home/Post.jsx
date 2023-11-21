import "./assets/post.css";
import CommentCard from '../CommentCard/CommentCard'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../api/config";
import { useState } from "react";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Post = (props) => {
    const {post} = props
    const {currentUser, synced} = useSelector(state => state.currentUser)
    const [comments, setComments ] = useState(post.comments)

    const reportPost = (e) => {
      e.preventDefault()
      let reason = e.target.querySelector('textarea').value
      
      axiosInstance.post(`/posts/${post.id}/reports/`, {reason:reason}).then(()=>{
        let alert = document.getElementById('success')
        alert.lastChild.innerText = "Report Sent Successfully."
        document.getElementById(`closePostModal${post.id}`).click()
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

    const deletePost = (e) => {
      axiosInstance.delete(`/posts/${post.id}/`).then(()=>{
        e.target.closest('.card').remove()
      }).catch(e => console.log(e))
    }

    const addComment = (e) => {
      e.preventDefault()

      let content = e.target.querySelector('textarea').value
        axiosInstance.post(`posts/${post.id}/comments/`, {'content':content}).then((res)=>{
          setComments([...comments, res.data])
          console.log(res.data)
        }).catch(err => {
            console.log(err)
        })}

    return post ? (
      <div class="card">
        <div class="card-body">
          <div class="d-flex flex-start align-items-center">
            <Link to={`/profile/${post.user.user_id}`}>
              <img class="rounded-circle shadow-1-strong me-3"
                src={`${post.user.user_picture}`} alt="avatar" width="60"
                height="60" />
            </Link>


            <div className="flex-grow-1">
              <Link to={`/profile/${post.user.user_id}`} className="text-decoration-none text-dark">
                <h6 class="fw-bold mb-1">{post.user.username}</h6>
              </Link>

              <Link to={`/posts/${post.id}`} className="text-decoration-none">
                <p class="text-muted small mb-0">
                  {new Date(post.created_at).toISOString().split('T')[0]}
                </p>
              </Link>

            </div>
          {synced? <>
            <div className="dropstart">
              <div className="p-2" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </div>
                  {currentUser.id === post.user_id?<>
                    <ul class="dropdown-menu">
                      <li>
                        <button class="btn text-danger" onClick={(e)=>deletePost(e)}>Delete</button>                                 
                      </li>
                    </ul>
                  </>:<>
                    <ul class="dropdown-menu">
                      <li>
                        <button class="btn w-100 text-start" 
                        data-bs-toggle="modal" data-bs-target={`#PostReportModal${post.id}`}>
                            Report
                        </button>
                      </li>
                    </ul>
                    <div class="modal fade" id={`PostReportModal${post.id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div class="modal-dialog">
                          <div class="modal-content">
                          <div class="modal-header">
                              <h5 class="modal-title" id="exampleModalLabel">Report this comment</h5>
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div class="modal-body">
                              <form method="POST" onSubmit={e=>reportPost(e)}>
                              <div class="mb-3">
                                  <label for="message-text" class="col-form-label">Report Cause:</label>
                                  <textarea minLength={15} name="review" class="form-control" id="message-text" required style={{resize:'none',outline:'none'}}></textarea>
                              </div>
                              <div class="modal-footer">
                                  <button id={`closePostModal${post.id}`} type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
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
          </div>

          {
            post.photos.length ? <Link to={`/posts/${post.id}`}>
            <div className="post-image">
            <img className="img-fluid" alt="post_image" src={`${post.photos[0]['photo']}`}/>
          </div></Link> : <></>
          }
          <Link to={`/post/${post.id}`} style={{ textDecoration: 'none' }}>
            <p class="mt-3 mb-4 pb-2"> {post.content}</p>
          </Link>
          {
            comments.length ? <>
            <hr />
            <div className="comments">
              {comments.map((comment) => {
                  return <CommentCard comment={comment} key={comment.id}/>
              })}
            </div> </> : <></>
          }



        </div>
        { synced && (
          <form class="card-footer py-3 border-0" style={{backgroundColor:"#f8f9fa"}}
          onSubmit={e => addComment(e)}>
            <div class="d-flex flex-start w-100">
              <img class="rounded-circle shadow-1-strong me-3"
                src={`${currentUser.picture}`} alt="avatar" width="40"
                height="40" />
              <div class="form-outline w-100">
                <textarea class="form-control" id="textAreaExample" rows="2"
                  style={{backgroundColor:"#fff" , outline:'none' , resize:'none'}}></textarea>
              </div>
            </div>
            <div class="float-end mt-2 pt-1">
              <button type="submit" class="btn btn-primary btn-sm me-3">Post comment</button>
              <button type="reset" class="btn btn-outline-primary btn-sm">Cancel</button>
            </div>
          </form>
        )}
      </div>

    ): <></>;
};

export default Post;
