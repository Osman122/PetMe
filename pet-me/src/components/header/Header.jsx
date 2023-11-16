import Cookies from "js-cookie";
import logo from '../../assets/images/Logo.png'
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../api/config";
import {useSelector, useDispatch} from 'react-redux'
import {clearCurrUser, setCurrUser} from '../../store/Slices/UserSlice'

import "./style.css";
import {faMagnifyingGlass,faPaw, faComments} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { Form, InputGroup } from "react-bootstrap";

function Header() {

  const {currentUser, synced} = useSelector(state => state.currentUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const authenticate = () => {
    let access = Cookies.get('access')
    let refresh = Cookies.get('refresh')

    if (access) {
      axiosInstance.get('/accounts/users/me/',  {
        headers: {
            'Authorization': 'JWT '+access,
        }}).then(res => {
          dispatch(setCurrUser(res.data))
      }).catch((err)=>{console.log(err)})

    } else if (refresh) {
      axiosInstance.post('/accounts/jwt/refresh/', {'refresh':refresh}).then((res)=>{
        Cookies.set('access', res.data.access, { expires: 1})
        authenticate()

    }).catch(err => {console.log(err)})}
   
  };

  const logout = () => {
    dispatch(clearCurrUser())
  }

  const search = (e) => {
    e.preventDefault()
    let query = e.target.querySelector('input#search').value
    navigate(`/search?search=${query}`)
  }

  useEffect(() => {
    authenticate();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container">
        <Link to='/' className="navbar-brand text-primary">
          <img src={logo} alt='logo' style={{height:"32px", marginRight:"10px"}}/>
          Pet.me
        </Link>

        <div className="offcanvas offcanvas-end"
          tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div className="offcanvas-header me-lg-2">
          <Link to='/' className="navbar-brand text-primary">
            <img src={logo} alt='logo' style={{height:"32px", marginRight:"10px"}}/>
            Pet.me
          </Link>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>

          <div className="offcanvas-body ms-lg-5">
            <ul className="navbar-nav justify-content-center flex-grow-1 pe-3">
              <li className="nav-item">
                <Link
                  className="nav-link mx-lg-2"
                  aria-current="page"
                  to="/explore">
                  Explore
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link mx-lg-2" to="/blog">
                  Blog
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link mx-lg-2" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item ms-auto me-5 d-flex align-items-center w-50 mb-5 mb-lg-0">
                <form className="input-group mx-lg-2" onSubmit={e => search(e)}>
                  <InputGroup className="p-1">
                    <InputGroup.Text id="basic-addon1" className="bg-transparent border-0">
                      <button type="submit" className="border-0 bg-transparent">
                        <FontAwesomeIcon icon={faMagnifyingGlass} style={{color:'#8c594d' , fontSize:'18px'}}/>
                      </button>
                      </InputGroup.Text>
                    <Form.Control
                      className="p-0"
                      type="text"
                      placeholder="Search here ..."
                      aria-label="Search"
                      id="search"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                </form>
              </li>
            </ul>

            <div className="d-flex align-items-center justify-content-between">
              {synced? <> 
              <Link to="/chats">
                  <FontAwesomeIcon icon={faEnvelope} className="text-primary fw-bold fs-4"/>
              </Link>

              <Link to={`/userprofile/${currentUser.id}`} className="mx-4">
                <img class="rounded-circle shadow-1-strong"
                    src={`${currentUser.picture}`} alt="avatar" width="40"
                    height="40"/>  
              </Link>

              <Link to="/" className="text-primary text-decoration-none fw-bold" onClick={logout}>
                Logout
              </Link>
              </>:<>
              <Link to="/register/login" className="login-button mx-lg-2">
                Login
              </Link>
              </>}
            </div>

          </div>

        </div>


        
        <button
          className="navbar-toggler pe-0"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>


  );
}

export default Header;
