import { Link } from "react-router-dom";

const ReplyCard = (props) => {
    const {reply} = props
    reply.created_at = new Date(reply.created_at)

    return (
        <div class="d-flex flex-start w-100 mb-4">
            <Link to={`/profile/${reply.user_id}`}>
                <img class="rounded-circle shadow-1-strong me-3"
                src={`${reply.user_picture}`} alt="avatar" width="40"
                height="40" />
            </Link>

            <div class="form-outline w-100">
            <p class="pb-2 m-0"> {reply.content} </p>
            <p className="text-muted m-0">{reply.created_at.toLocaleDateString("en-US", { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
      </div>
    )
}

export default ReplyCard