import './search.css'
import { useParams } from "react-router-dom"

import PageContext from '../../../Context/PageContext';
import Paginator from '../../../components/Paginator/Paginator';
import { useEffect, useState } from "react"
import { axiosInstance } from '../../../api/config';

const Search = () => {
    const [ page, setPage ] = useState(1);
    const [ filter, setFilter ] = useState('offers');
    const [ maxpages, setmaxpages ] = useState(1);
    const [ resultList, setResultList ] = useState([]);
    
    let { keyword: key } = useParams();
    // const [keyword, setKeyword] = useState(key);
    const [keyword, setKeyword] = useState('');

    const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
    };



     // Function to handle button click for Users
    const handleUsersClick = () => {
        setFilter('users');
        fetchData('users');
    };

    // Function to handle button click for Pets
    const handlePetsClick = () => {
        setFilter('pets');
        fetchData('pets');
    };

    // Function to handle button click for Posts
    const handlePostsClick = () => {
        setFilter('posts');
        fetchData('posts');
    };

    // Function to handle button click for Offers
    const handleOffersClick = () => {
        setFilter('offers');
        fetchData('offers');
    }

    

    const fetchData = (selectedFilter) => {
        let endpoint = `/${selectedFilter}/?page=${page}&search=${keyword}`;
        
        if (selectedFilter === 'pets') {
            endpoint = `/pets/?search=${keyword}`;
        } else if (selectedFilter === 'offers') {
            endpoint = `/offers/?search=${keyword}`;
        } else if (selectedFilter === 'posts') {
            endpoint = `/posts/?search=${keyword}`;
        } else if (selectedFilter === 'users') {
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
                                <button className="nav-link link-dark" onClick={handleUsersClick}>
                                    Users
                                </button>
                            </li>
                            <li>
                                <button className="nav-link link-dark" onClick={handlePostsClick}>
                                    Posts
                                </button>
                                
                            </li>
                            <li>
                            <button className="nav-link link-dark" onClick={handlePetsClick}>
                            Pets
                            </button>
                            </li>
                            <li>
                                <button className="nav-link link-dark" onClick={handleOffersClick}>
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
                    <table className="table table-hover">
                    <tbody>
                    {resultList.map((result, index) => (
                        <tr key={index}>
                            <td className="number text-center">{index + 1}</td>
                            
                            <td className="product"><strong>{result.name}</strong><br/></td>
                            <td className="product"><strong>{result.content}</strong><br/></td>
                            <td className="product"><strong>{result.description}</strong><br/></td>
                            <td className="product"><strong>{result.username}</strong><br/></td>
                            
                        
                        </tr>
                        ))}
                    </tbody></table>
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