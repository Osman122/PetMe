import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { Card } from 'react-bootstrap';
import { BsHeart } from 'react-icons/bs';
import React, { useState } from 'react';
import objectsImage from '../../../assets/images/OBJECTS.png';
import objectsImage1 from '../../../assets/images/image1.png';
import objectsImage2 from '../../../assets/images/image2.png';
import objectsImage3 from '../../../assets/images/image3.png';
import objectsImage4 from '../../../assets/images/image4.png';
import objectsImage5 from '../../../assets/images/category1.png';
import objectsImage6 from '../../../assets/images/category2.png';
import objectsImage7 from '../../../assets/images/category3.png';
import objectsImage8 from '../../../assets/images/category4.png';
import objectsImage9 from '../../../assets/images/category5.png';

function Home() {
    const [isHovered, setIsHovered] = useState(false);
    return (
        
        <Container fluid>
            <Row>
                <Col>
                    <Image src={objectsImage} fluid />
                </Col>
            </Row>
            <Row className="mt-5">
                <h2>Last Arrived</h2>
            </Row>
            <Row className="mt-1">
                <Col>
                    <Card>
                        <div className="position-relative">
                            <BsHeart className="position-absolute top-0 end-0 mt-2 me-2 text-danger" 
                            style={{ 
                                cursor: 'pointer', fontSize: '35px', 
                                backgroundColor: 'white', padding: '5px', 
                                borderRadius: '40%' }} />
                        </div>
                        <Card.Img variant="top" src={objectsImage1} />
                        <Card.Body>
                            <Card.Title><b>Animal Name 1</b></Card.Title>
                            <Card.Text>shams max</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <div className="position-relative">
                            <BsHeart className="position-absolute top-0 end-0 mt-2 me-2 text-danger" 
                            style={{ 
                                cursor: 'pointer', fontSize: '35px',
                                backgroundColor: 'white', padding: '5px', 
                                borderRadius: '40%' }} />
                        </div>
                        <Card.Img variant="top" src={objectsImage2} />
                        <Card.Body>
                            <Card.Title><b>Animal Name 2</b></Card.Title>
                            <Card.Text>shams max</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <div className="position-relative">
                            <BsHeart className="position-absolute top-0 end-0 mt-2 me-2 text-danger" 
                            style={{ 
                                cursor: 'pointer', fontSize: '35px', 
                                backgroundColor: 'white', padding: '5px', 
                                borderRadius: '40%' }} />
                        </div>
                        <Card.Img variant="top" src={objectsImage3} />
                        <Card.Body>
                            <Card.Title><b>Animal Name 3</b></Card.Title>
                            <Card.Text>shams max</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <div className="position-relative">
                            <BsHeart className="position-absolute top-0 end-0 mt-2 me-2 text-danger" 
                            style={{ 
                                cursor: 'pointer', fontSize: '35px', 
                                backgroundColor: 'white', padding: '5px', 
                                borderRadius: '40%' }} />
                        </div>
                        <Card.Img variant="top" src={objectsImage4} />
                        <Card.Body>
                            <Card.Title><b>Animal Name 4</b></Card.Title>
                            <Card.Text>shams max</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-5">
                <h2>Category</h2>
            </Row>
            <Row>
                <Col>
                    <Image src={objectsImage5} fluid />
                </Col>
                <Col>
                    <Row>
                        <Col>
                            <Image src={objectsImage6} fluid />
                        </Col>
                        <Col>
                            <Image src={objectsImage7} fluid />
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <Image src={objectsImage8} fluid />
                        </Col>
                        <Col>
                            <Image src={objectsImage9} fluid />
                        </Col>
                    </Row>
                </Col>
                
            </Row>
            <Row className="mt-5">
                <h2>Last Arrived</h2>
            </Row>
            <Row className="mt-1">
                <Col>
                    <Card>
                        <div className="position-relative">
                            <BsHeart className="position-absolute top-0 end-0 mt-2 me-2 text-danger" 
                            style={{ 
                                cursor: 'pointer', fontSize: '35px', 
                                backgroundColor: 'white', padding: '5px', 
                                borderRadius: '40%' }} />
                        </div>
                        <Card.Img variant="top" src={objectsImage1} />
                        <Card.Body>
                            <Card.Title><b>Animal Name 1</b></Card.Title>
                            <Card.Text>shams max</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <div className="position-relative">
                            <BsHeart className="position-absolute top-0 end-0 mt-2 me-2 text-danger" 
                            style={{ 
                                cursor: 'pointer', fontSize: '35px',
                                backgroundColor: 'white', padding: '5px', 
                                borderRadius: '40%' }} />
                        </div>
                        <Card.Img variant="top" src={objectsImage2} />
                        <Card.Body>
                            <Card.Title><b>Animal Name 2</b></Card.Title>
                            <Card.Text>shams max</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <div className="position-relative">
                            <BsHeart className="position-absolute top-0 end-0 mt-2 me-2 text-danger" 
                            style={{ 
                                cursor: 'pointer', fontSize: '35px', 
                                backgroundColor: 'white', padding: '5px', 
                                borderRadius: '40%' }} />
                        </div>
                        <Card.Img variant="top" src={objectsImage3} />
                        <Card.Body>
                            <Card.Title><b>Animal Name 3</b></Card.Title>
                            <Card.Text>shams max</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <div className="position-relative">
                            <BsHeart className="position-absolute top-0 end-0 mt-2 me-2 text-danger" 
                            style={{ 
                                cursor: 'pointer', fontSize: '35px', 
                                backgroundColor: 'white', padding: '5px', 
                                borderRadius: '40%' }} />
                        </div>
                        <Card.Img variant="top" src={objectsImage4} />
                        <Card.Body>
                            <Card.Title><b>Animal Name 4</b></Card.Title>
                            <Card.Text>shams max</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;


// import Post from "../../../components/home/Post";
// import { axiosInstance } from '../../../api/config';
// import { useState, useEffect } from "react";
// import PageContext from '../../../Context/PageContext';
// import Paginator from '../../../components/Paginator/Paginator'


// const Home = () => {
//     const [ postsList , setPostsList ] = useState([])
//     const [ page , setPage ] = useState(1)
//     const [ maxpages, setmaxpages ] = useState(1)

//     const getPostsList = () => {
//         axiosInstance.get(`/posts/?page=${page}`)
//         .then((res) => {
//             setPostsList(res.data.results)
//             setmaxpages(res.data.total_pages)
//         })
//         .catch((err) => console.log(err));
//     }

//     useEffect(()=>{
//         getPostsList()
//     },[page])

//     return ( 
//         <section >
//             <div class="container posts py-5">
//                 <div class="row d-flex justify-content-center">
//                     <div class="col-md-12 col-lg-10 col-xl-8">
//                         {postsList.map((post) => {
//                                 return <Post post={post} />
//                         })}
//                     </div>

//                 </div>
//             </div>
            
//             { maxpages > 1 ? <div className="paginator">
//                 <PageContext.Provider  value={{page,setPage}}>
//                     <Paginator maxpages={maxpages}/>
//                 </PageContext.Provider>
//             </div> : <></> }
//         </section>

//      );
// }
 
// export default Home;
