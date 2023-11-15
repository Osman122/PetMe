import { useState, useEffect } from "react";
import ExploreCard from "../../../components/explore/ExploreCard";
import Form from 'react-bootstrap/Form';
import { axiosInstance } from '../../../api/config';
import PageContext from '../../../Context/PageContext';
import Paginator from '../../../components/Paginator/Paginator'

const Explore = () => {
    const [ type , setType ] = useState('')
    const [ page , setPage ] = useState(1)
    const [ gender , setGender ] = useState('')
    const [ maxpages, setmaxpages ] = useState(1)

    const [ offersList , setOffersList ] = useState([])

    const getOffersList = () => {
        axiosInstance.get(`/offers/?page=${page}${type === ''? '':'&pet_type='+ type}${gender === ''? '':'&gender='+ gender}`)
        .then((res) => {
            setOffersList(res.data.results)
            setmaxpages(res.data.total_pages)
        })
        .catch((err) => console.log(err));
    }

    const handleTypeChange = (e) => {
        setType(e.target.value)
    }

    const handleGenderChange = (e) => {
        setGender(e.target.value)
    }

    useEffect(()=>{
        getOffersList()
    },[type,gender,page])

    return ( 
    <div className="container main">
        <h3 className="p-3"> Apply Filters</h3>

        <div className="filters d-flex justify-content-around">
            <div className="mb-3">
                <Form.Select aria-label="Default select example" style={{width:"100px"}} onChange={(e)=>handleTypeChange(e)}>
                    <option value="">All</option>
                    <option value="Cat">Cats</option>
                    <option value="Dog">Dogs</option>
                </Form.Select>
            </div>
            <div className="mb-3">
                <Form.Select aria-label="Default select example" style={{width:"100px"}} onChange={(e)=>handleGenderChange(e)}>
                    <option value="">All</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </Form.Select>
            </div>
        </div>
        <hr />

        <div className="row gy-3">
            {offersList.map((offer) => {
                    return <ExploreCard offer={offer} />
            })}
        </div>

        { maxpages > 1 ? <div className="paginator">
            <PageContext.Provider  value={{page,setPage}}>
                <Paginator maxpages={maxpages}/>
            </PageContext.Provider>
        </div> : <></> }

    </div>
     );
}
 
export default Explore;