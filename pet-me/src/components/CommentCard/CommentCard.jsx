import { faReply, faFlag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReplyCard from "./ReplyCard";
import { Link } from "react-router-dom";

const CommentCard = (props) => {
    const {comment} = props

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
              href="/">
                <FontAwesomeIcon icon={faFlag} /> 
              </button>  
              <button class="btn btn-outline-primary position-absolute reply" style={{right:"50px"}}>
                <FontAwesomeIcon icon={faReply} />   
              </button>
              <h5>{comment.username}</h5>
              <p class="small"></p>

              <p> {comment.content} </p>
            </div>
          </div>
          <div class="card-footer py-3 border-0" style={{backgroundColor:"#f8f9fa"}}>

            {
              comment.replies ? <>
              <div className="replies">
                {comment.replies.map((reply) => {
                    return <ReplyCard reply={reply} />
                })}
              </div> </> : <></>
            }

          </div>
            <div className="add-reply p-3">
              <div class="d-flex flex-start w-100">
                <hr />
                <img class="rounded-circle shadow-1-strong me-3"
                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp" alt="avatar" width="40"
                  height="40" />
                <div class="form-outline w-100">
                  <textarea class="form-control" id="textAreaExample" rows="2"
                    style={{backgroundColor:"#fff"}}></textarea>
                </div>
              </div>
              <div class="float-end mt-2 pt-1">
                <button type="button" class="btn btn-primary btn-sm me-3">Reply</button>
                <button type="button" class="btn btn-outline-primary btn-sm">Cancel</button>
              </div>
            </div>
          </div>
          

        </div>
    )
}

export default CommentCard;