import "./assets/post.css";
import CommentCard from '../CommentCard/CommentCard'
import { Link } from "react-router-dom";

const Post = (props) => {
    const {post} = props

    return post ? (
      <div class="card">
        <div class="card-body">
          <div class="d-flex flex-start align-items-center">
            <Link to={`/profile/${post.user.user_id}`}>
              <img class="rounded-circle shadow-1-strong me-3"
                src={`${post.user.user_picture}`} alt="avatar" width="60"
                height="60" />
            </Link>


            <div>
              <Link to={`/profile/${post.user.user_id}`} className="text-decoration-none text-dark">
                <h6 class="fw-bold mb-1">{post.user.username}</h6>
              </Link>

              <Link to={`/posts/${post.id}`} className="text-decoration-none">
                <p class="text-muted small mb-0">
                  {new Date(post.created_at).toISOString().split('T')[0]}
                </p>
              </Link>

            </div>
          </div>
          {
            post.photos ? <Link to={`/posts/${post.id}`}>
            <div className="post-image">
            <img className="img-fluid" alt="post_image" src={`${post.photos[0]['photo']}`}/>
          </div></Link> : <></>
          }
          
          <p class="mt-3 mb-4 pb-2"> {post.content}</p>

          {
            post.comments ? <>
            <hr />
            <div className="comments">
              <h3 className="pb-2"> Comments </h3>
              {post.comments.map((comment) => {
                  return <CommentCard comment={comment} />
              })}
            </div> </> : <></>
          }



        </div>
        <div class="card-footer py-3 border-0" style={{backgroundColor:"#f8f9fa"}}>
          <div class="d-flex flex-start w-100">
            <img class="rounded-circle shadow-1-strong me-3"
              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp" alt="avatar" width="40"
              height="40" />
            <div class="form-outline w-100">
              <textarea class="form-control" id="textAreaExample" rows="4"
                style={{backgroundColor:"#fff"}}></textarea>
            </div>
          </div>
          <div class="float-end mt-2 pt-1">
            <button type="button" class="btn btn-primary btn-sm me-3">Post comment</button>
            <button type="button" class="btn btn-outline-primary btn-sm">Cancel</button>
          </div>
        </div>
      </div>

    ): <></>;
};

export default Post;
