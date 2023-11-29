import {Card, Badge} from 'react-bootstrap';
import './CardStyles.css'
import { Link } from 'react-router-dom';

export default function PetCard (props) {
    const {id, name, age, owner, thumbnail, offer} = props.pet
    return <>
    
    <Card className='pet-card mx-3 position-relative' style={{overflow:"hidden"}}>
        {offer > 0 ?<Badge className='position-absolute px-4' variant="primary"
        style={{transform:"rotate(45deg)",right:"-35px", top:"35px",}}>Offered for Adoption</Badge>:name==="Ash"?<>
        <Badge className='position-absolute px-5' variant="dark"
        style={{transform:"rotate(45deg)",right:"-35px", top:"35px",}}>Remembering</Badge>
        </>:<></>}
        {id? <><Link to={`/petinfo/${id}`}>
            <Card.Img variant="top" src={thumbnail  || require('../../assets/images/Cat_annon.png')} />
            </Link></>:
            <Card.Img variant="top" src={thumbnail  || require('../../assets/images/Cat_annon.png')} 
        />}
        
        <Card.Body className='p-0'>
            {age?<Card.Text className='text-muted float-end my-2'>{age} Old</Card.Text>:<></>}
            <Card.Title className='my-2'><b>{name}</b></Card.Title>
            <Card.Text className='p-0'>{owner? owner.username:""}</Card.Text>
        </Card.Body>
    </Card>
    </>

}