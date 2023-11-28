import './About.css'
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import omar from '../../../assets/images/omar.jpeg'
import ascoura from '../../../assets/images/ascoura.jpg'
import mariam from '../../../assets/images/mariam.jpg'
import osman from '../../../assets/images/osman.png'
import kadry from '../../../assets/images/kadry.jpeg'
import abdullah from '../../../assets/images/abdullah.jpeg'
import Fade from 'react-reveal/Fade'


const About = () => {
    return ( 
        <div id="fullpage" className="container main">
            <div style={{textAlign:"" ,color:"#8c594d"}}>
                
                    <Fade right>
                    <div className="whoweare section container mb-5" style={{ boxShadow: "#8c594d52 1px 20px 11px 0px", padding:"2rem", height:"20vw", textAlign:"center"}}>
                    <h1 className="mb-5">Who We Are</h1>        
                    <p style={{color:"gray"}}>
                    Pet Me is a non-profit organization that provides free and low-cost technology services to the animal welfare community. RescueGroups.org is an unaffiliated, volunteer-driven, non-competitive organization that wants to work with like-minded organizations to help animal welfare organizations, volunteers and pets.
                    </p>
                </div>
                </Fade>

                <Fade top>
               <div className="mission section mb-5 my-5" style={{ boxShadow: "#8c594d52 1px 20px 11px 0px", padding:"2rem"}}>
               <h2 style={{textAlign:"center"}}  className="mb-5">Our Mission And Values :</h2>
        
                    <p style={{color:"gray"}}>
                    <FontAwesomeIcon icon={faCheck} style={{color: "#8e4501"}} />
                    We believe that animal's lives are valuable and should be cherished
                    </p>

                    <p style={{color:"gray"}}>
                    <FontAwesomeIcon icon={faCheck} style={{color: "#8e4501",}} />
                    We believe that people should be educated about the impact of animal overpopulation
                    </p>

                    <p style={{color:"gray"}}>
                    <FontAwesomeIcon icon={faCheck} style={{color: "#8e4501",}} />
                    We believe that animal rescue work is important
                    </p>

                    <p style={{color:"gray"}}>
                    <FontAwesomeIcon icon={faCheck} style={{color: "#8e4501",}} />
                    We believe that spay/neuter is integral to ending the animal overpopulation problem
                    </p>

                    <p style={{color:"gray"}}>
                    <FontAwesomeIcon icon={faCheck} style={{color: "#8e4501",}} />
                    We believe that effective collaboration is essential to ending the animal overpopulation problem
                    </p>

                    <p style={{color:"gray"}}>
                    <FontAwesomeIcon icon={faCheck} style={{color: "#8e4501",}} />
                    We believe that technology can increase the effectiveness of people's work and reach their goals more easily
                    </p>

                    <p style={{color:"gray"}}>
                    <FontAwesomeIcon icon={faCheck} style={{color: "#8e4501",}} />
                    We believe that animal organizations should have access to cost-effective technology solutions
                    </p>

                    <p style={{color:"gray"}}>
                    <FontAwesomeIcon icon={faCheck} style={{color: "#8e4501",}} />
                    We believe that people's time is valuable
                    </p>
    
               </div>
            </Fade>

            <Fade left>
               <div className="board section mt-5" style={{marginBottom:"10rem"}}>
                  <h2 style={{textAlign:"center", marginBottom:"4rem"}}>Our Board</h2>
                  <div className="imgs d-flex justify-content-between">
                    <a className="ascoura" href="https://www.linkedin.com/in/moustafaascoura/">
                        <img className="" src={ascoura} alt="" style={{borderRadius:"50%", height:"100px"}}/>
                        <h5 className="text-dark">Moustafa Ascoura</h5>
                        <p className="text-secondary">Fullstack / Coordinator</p>
                    </a>
                    <a className="mariam" href="https://www.linkedin.com/in/mariamtamer000/">
                        <img className="" src={mariam} alt="" style={{borderRadius:"50%", height:"100px"}}/>
                        <h5 className="text-dark">Mariam Tamer</h5>
                        <p className="text-secondary">Django / APIs / React</p>

                    </a>
                    <a className="osman" href="https://www.linkedin.com/in/osman-ahmed122/">
                        <img className="" src={osman} alt="" style={{borderRadius:"50%", height:"100px"}}/>
                        <h5 className="text-dark">Osman Ahmed</h5>
                        <p className="text-secondary">Django / APIs / React</p>
                    </a>

                    <a className="kadry" href="https://www.linkedin.com/in/mohamedqadry22/">
                        <img className="" src={kadry} alt="" style={{borderRadius:"50%", height:"100px"}}/>
                        <h5 className="text-dark">Mohamed Kadry</h5>
                        <p className="text-secondary">Django / APIs / React</p>
                    </a>

                    <a className="omar" href="https://www.linkedin.com/in/omar-elsayed-a24844150/">
                        <img className="" src={omar} alt="" style={{borderRadius:"50%", height:"100px"}}/>
                        <h5 className="text-dark">Omar Elsayed</h5>
                        <p className="text-secondary">Django / APIs / React</p>
                    </a>                    
                    <a className="abdullah" href="https://www.linkedin.com/in/abdullahadel14/">
                        <img className="" src={abdullah} alt="" style={{borderRadius:"50%", height:"100px"}}/>
                        <h5 className="text-dark">Abdullah Adel</h5>
                        <p className="text-secondary">UI / UX Developer </p>
                    </a>
                  </div>
               </div>
            </Fade>
        </div>
    </div>
     );
}
 
export default About;