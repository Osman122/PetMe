import { faFaceSmile, faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./CreateBlog.css";
import { axiosInstance } from "../../api/config";
import { useContext, useState } from "react";
import PostContext from '../../Context/PostContext'
import { Form } from "react-bootstrap";

const CreateBlog = (props) => {
  const { user } = props;
  const { postsList, setPostsList } = useContext(PostContext)
  const [hideFiles, setHideFiles] = useState(true)

  const addPost = (e) =>{
    e.preventDefault();
    const formData = new FormData(e.target)

    if (formData.getAll("photos").length > 4){
        let alert = document.getElementById('fail')
        alert.lastChild.innerText = "You cannot upload more than 4 photos."
        alert.hidden = false
        setTimeout(()=>{
            document.getElementById('fail').hidden = true
        })
        return
        }
    
    axiosInstance.post('/posts/',formData).then((res)=>{
        setPostsList([res.data, ...postsList])
      }).catch((e)=>{
        console.log(e)
      })

    e.target.reset();
  }
 
  return (
    <div className="create-blog">
      <div className="text-center rounded-3 w-100 blog-box p-4 pb-2">
        <form method="post" onSubmit={e => addPost(e)}>
          <div className="d-flex">
            <img
              className="rounded-circle shadow-1-strong"
              src={`${user.picture}`}
              alt="avatar"
              width="40"
              height="40"
            />
            <textarea
              minLength={5}
              required
              type="text"
              id="tx-blog"
              className="form-control ms-2"
              name = "content"
              placeholder="What's in your mind.."
              onKeyUp={e => {
                  const tx = document.getElementById("tx-blog");
                  tx.style.height = `auto`;
                  tx.style.height = `${e.target.scrollHeight}px`;
              } }
            />
          </div>
        <Form.Group controlId="formFileMultiple" className="ms-5 pt-3" hidden={hideFiles}>
          <Form.Control type="file" multiple className="border" name="photos" accept="image/*"/>
        </Form.Group>
        <div className="d-flex justify-content-between mt-3 mb-0">
          <div className="d-flex" style={{cursor:"pointer"}} onClick={e => setHideFiles(!hideFiles)}>
            <div className="text-muted ms-5 fs-6 pt-2">
              <FontAwesomeIcon icon={faImage} className="me-2" />
              <span>Photo</span>
            </div>
            {/* <div className="text-muted ms-5 fs-6 pt-2">
              <FontAwesomeIcon icon={faFaceSmile} className="me-2" />
              <span>Feeling/activity</span>
            </div> */}
          </div>

          <button type="submit" className="btn btn-sm p-1 " style={{width:"90px",height:"35px"}}>Post</button>

        </div>

        </form>

      </div>
    </div>
  );
};

export default CreateBlog;
