import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import newRequest from '../../utils/newRequest.js'
import "./Navbar.scss"

const Navbar = () => {

  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const {pathname} = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);

    return () => {
      window.removeEventListener("scroll", isActive);
    }
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("currentUser")); 

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
        <div className="container">
            <div className="logo">
                <Link to="/" className='link'>
                  <span className='text'>ServicesMart</span>
                </Link>
            </div>
            <div className="links">
                <Link className="link" to={`/about`}>
                  <span>About</span>
                </Link>
                <Link to="/gigs" className='link'><span>Explore</span></Link>
                {!currentUser?.isSeller && <span>Become a Seller</span>}
                { currentUser ? (
                    <div className="user" onClick={() => setOpen(!open)} >
                      <img src={currentUser.img || "/img/noavatar.jpg"} alt="" />
                      <span>{currentUser?.username}</span>
                      {open && (
                        <div className="options" onMouseLeave={() => setTimeout(() => setOpen(false), 700)}>
                          {currentUser.isSeller && (
                            <>
                              <Link className="link" to="/mygigs">
                                <span>Manage Gigs</span>
                              </Link>
                              <Link className="link" to="/add">
                                <span>Add New Gig</span>
                              </Link>
                            </>
                          )}
                          {currentUser.isAdmin && (
                            <>
                              <Link className='link' to={`/admin/`}>
                                <span>Administrator Controls</span>
                              </Link>
                            </>
                          )}
                          {!currentUser.isAdmin && (
                            <>
                              <Link className="link" to="/orders">
                                <span>Orders</span>
                              </Link>
                              <Link className="link" to="/messages">
                                <span>Messages</span>
                              </Link>
                            </>
                          )}
                          {currentUser?.isAdmin && 
                            <Link className='link' to={`/admin/orders`}>
                              <span>Orders</span>
                            </Link>
                          }
                          <Link className="link" to={`/users/profile/${currentUser._id}/`}>
                            <span>Profile</span>
                          </Link>
                          <Link className="link" onClick={handleLogout}>
                            <span>Logout</span>
                          </Link>
                        </div>
                      )}
                    </div>
                  ) : (
                    <>
                      <Link to="/login" className="link">
                        <span>Sign in</span>
                      </Link>
                      <Link className="link" to="/register">
                        <button className={(active || pathname !== "/") ? "active" : ""}>Join</button>
                      </Link>
                    </>
                  )
                }

            </div>
        </div>

        {(active || pathname !== "/") && (
          <>
            <hr />
            <div className="menu">
                <Link className='link' to="/gigs">
                  Graphic & Design 
                </Link> 
                <Link className='link' to="/gigs">
                  Photography
                </Link> 
                <Link className='link' to="/gigs">
                  Video & Animation
                </Link> 
                <Link className='link' to="/gigs">
                  Music & Audio
                </Link> 
                <Link className='link' to="/gigs">
                  Business
                </Link> 
                <Link className='link' to="/gigs">
                  Programming & Tech
                </Link> 
                <Link className='link' to="/gigs">
                  Digital Marketing
                </Link> 
            </div>
            <hr />
          </>
        )}
    </div>
  )
}

export default Navbar