import { useEffect } from "react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import omar from '../../../assets/images/omar.jpeg'
import ascoura from '../../../assets/images/ascoura.jpg'
import mariam from '../../../assets/images/mariam.jpg'
import osman from '../../../assets/images/osman.png'
import kadry from '../../../assets/images/kadry.jpeg'
import fullpage from 'fullpage.js'; 
import './About.css'
import Fade from 'react-reveal/Fade'


const About = () => {

//   const animateList = [1,2,3,4,5] ;


    // useEffect(() => {
    //     new fullpage('#fullpage', {
    //       autoScrolling: true,
    //       navigation: true,
    //     });
    //   }, []); // Run this effect only once on initial mount
    

    return ( 
        <div id="fullpage" className="container main">

        {/* {
            animateList.map((item,key)=> (
                <div styles={{display:"flex",alignItems:"center",justifyContent:"center",width:"100%", height:"100%", background:"#000", borderBottom:"1px solid rgba(255,255,255,0.2"}} key={key}>
                    <Fade top>
                        <h1 style={{textAlign:"center", fontSize:"100", color:"#fff", fontFamily:"Lato, sans-seif", fontWeight:"100"}}>
                            {`block ${item}`}
                        </h1>
                    </Fade>
                </div>

                ))
        }
                 */}

{/* 
                 {animateList.map((item, key) => (
        <Fade key={key} top>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
              background: "#000",
              borderBottom: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <h1
              style={{
                textAlign: "center",
                fontSize: "100",
                color: "#fff",
                fontFamily: "Lato, sans-seif",
                fontWeight: "100",
              }}
            >
              {`block ${item}`}
            </h1>
          </div>
        </Fade>
      ))}
       */}
            <div style={{textAlign:"" ,color:"#8c594d"}}>
                
                    <Fade right>
                    <div className="whoweare section container mb-5" style={{ boxShadow: "#8c594d52 1px 20px 11px 0px", padding:"2rem", height:"20vw", textAlign:"center"}}>
                    <h1>Who We Are</h1>        
                    <p style={{color:"gray"}}>
                    Pet Me is a non-profit organization that provides free and low-cost technology services to the animal welfare community. RescueGroups.org is an unaffiliated, volunteer-driven, non-competitive organization that wants to work with like-minded organizations to help animal welfare organizations, volunteers and pets.
                    </p>
                </div>
                </Fade>

                <Fade top>
               <div className="mission section mb-5 my-5" style={{ boxShadow: "#8c594d52 1px 20px 11px 0px", padding:"2rem"}}>
               <h2 style={{textAlign:"center"}}>Our Mission And Values :</h2>
        
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
                <div className="ascoura">
                    <img className="" src={ascoura} alt="" style={{borderRadius:"50%", height:"100px"}}/>
                    <h5 className="text-secondary">Moustafa Ascoura</h5>
                </div>
                <div className="mariam">
                    <img className="" src={mariam} alt="" style={{borderRadius:"50%", height:"100px"}}/>
                    <h5 className="text-secondary">Mariam Tamer</h5>
                </div>
                <div className="osman">
                    <img className="" src={osman} alt="" style={{borderRadius:"50%", height:"100px"}}/>
                    <h5 className="text-secondary">Osman Ahmed</h5>                  
                </div>
                <div className="kadry">
                    <img className="" src={kadry} alt="" style={{borderRadius:"50%", height:"100px"}}/>
                    <h5 className="text-secondary">Mohamed Kadry</h5>
                </div>
                <div className="omar">
                    <img className="" src={omar} alt="" style={{borderRadius:"50%", height:"100px"}}/>
                    <h5 className="text-secondary">Omar Elsayed</h5>
                </div>
                      </div>

               </div>
            </Fade>
        </div>
      
    </div>
     );
}
 
export default About;