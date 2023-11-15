import './search.css'
import { useParams } from "react-router-dom"

import PageContext from '../../../Context/PageContext';
import Paginator from '../../../components/Paginator/Paginator';
import { useEffect, useState } from "react"
import { axiosInstance } from '../../../api/config';

const Search = () => {
    const [ page, setPage ] = useState(1)
    const [ filter, setFilter ] = useState('offers')
    const [ maxpages, setmaxpages ] = useState(1)
    const [ resultList, setResultList ] = useState([])
    let {keyword: key} = useParams()
    const [ keyword, setkeyword ] = useState(key)



    useEffect(()=>{
        axiosInstance.get(`/${filter}/?page=${page}&search=${keyword}`)
        .then((res)=>{
            setResultList(res.data.results)
            setmaxpages(res.data.total_pages)
        }).catch((error) => {
            console.log(error)
    })},[page, filter])


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
                            <a href="/" className="nav-link link-dark">
                            Users
                            </a>
                        </li>
                        <li>
                            <a href="/" className="nav-link link-dark">
                            Posts
                            </a>
                        </li>
                        <li>
                            <a href="/" className="nav-link link-dark">
                            Pets
                            </a>
                        </li>
                        <li>
                            <a href="/" className="nav-link link-dark">
                            Offers
                            </a>
                        </li>
                        </ul>
                        </div>
                    </div>


                <div className="col-md-9">
                    <h2><i className="fa fa-file-o"></i> Result</h2>
                    <hr/>
                    <p>Showing all results matching "web development"</p>
                    
                    <div className="padding"></div>
                    
                    
                    <div className="table-responsive">
                    <table className="table table-hover">
                        <tbody><tr>
                        <td className="number text-center">1</td>
                        <td className="image"><img src="https://www.bootdey.com/image/400x300/FF8C00" alt=""/></td>
                        <td className="product"><strong>Product 1</strong><br/>This is the product description.</td>
                        <td className="rate text-right"><span><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star-half-o"></i></span></td>
                        <td className="price text-right">$350</td>
                        </tr>
                        <tr>
                        <td className="number text-center">2</td>
                        <td className="image"><img src="https://www.bootdey.com/image/400x300/5F9EA0" alt=""/></td>
                        <td className="product"><strong>Product 2</strong><br/>This is the product description.</td>
                        <td className="rate text-right"><span><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star-o"></i><i className="fa fa-star-o"></i></span></td>
                        <td className="price text-right">$1,050</td>
                        </tr>
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