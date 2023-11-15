import { useState, useEffect } from 'react';
import { axiosInstance } from '../../../api/config';
import { useParams } from 'react-router-dom';

const Offer = ({ offerId }) => {
    const [offerData, setOfferData] = useState(null);
    const { id } = useParams(); // Extract the ID from the URL
    
        useEffect(() => {
        const fetchOfferData = async () => {
            try {
            const response = await axiosInstance.get(`/offers/${id}/`); // Use the extracted ID
            setOfferData(response.data);
            } catch (error) {
            console.error('Error fetching offer data:', error);
            }
        };
        fetchOfferData();
        }, [id]);
    const handleDeleteOffer = async () => {
        try {
            await axiosInstance.delete(`/offers/${id}/`);
            console.log('Offer deleted successfully');
              // Perform any additional actions after successful deletion
            } catch (error) {
            console.error('Error deleting offer:', error);
              // Handle any error actions here
            }
        };
    return (
        <>
        <div className="container main">
        {/* Render the offer data here */}
        {offerData && (
            <div className="container">
            <div className="row g-5" style={{ height: "600px", justifyContent: "space-between" }}>
                {/* Render the offer details */}
                <div className="col-12 col-md-5 sec-border p-3">
                <img style={{ maxHeight: "450px" }} className="w-100 h-100" src={offerData.pet.thumbnail} alt="" />
                {/* Render other offer details */}
                <div className="" style={{ display: "flex", height: "150px", width: "100%", justifyContent: "space-around" }}>
                    {/* Render additional images */}
                    {offerData && offerData.pet.photos && offerData.pet.photos.map((image, index) =>
                    (<img key={index} src={image} alt="" />))}

                </div>
                </div>
                {/* Render other offer details */}
                <div className="col-12 col-md-5">
                
                <div className="row mx-2">
                    <div className=" " style={{textAlign:"center", marginLeft:"20px",marginTop:"30px" }}>
                            <h3>{offerData.user.username} </h3>
                            <p className="text-wrap">{offerData.description}.</p>
                            
                        </div>
                        <hr/>
                        
                        <p className="col-md-4 mx-3">name</p>
                        <p className="col-md-4">{offerData.pet.name}</p>
                        <p className="col-md-4 mx-3">brief</p>
                        <p className="col-md-4">{offerData.pet.brief}</p>
                        <p className="col-md-4 mx-3">gender</p>
                        <p className="col-md-4">{offerData.pet.gender}</p>
                        <p className="col-md-4 mx-3">pet type</p>
                        <p className="col-md-4">{offerData.pet.pet_type}</p>
                        <p className="col-md-4 mx-3">species</p>
                        <p className="col-md-4">{offerData.pet.species}</p>
                        <p className="col-md-4 mx-3">color</p>
                        <p className="col-md-4">{offerData.pet.color}</p>
                        <p className="col-md-4 mx-3">created at</p>
                        <p className="col-md-4">{offerData.created_at}</p>
                        <p className="col-md-4 mx-3">Age</p>
                        <p className="col-md-4">
                        {offerData.pet.age} 
                        </p>

                        
                    
                </div>
                {/* Render buttons */}
                <div className="">
                    <button style={{ width: "100%", backgroundColor: "#F29C50" }} type="button" className="btn mt-2">
                    View Pet Complete Profile
                    </button>
                    <button style={{ width: "100%", backgroundColor: "#BF7245" }} type="button" className="btn mt-2">
                    View Pet Complete Profile
                    </button>
                </div>
                </div>
            </div>
            </div>
        )}
        </div>
        <br/>
        <br/>
        <br/>
        </>
    );
    };

export default Offer;
