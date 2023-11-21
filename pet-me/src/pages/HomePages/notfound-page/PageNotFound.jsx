import E404 from '../../../assets/images/E404.jpg'
import error from '../../../assets/images/error.png'


const PageNotFound = () => {
    return ( 
        <div style={{backgroundColor:"white", height:"100%dvw"}}>
            {/* <img className='' src={E404} alt='Error 404' style={{width:"80dvw", height:"40dvw", marginLeft:"10dvw"}} /> */}
            <img className='' src={error} alt='Error 404' style={{width:"50dvw", height:"30dvw", marginLeft:"10dvw", position: "relative", opacity:"80%"}} />
            <h1 style={{color:"#BF7245", position:"absolute", top:"13vw", left:"15dvw", fontSize:"3dvw", fontWeight:"bold", zIndex:"10000000"}}>Error 404 </h1>
        </div>
     );
}
 
export default PageNotFound;