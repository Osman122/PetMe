import './search.css'
import { Link, useParams } from "react-router-dom"

import PageContext from '../../../Context/PageContext';
import Paginator from '../../../components/Paginator/Paginator';
import { useEffect, useState } from "react"
import { axiosInstance } from '../../../api/config';
import { Card, Row, Col } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';

const Search = () => {
    const [ page, setPage ] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();
    const [ species, setSpecies ] = useState(searchParams.get("species"))
    const [ query, setQuery ] = useState(searchParams.get("query"))
    
    const [ filter, setFilter ] = useState('pets');
    const [ maxpages, setmaxpages ] = useState(1);
    const [ resultList, setResultList ] = useState([]);
    
    
    let { keyword: key } = useParams();
    // const [keyword, setKeyword] = useState(key);
    const [keyword, setKeyword] = useState('');

    const handleKeywordChange = (event) => {
        setKeyword(event.target.value);
    };

    const fetchData = () => {
        let endpoint = `/${filter}/?page=${page}&search=${keyword}`;
        
        if (filter === 'pets') {
            endpoint = `/pets/?search=${keyword}`;
        } else if (filter === 'offers') {
            endpoint = `/offers/?search=${keyword}`;
        } else if (filter === 'posts') {
            endpoint = `/posts/?search=${keyword}`;
        } else if (filter === 'users') {
            endpoint = `/accounts/users/list/?search=${keyword}`;
        }
    
        axiosInstance.get(endpoint)
            .then((res) => {
                setResultList(res.data.results);
                setmaxpages(res.data.total_pages);
                console.log(res)
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(()=>{
        console.log(species)
        fetchData()
    },[filter])

    return <>
        <div className="container py-3 h-100">
        <div className="row">
            <div className="grid search">
            <div className="grid-body">
                <div className="row">
                <div className="col-md-3">
                    <div className="d-flex flex-column flex-shrink-0 p-3 bg-light " style={{width:"280px",minHeight:"75vh"}}>
                        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                        
                        <span className="fs-4">Filters</span>
                        </a>
                        <hr/>
                        <ul className="nav nav-pills flex-column mb-auto">
                            <li>
                                <input type="text" value={keyword} onChange={handleKeywordChange} />
                                <button className="nav-link link-dark" onClick={()=>{setFilter('accounts/users')}}>
                                    Users
                                </button>
                            </li>
                            <li>
                                <button className="nav-link link-dark" onClick={()=>{setFilter('posts')}}>
                                    Posts
                                </button>
                                
                            </li>
                            <li>
                                <button className="nav-link link-dark" onClick={()=>{setFilter('pets')}}>
                                    Pets
                                </button>
                            </li>
                            <li>
                                <button className="nav-link link-dark" onClick={()=>{setFilter('offers')}}>
                                    Offers
                                </button>
                            </li>
                        </ul>
                        </div>
                    </div>


                <div className="col-md-9">
                

                    <h2><i className="fa fa-file-o"></i> Result</h2>
                    <hr/>
                    <p>Showing all results matching "{keyword}"</p>
                    
                    <div className="padding"></div>
                    
                    
                    <div className="table-responsive">
                    {filter === 'users' ? (
                        resultList.map((result, index) => (
                        <Link to={`/profile/${result.id}`} key={index} className="text-decoration-none">
                            <Card className="my-3" style={{ width: '350px', margin: 'auto' }}>
                            <Row className="align-items-center">
                                <Col xs={4}>
                                <Card.Img src={result.picture} style={{ width: '100px', margin: 'auto' }} />
                                </Col>
                                <Col xs={8}>
                                <Card.Body>
                                    <Card.Title>{result.username}</Card.Title>
                                    <Card.Text>
                                    <strong>Full name:</strong> {result.first_name} {result.last_name}<br />
                                    <strong>Gender:</strong> {result.gender}<br />
                                    <strong>Phone:</strong> {result.phone}
                                    </Card.Text>
                                </Card.Body>
                                </Col>
                            </Row>
                            </Card>
                        </Link>
                        ))
                    ) : filter === 'pets' ? (
                        resultList.map((result, index) => (
                            <Link to={`/petinfo/${result.id}`} key={index} className="text-decoration-none">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-12 d-flex justify-content-center">
                                        <Card className="my-3 " style={{ width: '400px' }}>
                                            <Row className="align-items-center">
                                                <Col xs={5}>
                                                <Card.Img src={result.thumbnail} style={{ width: '150px', margin: 'auto', objectFit: 'cover' }}  />
                                                </Col>
                                                <Col xs={7}>
                                                <Card.Body>
                                                    <Card.Title>{result.name}</Card.Title>
                                                    <Card.Text>
                                                    <strong>Owner:</strong> {result.owner && result.owner.username ? result.owner.username : 'Unknown'}<br/>
                                                    <strong>Gender:</strong> {result.gender}<br/>
                                                    <strong>Color:</strong> {result.color}<br/>
                                                    <strong>Species:</strong> {result.species}<br/>
                                                    {/* Add other pet data here */}
                                                    </Card.Text>
                                                </Card.Body>
                                                </Col>
                                            </Row>
                                            </Card>
                                        </div>
                                    </div>
                                </div>
                                
                            </Link>
                        ))
                    ): filter === 'offers' ? (
                        <div className="table-container">
                            <table className="table table-hover">
                                <tbody>
                                <tr>
                                    <th>Index</th>
                                    <th>Description</th>
                                    <th>Pet Name</th>
                                    <th>Pet Owner</th>
                                </tr>
                                {resultList.map((result, index) => (
                                    <tr key={index}>
                                    <td className="number text-center">{index + 1}</td>
                                    <td className="product"><strong>{result.description}</strong><br/></td>
                                    <td className="product"><strong>{result.pet && result.pet.name ? result.pet.name: 'Unknown' }</strong><br/></td>
                                    <td className="product"><strong>{result.user && result.user.username ? result.user.username: 'Unknown' }</strong><br/></td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            </div>
                        ) :filter === 'posts' ? (
                            <div className="table-container">
                            <table className="table table-hover">
                                <tbody>
                                <tr>
                                        <th>Index</th>
                                        <th>Content</th>
                                        <th>Poster</th>
                                    </tr>
                                {resultList.map((result, index) => (
                                    <tr key={index}>
                                    <td className="number text-center">{index + 1}</td>
                                    <td className="product"><strong>{result.content}</strong><br/></td>
                                    <td className="product"><strong>{result.user && result.user.username ? result.user.username : 'Unknown'}</strong><br/></td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            </div>
                        ): null}
                    </div>

                    
                    <div className="pagination">
                        <PageContext.Provider  value={{page,setPage}}>
                            <Paginator maxpages={maxpages}/>
                        </PageContext.Provider>
                    </div>
                </div>
                </div>

                </div>
            </div>
            </div>
        </div>
    </>
};

export default Search;