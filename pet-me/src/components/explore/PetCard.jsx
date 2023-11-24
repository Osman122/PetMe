import {Card} from 'react-bootstrap';
import './CardStyles.css'
import { Link } from 'react-router-dom';

export default function PetCard (props) {
    const {id, name, age, owner, thumbnail} = props.pet
    return <>
    
    <Card className='pet-card mx-3'>
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