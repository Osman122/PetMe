import './About.css'
import omar from '../../../assets/images/omar.jpeg'
import ascoura from '../../../assets/images/ascoura.jpg'
import mariam from '../../../assets/images/mariam.jpg'
import osman from '../../../assets/images/osman.png'
import kadry from '../../../assets/images/kadry.jpeg'
import abdullah from '../../../assets/images/abdullah.jpeg'
import Fade from 'react-reveal/Fade'


const About = () => {
    return ( 
        <div className="container about">
            <div className='text-center mt-5 pt-4'>
                <h1 className="text-primary fw-bolder">Who Are We</h1>
                <p className='px-5 py-3 fs-5'>"Pet Me is a non-profit organization that provides free and low-cost technology services to the animal welfare community. 
                    PetMe is an unaffiliated, volunteer-driven, non-competitive organization that wants to work with like-minded organizations to help animal welfare organizations, volunteers and pets."</p>
            </div>
            <div className="cards row row-cols-1 row-cols-lg-3">
            <div className="col d-flex justify-content-center">
                    <div className="card position-relative">
                        <img src={require('../../../assets/images/About.png')} alt="Care" />
                        <div className="card-footer position-absolute border-0 text-light text-center bg-primary" style={{bottom:"0"}}>
                            <h3 className='fw-bold'>Care</h3>
                            <p className='brief'>We believe that animal's lives are valuable and should be cherished.
                            <span className='info d-none' style={{textAlign:"justify"}}>We believe that animal rescue work is important. We believe that technology can increase the effectiveness of people's work and reach their goals more easily. 
                            We believe that animal organizations should have access to cost-effective technology solutions.</span></p>
                        </div>
                    </div>
                </div>
                <div className="col d-flex justify-content-center">
                    <div className="card">
                        <img src={require('../../../assets/images/About1.png')} alt="Care" />
                        <div className="card-footer position-absolute border-0 text-light text-center bg-primary" style={{bottom:"0"}}>
                            <h3 className='fw-bold'>Don't Buy, Adopt</h3>
                            <p className='brief'>We believe that people's time is valuable.
                            <span className='info d-none' style={{textAlign:"justify"}}>We believe that animal rescue work is important. We believe that technology can increase the effectiveness of people's work and reach their goals more easily.</span></p>
                        </div>
                    </div>
                </div>
                <div className="col d-flex justify-content-center">
                    <div className="card">
                        <img src={require('../../../assets/images/About.png')} alt="Care" />
                        <div className="card-footer position-absolute border-0 text-light text-center bg-primary" style={{bottom:"0"}}>
                            <h3 className='fw-bold'>Awareness</h3>
                            <p className='brief'>We believe that people should be educated about the impact of animal overpopulation..
                            <span className='info d-none' style={{textAlign:"justify"}}>We believe that spay/neuter is integral to ending the animal overpopulation problem. We believe that effective collaboration is essential to ending the animal overpopulation problem.</span></p>
                        </div>
                    </div>
                </div>
            </div>

        <div style={{textAlign:"" ,color:"#8c594d"}}>
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