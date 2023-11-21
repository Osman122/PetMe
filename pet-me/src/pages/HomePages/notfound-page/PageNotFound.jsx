import E404 from '../../../assets/images/E404.jpg'


const PageNotFound = () => {
    return ( 
        <div style={{backgroundColor:"white"}}>
            <img className='' src={E404} alt='Error 404' style={{width:"80dvw", height:"40dvw", marginLeft:"10dvw"}} />
        </div>
     );
}
 
export default PageNotFound;