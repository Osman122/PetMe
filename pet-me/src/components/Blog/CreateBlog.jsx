import { faFaceSmile, faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import "./CreateBlog.css";
import { axiosInstance } from "../../api/config";

const CreateBlog = (props) => {
//   const [post , setPost] = useState('');
  const { user } = props;

  const addPost = (e) =>{
    e.preventDefault();
    let content = e.target.querySelector('textarea').value;
    // console.log(post)
    
    axiosInstance.post('/posts/',{user,content}).then(()=>{
        console.log("success")
      }).catch((e)=>{
        console.log(e)
      })
      e.target.querySelector('textarea').value = '';
  }
 
  return (
    <div className="create-blog">
      <div className="text-center rounded-3 w-100 blog-box">
        <form method="post"  className="d-flex justify-content-around p-4" onSubmit={e => addPost(e)}>
          <img
            className="rounded-circle shadow-1-strong"
            src={`${user.picture}`}
            alt="avatar"
            width="40"
            height="40"
          />
          <textarea
            type="text"
            id="tx-blog"
            className="form-control ms-3 me-2"
            placeholder="What's in your mind.."
            onKeyUp={e => {
                const tx = document.getElementById("tx-blog");
                tx.style.height = `auto`;
                tx.style.height = `${e.target.scrollHeight}px`;
            } }
          />
          <button type="submit" className="btn">Post</button>
        </form>
        
        <div className="d-flex">
          <div className="text-muted ms-5 fs-6">
            <FontAwesomeIcon icon={faImage} className="me-2" />
            <span>Photo/Video</span>
          </div>
          <div className="text-muted ms-5 fs-6">
            <FontAwesomeIcon icon={faFaceSmile} className="me-2" />
            <span>Feeling/activity</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
