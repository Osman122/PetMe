import { useState, useEffect } from "react";
import OfferCard from "../../../components/explore/OfferCard";
import Form from 'react-bootstrap/Form';
import { axiosInstance } from '../../../api/config';
import PageContext from '../../../Context/PageContext';
import Paginator from '../../../components/Paginator/Paginator'
import { useSearchParams } from 'react-router-dom';

const Explore = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [ species, setSpecies ] = useState(searchParams.get("species"))

    const [ page , setPage ] = useState(1)
    const [ gender , setGender ] = useState('')
    const [ maxpages, setmaxpages ] = useState(1)

    const [ offersList , setOffersList ] = useState([])

    const getOffersList = () => {
        axiosInstance.get(`/offers/?page=${page}${species === ''? '':'&species='+ species}${gender === ''? '':'&gender='+ gender}`)
        .then((res) => {
            setOffersList(res.data.results)
            setmaxpages(res.data.total_pages)
        })
        .catch((err) => console.log(err));
    }

    const handleSpeciesChange = (e) => {
        species(e.target.value)
    }

    const handleGenderChange = (e) => {
        setGender(e.target.value)
    }

    useEffect(()=>{
        getOffersList()
    },[species,gender,page])

    return ( 
    <div className="container"> 
        <h3 className="p-3"> Apply Filters</h3>

        <div className="filters d-flex justify-content-around">
            <div className="mb-3">
                <Form.Select aria-label="Default select example" style={{width:"100px"}} onChange={(e)=>handleSpeciesChange(e)}>
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
                    return <OfferCard offer={offer} />
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