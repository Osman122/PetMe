import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {Card} from 'react-bootstrap';
import './CardStyles.css'

function OfferCard(props) {
    const {offer} = props
    offer.created_at = new Date(offer.created_at)
    const today = new Date()
    offer.since = Math.floor((today - offer.created_at)/86400000);
    const navigate = useNavigate()

    return <>
        <Card className='pet-card'>
            {offer.id? <><Link to={`/offers/${offer.id}`}>
                <Card.Img variant="top" src={offer.pet.thumbnail} />
                </Link></>:
                <Card.Img variant="top" src={offer.pet.thumbnail} 
            />}
            
            <Card.Body className='p-0'>
                <Card.Text className='text-muted float-end my-2'>{offer.since ? `${offer.since} days ago`:"Today"}</Card.Text>
                <Card.Title className='my-2'><b>{offer.pet.name}</b></Card.Title>
                <Card.Text className='p-0'>{offer.description.slice(0,35)}...</Card.Text>
            </Card.Body>
        </Card>
    </>
    

}
export default OfferCard;