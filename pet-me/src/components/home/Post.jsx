import "./assets/post.css";
// import IonIcon from "@reacticons/ionicons";
import {faFlag} from "@fortawesome/free-regular-svg-icons";
import { faReply } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Post = () => {
  return (
    <div class="card">
      <div class="card-body">
        <div class="d-flex flex-start align-items-center">
          <img class="rounded-circle shadow-1-strong me-3"
            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp" alt="avatar" width="60"
            height="60" />
          <div>
            <h6 class="fw-bold text-primary mb-1">Lily Coleman</h6>
            <p class="text-muted small mb-0">
              Jan 2020
            </p>
          </div>
        </div>
        <div className="post-image">
            <img className="img-fluid" alt="post_image" src="https://static.wixstatic.com/media/c4c15b_a4236a7ca1444f95981aa801197ba845~mv2.jpeg/v1/fill/w_638,h_1080,al_c,q_85,enc_auto/c4c15b_a4236a7ca1444f95981aa801197ba845~mv2.jpeg"/>
          </div>
        <p class="mt-3 mb-4 pb-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip consequat.
        </p>
        <hr />
        <div className="comments">
          <h3 className="pb-2"> Comments </h3>
          <div class="d-flex flex-start mb-4">
            <img class="rounded-circle shadow-1-strong me-3"
              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp" alt="avatar" width="65"
              height="65" />
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
                  <h5>Johny Cash</h5>
                  <p class="small">3 hours ago</p>

                  <p>
                    Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
                    ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus
                    viverra turpis.
                  </p>
                </div>
              </div>
              <div class="card-footer py-3 border-0" style={{backgroundColor:"#f8f9fa"}}>
                <div className="replies">
                  <div class="d-flex flex-start w-100">
                    <img class="rounded-circle shadow-1-strong me-3"
                      src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp" alt="avatar" width="40"
                      height="40" />
                    <div class="form-outline w-100">
                    <p class="pb-2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. 
                      </p>
                    </div>
                  </div>
                  <div class="d-flex flex-start w-100">
                    <img class="rounded-circle shadow-1-strong me-3"
                      src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp" alt="avatar" width="40"
                      height="40" />
                    <div class="form-outline w-100">
                    <p class="pb-2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. 
                      </p>
                    </div>
                  </div>
                </div>
                <div className="add-reply">
                  <div class="d-flex flex-start w-100">
                    <hr />
                    <img class="rounded-circle shadow-1-strong me-3"
                      src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp" alt="avatar" width="40"
                      height="40" />
                    <div class="form-outline w-100">
                      <textarea class="form-control" id="textAreaExample" rows="4"
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
          </div>
        </div>


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

  );
};

export default Post;
