import ExploreCard from "../../components/explore/ExploreCard";
import Form from 'react-bootstrap/Form';

const Explore = () => {
    return ( 
    <div className="container main mb-5">
        <h3 className="p-3"> Apply Filters</h3>

        <div className="filters d-flex justify-content-around">
            <div key={`inline-radio`} className="mb-3">
                <Form.Check inline checked label="All" name="group1" type="radio" id={`inline-radio-1`}/>
                <Form.Check inline label="Cats" name="group1" type="radio" id={`inline-radio-2`}/>
                <Form.Check inline label="Dogs" name="group1" type="radio" id={`inline-radio-3`}/>
            </div>
            <div key={`inline-checkbox`} className="mb-3">
                <Form.Check inline label="Male" type="checkbox" id={`inline-checkbox-1`}/>
                <Form.Check inline label="Female" type="checkbox" id={`inline-checkbox-2`}/>
            </div>
        </div>
        <hr />

        <div className="row gy-3">
            <ExploreCard/>
            <ExploreCard/>
            <ExploreCard/>
            <ExploreCard/>
            <ExploreCard/>
            <ExploreCard/>
            
        </div>
    </div>
     );
}
 
export default Explore;