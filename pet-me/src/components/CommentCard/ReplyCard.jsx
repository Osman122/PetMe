import { Link } from "react-router-dom";

const ReplyCard = (props) => {
    const {reply} = props
    return (
        <div class="d-flex flex-start w-100 my-2">
        <Link to={`/profile/${reply.user_id}`}>
            <img class="rounded-circle shadow-1-strong me-3"
            src={`${reply.user_picture}`} alt="avatar" width="40"
            height="40" />
        </Link>

        <div class="form-outline w-100">
        <p class="pb-2"> {reply.content} </p>
        </div>
      </div>
    )
}

export default ReplyCard