import forbidden403 from '../../../assets/images/403-Forbidden-Page.gif'
import { Link } from "react-router-dom";

const Forbidden = () => {
    return ( 
        <div style={{height: "80vh", top:"50%", left:"50%", transform:"translate(-50%,-50%)", position:"absolute"}} >
            <img className='' src={forbidden403} alt='Error 403' style={{height:"40dvw"}}/>
            <Link to={`/`}>
            <button className='btn-primary' 
            style={{color:"", position:"absolute", 
            top:"34vw", left:"30dvw", fontSize:"3dvw", 
            fontWeight:"bold", zIndex:"10000000",
            borderRadius: "7px"
            }}>HOME </button></Link>
        </div>
    );
}

export default Forbidden;