import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function ExploreCard(props) {
    const {offer} = props
    const navigate = useNavigate()

    return offer ? <>
    <div className="col-6 col-md-4 col-lg-3">        
        <div className="card mb-2 border-1 p-2 pb-4 " style={{minHeight:"45vh", backgroundColor: "#D9C9BA" }}>
        <Link to={`/offers/${offer.id}`}>
            <img src={`${offer.pet.thumbnail}`}
            className="card-img-top img-fluid rounded" alt="product thumbnail"  style={{ backgroundColor: "white" }}/>
        </Link>
        <div className="card-body p-3 position-relative rounded "  >
            <p  className="d-inline-block card-title font-weight-bold"
            style={{textWrap: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' ,fontWeight:"bold", margin:"0"}}>{offer.pet.name} is for adoption</p>
            <p className='text-secondary m-0' >{offer.user.username}</p>
            <p style={{maxHeight:"50px", overflow:"hidden"}} className='position-absolute  text-secondary' >{offer.description}</p>
        </div>
        </div>
    </div>
    </> : <></>

}
export default ExploreCard;