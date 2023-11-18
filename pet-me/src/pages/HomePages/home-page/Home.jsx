import './HomeStyles.css'
import {Row, Col, Image, Card, Container, Carousel} from 'react-bootstrap';
import { BsHeart } from 'react-icons/bs';
import React, { useState, useEffect } from 'react';
import PetCard from '../../../components/explore/PetCard';
import OfferCard from '../../../components/explore/OfferCard'
import { axiosInstance } from '../../../api/config';

import objectsImage8 from '../../../assets/images/category4.png';
import objectsImage9 from '../../../assets/images/category5.png';


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
                    <Carousel.Item >
                        <img src={require('../../../assets/images/Hero.png')} alt="Hero" className='img-fluid'/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={require('../../../assets/images/Hero.png')} alt="Hero" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={require('../../../assets/images/Hero.png')} alt="Hero" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={require('../../../assets/images/Hero.png')} alt="Hero" />
                    </Carousel.Item>
                </Carousel>
            </section>

            {petsList.length?<>
                <section className='latest'>
                    <h2 className='fw-bold mb-4' style={{marginTop: '80px'}}>Last Arrived</h2>
                    <Row className="row-cols-lg-4 row-cols-md-2 row-cols-1">
                        {petsList.slice(0,4).map((pet) => {return <>
                            <Col className='d-flex justify-content-center mb-3 mb-lg-0'>
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
                        <Image src={require('../../../assets/images/category1.png')} fluid />
                    </Col>
                    <Col className='mb-3'>
                        <Row>
                            <Col className='d-flex justify-content-center mb-3'>
                                <Image src={require('../../../assets/images/category2.png')} fluid />
                            </Col>
                            <Col className='d-flex justify-content-center mb-3'>
                                <Image src={require('../../../assets/images/category3.png')} fluid />
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col className='d-flex justify-content-center'>
                                <Image src={objectsImage8} fluid />
                            </Col>
                            <Col className='d-flex justify-content-center'>
                                <Image src={objectsImage9} fluid />
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
                            <Col className='d-flex justify-content-center mb-3 mb-lg-0'>
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