import './Explore.css'
import { Link, useNavigate, useParams } from "react-router-dom"

import PageContext from '../../../Context/PageContext';
import Paginator from '../../../components/Paginator/Paginator';
import { useEffect, useState } from "react"
import { axiosInstance } from '../../../api/config';
import { Card, Row, Col } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import PetCard, { petCard } from '../../../components/explore/PetCard'

const Search = () => {
    const [ page, setPage ] = useState(1);
    const [ gender, setGender ] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const [ species, setSpecies ] = useState(searchParams.get("species") || "")
    const [ query, setQuery ] = useState(searchParams.get("query") || "")
    
    const [ filter, setFilter ] = useState('pets');
    const [ maxpages, setmaxpages ] = useState(1);
    const [ resultList, setResultList ] = useState([]);
    
    const navigate = useNavigate();

    const fetchData = () => {   
        const endpoint = `/${filter}/?search=${query}${['pets','offers'].includes(filter) && species?'&species='+species:''}${['pets','offers'].includes(filter) && gender?'&gender='+gender:''}`

        axiosInstance.get(endpoint)
            .then((res) => {
                setResultList(res.data.results);
                setmaxpages(res.data.total_pages);
                console.log(res.data.results)
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(()=>{
        fetchData()
    },[filter, species, gender])

    return <>
        <div className="container py-3 h-100">
            <div className="grid search">
                <div className="grid-body">
                    <div className="row" style={{minHeight:"80vh"}}>
                        <div className="col-lg-3 d-flex justify-content-center" >
                            <div className="d-flex flex-column flex-shrink-0 bg-light w-75 p-3 pt-4" style={{minWidth:"250px", borderRadius:"24px"}}>
                                <div class="list-group">
                                    <button type="button" onClick={()=>{setFilter('pets')}} class={`  list-group-item list-group-item-action ${filter==='pets'?'btn-primary active':'btn-outline-primary'}`} aria-current="true">Pets</button>
                                    <button type="button" onClick={()=>{setFilter('offers')}} class={`list-group-item list-group-item-action ${filter==='offers'?'btn-primary active':'btn-outline-primary'}`}>Offers</button>
                                    <button type="button" onClick={()=>{setFilter('posts')}} class={` list-group-item list-group-item-action ${filter==='posts'?'btn-primary active':'btn-outline-primary'}`}>Posts</button>
                                    <button type="button" onClick={()=>{setFilter('accounts/users/list')}} class={ `list-group-item list-group-item-action ${filter==='users'?'btn-primary active':'btn-outline-primary'}`}>Users</button>
                                </div>
                                <div>
                                    <hr/>
                                    <h3>Keywords</h3>
                                    <input type="text" className='w-auto mx-2 border-primary form-control' style={{boxShadow:"none"}} value={query} onChange={e => setQuery(e.target.value)} onBlur={fetchData}/>
                                </div>
                                {['pets', 'offers'].includes(filter)?<>
                                <div>
                                    <hr/>
                                    <h3>Filters</h3>
                                    <p>Species</p>
                                    <select class="form-select" aria-label="Default select example" onChange={e => setSpecies(e.target.value)}>
                                        <option value="" selected={species?false:true}>All Species</option>
                                        <option value="Dog">Dog</option>
                                        <option value="Cat">Cat</option>
                                        <option value="Bird">Bird</option>
                                        <option value="Turtle">Turtle</option>
                                        <option value="Hamster">Hamster</option>
                                        <option value="Other">Other</option>
                                    </select>

                                    <p className='mt-3'>Gender</p>
                                    <select class="form-select" aria-label="Default select example" onChange={e => setGender(e.target.value)}>
                                        <option value="" selected={gender?false:true}>All Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>                            
                                </>:<></>}

                            </div>
                        </div>

                        <div className="col-lg-9 pt-3 position-relative ">
                            <div id="results" className='d-flex flex-wrap justify-content-around align-content-start' style={{overflow:"auto",maxHeight:"70vh"}}>

                                {filter === 'accounts/users/list' ? (
                                    resultList.map((user, index) => (
                                    <Link to={`/profile/${user.id}`} key={index} className="text-decoration-none m-3" style={{width:"45%", height:"120px"}}>
                                        <Card className="px-3">
                                        <Row className="align-items-center">
                                            <Col xs={3}>
                                            <Card.Img src={user.picture} style={{ width: '80px', margin: 'auto' }} />
                                            </Col>
                                            <Col xs={9}>
                                            <Card.Body>
                                                <Card.Title className='m-0 fw-bold'>{user.username}</Card.Title>
                                                <Card.Text>
                                                <strong>Pets:</strong> {user.pets? user.pets.length: 0}<br/>
                                                <strong>Joined:</strong> {user.date_joined?user.date_joined.slice(0,10):""}
                                                </Card.Text>
                                            </Card.Body>
                                            </Col>
                                        </Row>
                                        </Card>
                                    </Link>
                                    ))
                                ) : filter === 'pets' ? (
                                    resultList.map((pet, index) => (
                                        <div className='m-3'><PetCard pet={pet} key={index} /></div>
                                    ))
                                ): filter === 'offers' ? (
                                <div className="table-responsive">
                                    <div className="table-container">
                                        <table className="table table-hover">
                                            <tbody>
                                            <tr>
                                                <th>Index</th>
                                                <th>Description</th>
                                                <th style={{width:'20%'}}>Pet Name</th>
                                                <th style={{width:'15%'}}>From</th>
                                            </tr>
                                            {resultList.map((offer, index) => (
                                            <tr key={index} onClick={e => navigate(`/offers/${offer.id}`) }>
                                                <td className="number text-center">{index + 1}</td>
                                                <td className="product"><strong>{offer.description}</strong><br/></td>
                                                <td className="product"><strong>{offer.pet?offer.pet.name:""}</strong><br/></td>
                                                <td className="product"><strong>{offer.user?offer.user.username:""}</strong><br/></td>
                                            </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                        </div>
                                    </div>

                                ) :filter === 'posts' ? (
                                    <div className="table-responsive flex-grow-1">

                                    <div className="table-container">
                                    <table className="table table-hover">
                                        <tbody>
                                        <tr>
                                                <th>Index</th>
                                                <th>Content</th>
                                                <th>Author</th>
                                            </tr>
                                        {resultList.map((post, index) => (
                                            <tr key={index} onClick={e => navigate(`/post/${post.id}`)}>
                                            <td className="number text-center">{index + 1}</td>
                                            <td className="product"><strong>{post.content}</strong><br/></td>
                                            <td className="product"><strong>{post.user ? post.user.username : 'Unknown'}</strong><br/></td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                    </div>
                                    </div>
                                ): <></>}
                            </div>

                                {maxpages > 1 ? <>
                                    <div className="pagination pb-5">
                                        <PageContext.Provider  value={{page,setPage}}>
                                            <Paginator maxpages={maxpages}/>
                                        </PageContext.Provider>
                                    </div>                                
                                </>:<></>}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </>
};

export default Search;