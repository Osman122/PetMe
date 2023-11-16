import { useState, useEffect } from 'react';
import { axiosInstance } from '../../../api/config';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const Offer = ({ offerId }) => {
    const [offerData, setOfferData] = useState(null);
    const { id } = useParams();
    const {currentUser, synced} = useSelector(state => state.currentUser)
    const navigate = useNavigate()

    const deleteOffer = () => {
        axiosInstance.delete(`/offers/${id}/`).then(()=>{
            navigate("/")
        }).catch(e => console.log(e))
    }

    const sendRequest = (e) => {
        e.preventDefault()
        let message = e.target.querySelector('textarea').value

        axiosInstance.post(`/offers/${offerData.id}/requests/`,{message:message}).then(()=>{
            let alert = document.getElementById('success')
            alert.lastChild.innerText = "Request Sent Successfully."
            document.getElementById('closeModal').click()
            alert.hidden = false
            setTimeout(()=>{
                document.getElementById('success').hidden = true
            },3000)

        }).catch(e => {
            console.log(e)
            let alert = document.getElementById('fail')
            alert.lastChild.innerText = "Something went wrong!."
            alert.hidden = false
            setTimeout(()=>{
                document.getElementById('fail').hidden = true
            },3000)

        })

        console.log(alert)
        


    }

    const fetchOfferData = async () => {
        try {
            const response = await axiosInstance.get(`/offers/${id}/`); // Use the extracted ID
            // Convert date
            setOfferData({...response.data, 'created_at':new Date(response.data.created_at)});
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching offer data:', error);
        }
    };

    useEffect(() => {
        fetchOfferData();
    }, []);

    return (
        <>
            <div className="container h-100 align-items-center">
                {offerData && (
                <div className="row g-5 m-0 py-4">
                    <div className="col-12 col-md-6 p-0 m-0" style={{height:"85vh"}}>
                        <img style={{ borderRadius: "16px", objectFit:"contain" }} className="w-100 h-75" src={offerData.pet.thumbnail} alt="main pet" />
                        <div className="d-flex h-auto w-100 mt-4 justify-content-between">
                            {offerData.pet.photos.slice(1,).map((image, index) =>
                                <img className='img-fluid border border-secondary' key={index} src={image.photo} alt="secondary" style={{width:"30%", borderRadius: "16px"}}/>
                            )}
                        </div>
                    </div>

                    <div className="col-12 col-md-6 p-0 m-0 ps-4 d-flex flex-column position-relative" style={{height:"85vh"}}>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="/" className='text-decoration-none text-muted'>Home</a></li>
                                <li class="breadcrumb-item"><a href="/explore" className='text-decoration-none text-muted'>Explore</a></li>
                                <li class="breadcrumb-item active fw-bold text-dark" aria-current="page">Offer</li>
                            </ol>
                        </nav>

                        <div className='offer-info-card flex-grow-1 d-flex flex-column'>
                            {currentUser.id === offerData.user.id?<>
                                <button style={{right:"30px"}} onClick={deleteOffer} className="btn btn-outline-danger float-end position-absolute">Delete Offer</button>
                            </>:<></>}

                            <h2 className='fw-bold mb-3' style={{maxWidth:"75%"}}>{offerData.pet.name} needs a new home</h2>
                            <div className='d-flex justify-content-between align-items-center'>
                                <Link to={`/profile/${offerData.user.id}`} className='text-decoration-none align-items-center d-flex'>
                                    <img class="rounded-circle shadow-1-strong"
                                        src={`${offerData.user.picture}`} alt="avatar" width="40"
                                        height="40"/>
                                    <p className="text-dark m-0 ms-4 fs-5 p-0" style={{textTransform:"capitalize"}}>{offerData.user.username}</p>  
                                </Link>

                                {/* <p className="text-muted m-0">{Date(offerData.created_at).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p> */}
                                <p className="text-muted m-0">{offerData.created_at.toLocaleDateString("en-US", { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>
                            <hr style={{border:"1px solid #DDDDDD"}}/>

                            <div className='flex-grow-1'>
                                <Link className='float-end btn outline-primary' to={`/petinfo/${offerData.pet.id}`}>
                                    View Pet Complete Profile
                                </Link>
                                {offerData.pet.age?<div>
                                    <p className="text-muted m-0">Age</p>
                                    <p className="fw-semibold fs-5 mb-2">
                                        {offerData.pet.age}
                                    </p>
                                </div>:<></>}
                                {offerData.pet.gender?<div>
                                    <p className="text-muted m-0">Gender</p>
                                    <p className="fw-semibold fs-5 mb-2">
                                        {offerData.pet.gender}
                                    </p>
                                </div>:<></>}
                                {offerData.pet.pet_type?<div>
                                    <p className="text-muted m-0">Species</p>
                                    <p className="fw-semibold fs-5 mb-2">
                                        {offerData.pet.pet_type}
                                    </p>
                                </div>:<></>}
                                {offerData.pet.color?<div>
                                    <p className="text-muted m-0">Color</p>
                                    <p className="fw-semibold fs-5 mb-2">
                                        {offerData.pet.color}
                                    </p>
                                </div>:<></>}
                                <div>
                                    <p className="text-muted m-0 border-bottom">Details</p>
                                    <p className="fw-semibold fs-6 mb-2" style={{textAlign:"justify"}}>
                                        {offerData.description}
                                    </p>
                                </div>
                            </div>
 
                                
                            {/* Render buttons */}
                            <div className="d-flex">

                                <button style={{height: "50px", borderRadius:"12px"}} 
                                type="button" className="btn mt-2 btn-primary text-light fw-bold py-2 px-3 w-100"
                                data-bs-toggle="modal" data-bs-target="#exampleModal" disabled={currentUser.id === offerData.user.id}>
                                Send Adoption Request
                                </button>
                            </div>
                            
                            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Send adoption request</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form method="POST" onSubmit={e=>sendRequest(e)}>
                                    <div class="mb-3">
                                        <label for="message-text" class="col-form-label">Message:</label>
                                        <textarea minLength={30} name="review" class="form-control" id="message-text" required></textarea>
                                    </div>
                                    <div class="modal-footer">
                                        <button id="closeModal" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="submit" class="btn btn-primary">Send Review</button>
                                    </div>
                                    
                                    </form>
                                </div>
                                </div>
                            </div>
                            </div>



                        </div>
                    </div>
                </div>
                )}
            </div>
        </>
    );
    };

export default Offer;
