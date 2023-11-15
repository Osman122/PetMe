import {faMagnifyingGlass,faPaw, faComments} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.css";
import { Link } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import {clearCurrUser} from '../../store/Slices/UserSlice'

function Header() {

  const {currentUser, synced} = useSelector(state => state.currentUser)
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(clearCurrUser())
  }

  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container">
        <Link
          to='/'
          className="navbar-brand me-auto fw-bold"
          style={{ color: "#8c594d" }}
        >
          <FontAwesomeIcon icon={faPaw} className="me-2" />
          Pet.me
        </Link>
        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
          <Link
          to='/'
          className="navbar-brand me-auto fw-bold"
          style={{ color: "#8c594d" }}
        >
          <FontAwesomeIcon icon={faPaw} className="me-2" />
          Pet.me
        </Link>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-center flex-grow-1 pe-3">
              <li className="nav-item">
                <Link
                  className="nav-link mx-lg-2"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link mx-lg-2" to="/explore">
                  Explore
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link mx-lg-2" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <form className="input-group mx-lg-2">
                  <input
                    type="text"
                    placeholder="Search here ..."
                    className="form-control"
                    id="inputGroupFile04"
                  />
                  <button
                    className="btn bg-white "
                    type="button"
                    id="inputGroupFileAddon04"
                  >
                    <FontAwesomeIcon icon={faMagnifyingGlass} style={{color:'#8c594d' , fontSize:'15px'}}/>
                  </button>
                </form>
              </li>
              {/* Hide when user not logged in */}
              <li className="nav-item ms-3">
                <Link className="nav-link mx-lg-2 fs-4 p-0 m-0" to="/chats">
                  <FontAwesomeIcon icon={faComments} style={{color:'#8c594d'}}/></Link>
              </li>
            </ul>
          </div>
        </div>

        {synced? <> 
        <Link to={`/userprofile/${currentUser.id}`} className="mx-lg-2">
          <img class="rounded-circle shadow-1-strong me-3"
              src={`${currentUser.picture}`} alt="avatar" width="30"
              height="30" />  
        </Link>

        <Link to="/" className="ms-3 text-primary text-decoration-none fw-bold" onClick={logout}>
          Logout
        </Link>
        </>:<>
        <Link to="/" className="login-button mx-lg-2">
          Login
        </Link>

        <Link to="/signup" className="ms-3 login-button">
          Signup
        </Link>
        </>}
        
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
