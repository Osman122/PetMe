import "./assets/post.css";
import CommentCard from '../CommentCard/CommentCard'
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../api/config";
import { useState } from "react";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Carousel } from "react-bootstrap";
import PostContext from '../../Context/PostContext'
import { useContext } from "react";

const Post = (props) => {
    const {post, single} = props
    const {currentUser, synced} = useSelector(state => state.currentUser)
    const [comments, setComments ] = useState(post.comments)

    const { postsList, setPostsList } = useContext(PostContext)

    const [index, setIndex] = useState(0);
    const navigate = useNavigate()

    const handleSelect = (selectedIndex) => {
      setIndex(selectedIndex);
    };

    const reportPost = (e) => {
      e.preventDefault()
      let reason = e.target.querySelector('textarea').value
      e.target.querySelector('textarea').value = ""
      
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
        setPostsList(postsList.filter(p => p.id != post.id))
        if (single) navigate(`/blog`)
      }).catch(e => console.log(e))
    }

    const addComment = (e) => {
      e.preventDefault()

      let content = e.target.querySelector('textarea').value
      e.target.reset()

      axiosInstance.post(`posts/${post.id}/comments/`, {'content':content}).then((res)=>{
        setComments([res.data,...comments])
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
                  {currentUser.id === post.user.user_id?<>
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

          {single?<>
          
          {
            post.photos.length ? 
            <div className="post-image p-4 pb-0" style={{ height:"60vh"}}>
                <Carousel activeIndex={index} onSelect={handleSelect} className='w-100 h-100'  slide={false}>
                    {post.photos.map((photo) =>{
                      return <Carousel.Item interval={100000}>
                          <img src={`${photo['photo']}`} alt="post" className="img-fluid" style={{maxHeight:"50vh", objectPosition:"top"}}/>
                      </Carousel.Item>
                    })}
                </Carousel>
            </div>
           : <></>
          }
            <h6 class="mx-4 p-3"> {post.content}</h6>

          { synced && (
          <form class="card-footer py-3 border-0 mb-3"
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
            <div class="d-flex flex-row-reverse pt-2">
              <button type="submit" class="btn btn-outline-primary btn-sm">Comment</button>
            </div>
          </form>
          )}  

          {
            comments.length ? <>
            <div className="comments">
              {comments.map((comment) => {
                  return <CommentCard comment={comment} key={comment.id}/>
              })}
            </div> </> : <></>
          }
          </>:<>
            {
              post.photos.length ? 
              <Link to={`/posts/${post.id}`}>
              <div className="post-image">
                <img className="img-fluid" alt="post_image" src={`${post.photos[0]['photo']}`} style={{objectPosition:"top"}}/>
              </div>
            </Link> : <></>
            }

            <Link to={`/posts/${post.id}`} style={{ textDecoration: 'none',color:'black' }}>
              <p class="mt-3"> {post.content}</p>
            </Link>
            <p className="text-muted m-0">{post.comments?.length} Comment{post.comments?.length == 1 ? '': 's'}</p>
          </>}

        </div>

      </div>

    ): <></>;
};

export default Post;
