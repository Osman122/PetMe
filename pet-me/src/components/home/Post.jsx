import "./assets/post.css";
import IonIcon from "@reacticons/ionicons";

const Post = () => {
  return (
    <div className="post-body">
      <div className="page">
        <div className="above">
          <div className="user-info">
            <div className="user-img">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoHfE01KlgarM2Ox_8uE6tffx16OWH5rEgEmw_uYjTRdpp2FmXv7uq85Tzaf2VRoyJq2Q&usqp=CAU"
                alt=""
              />
            </div>
            <h3>
              @user-name
              <br />
              <span>Lorem ipsum dolor sit amet.</span>
            </h3>
          </div>
          <div>
            <IonIcon
              name="ellipsis-vertical-outline"
              className="menu"
            ></IonIcon>
          </div>
        </div>
        <div className="main-img">
          <img
            src="https://static.wixstatic.com/media/c4c15b_a4236a7ca1444f95981aa801197ba845~mv2.jpeg/v1/fill/w_638,h_1080,al_c,q_85,enc_auto/c4c15b_a4236a7ca1444f95981aa801197ba845~mv2.jpeg"
            className="cover"
            alt=""
          />
        </div>
        <div className="buttons">
          <div className="left">
            <div><IonIcon className="icon" name="heart-outline"></IonIcon></div>
            <div><IonIcon className="icon" name="chatbubble-outline"></IonIcon></div>
            <div><IonIcon className="icon" name="paper-plane-outline"></IonIcon></div>
          </div>
          <div className="right">
            <div><IonIcon className="icon" name="bookmark-outline"></IonIcon></div>
          </div>
          </div>
          <h4 className="likes">1.444 Likes</h4>
          <h4 className="captions">
            <b>@user</b>Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          </h4>
          <h4 className="comments">view all 20 comments</h4>
          <div className="add-comment">
            <div className="user-img">
              <img src="" alt="" />
            </div>
            <input
              type="text"
              className="comment"
              placeholder="add a comment ..."
            />
          </div>
          <h5 className="time">2 hours ago.</h5>
        </div>
      </div>
    
  );
};

export default Post;
