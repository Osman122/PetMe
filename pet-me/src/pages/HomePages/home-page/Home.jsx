import './HomeStyles.css'
import {Row, Col, Image, Card, Container, Carousel} from 'react-bootstrap';
import { BsHeart } from 'react-icons/bs';
import React, { useState, useEffect } from 'react';
import PetCard from '../../../components/explore/PetCard';
import OfferCard from '../../../components/explore/OfferCard'
import { axiosInstance } from '../../../api/config';
import { Link } from 'react-router-dom';

function Home() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
      setIndex(selectedIndex);
    };

    const [ offersList , setOffersList ] = useState([])
    const [ petsList , setPetsList ] = useState([])

    const getFeed = async () => {
        try {
            const pets = await axiosInstance.get(`/pets/`)
            const offers = await axiosInstance.get(`/offers/`)
            setPetsList(pets.data.results)
            setOffersList(offers.data.results)
        } catch (error) {

            console.log(error)
            let alert = document.getElementById('fail')
            alert.lastChild.innerText = "Something went wrong!."
            alert.hidden = false
            setTimeout(()=>{
                document.getElementById('fail').hidden = true
            },3000)
            
        }
    }

    useEffect(()=>{
        getFeed()
    },[])

    return (
        
        <Container className='py-5'>
            
            <section className='Hero'>
                <Carousel activeIndex={index} onSelect={handleSelect} className='w-100 position-relative' slide={false}>
                    <Carousel.Item>
                        <img src={require('../../../assets/images/Hero.jpg')} alt="Hero" style={{ height:"100%", maxHeight:"384px", width:"100%", borderRadius:"32px"}} />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={require('../../../assets/images/Hero1.jpg')} alt="Hero" style={{ height:"100%", maxHeight:"384px", width:"100%", borderRadius:"32px"}} />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={require('../../../assets/images/Hero2.jpg')} alt="Hero" style={{ height:"100%", maxHeight:"384px", width:"100%", borderRadius:"32px"}} />
                    </Carousel.Item>
                </Carousel>
            </section>

            {petsList.length?<>
                <section className='latest'>
                    <h2 className='fw-bold mb-4' style={{marginTop: '80px'}}>Last Arrived</h2>
                    <Row className="row-cols-lg-4 row-cols-md-2 row-cols-1">
                        {petsList.slice(0,4).map((pet) => {return <>
                            <Col className='d-flex justify-content-center mb-3 mb-lg-0' key={pet.id}>
                                <PetCard pet={pet} />
                            </Col>
                        </>})}
                    </Row>
                </section>            
            </>:<></>}

            <section className='categories'>
                <h2 className='fw-bold mb-4' style={{marginTop: '80px'}}>Categories</h2>

                <Row className='row-cols-lg-2 row-cols-sm-1'>
                    <Col className='d-flex justify-content-center mb-3'>
                        <Link to={`/explore?species=cat`}>
                            <Image src={require('../../../assets/images/category1.png')}  className='w-100 h-100' />
                        </Link>
                    </Col>
                    <Col className='mb-3'>
                        <Row>
                        <Col className='d-flex justify-content-center mb-3'>
                                <Link to={`/explore?species=hamster`}>
                                    <Image src={require('../../../assets/images/category2.png')} className='w-100 h-100' />
                                </Link>
                            </Col>
                            <Col className='d-flex justify-content-center mb-3'>
                                <Link to={`/explore?species=dog`}>
                                    <Image src={require('../../../assets/images/category3.png')} className='w-100 h-100' />
                                </Link>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col className='d-flex justify-content-center'>
                                <Link to={`/explore?species=bird`}>
                                    <Image src={require('../../../assets/images/category4.png')} className='w-100 h-100' />
                                </Link>
                            </Col>
                            <Col className='d-flex justify-content-center'>
                                <Link to={`/explore?species=turtle`}>
                                    <Image src={require('../../../assets/images/category5.png')} className='w-100 h-100' />
                                </Link>
                            </Col>
                        </Row>
                    </Col>
                    
                </Row>
            </section>

            {offersList.length?<>
                <section className='latest-offers'>
                    <h2 className='fw-bold mb-4' style={{marginTop: '80px'}}>Latest Adoption Offers</h2>
                    <Row className="row-cols-lg-4 row-cols-md-2 row-cols-1">
                        {offersList.slice(0,4).map((offer)=>{return <>
                            <Col className='d-flex justify-content-center mb-3 mb-lg-0' key={offer.id}>
                                <OfferCard offer={offer} />
                            </Col>
                        </>})}
                    </Row>
                </section>            
            </>:<></>}

        </Container>
    );
}

export default Home;