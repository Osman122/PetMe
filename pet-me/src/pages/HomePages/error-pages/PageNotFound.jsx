import E404 from '../../../assets/images/E404.jpg'
import error from '../../../assets/images/error.png'


const PageNotFound = () => {
    return ( 
        <div style={{height: "80vh", top:"50%", left:"50%", transform:"translate(-50%,-50%)", position:"absolute"}} >
            {/* <img className='' src={E404} alt='Error 404' style={{width:"80dvw", height:"40dvw", marginLeft:"10dvw"}} /> */}
            <img className='' src={error} alt='Error 404' style={{width:"50dvw", height:"30dvw", position: "relative", opacity:"80%"}} />
            <h1 style={{color:"#BF7245", position:"absolute", top:"8vw", left:"2dvw", fontSize:"3dvw", fontWeight:"bold", zIndex:"10000000"}}>Error 404 </h1>
        </div>
     );
}
 
export default PageNotFound;