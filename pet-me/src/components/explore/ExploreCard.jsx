
function ExploreCard() {
    return (
    <div className="col-6 col-md-4 col-lg-3">        
        <div className="card mb-2 border-1 vh-50 p-2 pb-4 " style={{ backgroundColor: "#D9C9BA" }}>
        <img src={"logo512.png" }
        className="card-img-top img-fluid rounded" alt="product thumbnail"  style={{ backgroundColor: "white" }}/>
        <div className="card-body p-3 position-relative rounded "  >
            <p  className="d-inline-block card-title font-weight-bold"
            style={{textWrap: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' ,fontWeight:"bold", margin:"0"}}>Max needs a new home</p>
            <p className='text-secondary m-0' >Osman</p>
            <p className='position-absolute  text-secondary' >Max needs a new home</p>
        </div>
        </div>
    </div>
    )
}
export default ExploreCard;