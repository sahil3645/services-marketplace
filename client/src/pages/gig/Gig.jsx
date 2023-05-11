import React, { useEffect, useState } from 'react'
import "./Gig.scss"
import { Slider } from 'infinite-react-carousel'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest.js'
import Reviews from '../../components/reviews/Reviews'
import getCurrentUser from "../../utils/getCurrentUser.js"

const Gig = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const [err, setErr] = useState(null);
  const [errConinue, setErrContinue] = useState(null);
  const currentUser = getCurrentUser();


  const { isLoading, error, data } = useQuery({
    queryKey: ["gig", id],
    queryFn: () => 
      newRequest.get( `/gigs/single/${id}`).then((res) => {
          return res.data;
        }),
  })

  const userId = data?.userId;
  
  const { isLoading: isLoadingUser, error: errorUser, data: dataUser } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => 
      newRequest.get( `/users/${userId}`).then((res) => {
          return res.data;
        }),
    
    enabled: !!userId,
  })

  // console.log(dataUser)

  const handleContinue = async () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 5000);
    
    try {
      const res = await newRequest.get(`/auth/check`);
      navigate(`/pay/${id}`);
    } catch (err) {
      setErrContinue(err.response.data);
    }

  };

  const handleContact = async () => {
    const sellerId = data?.userId;
    const buyerId = currentUser?._id;
    const id = sellerId + buyerId;

    try {
      const res = await newRequest.get(`/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      if(err.response.status === 404) {
        const res = await newRequest.post(`/conversations`, {
          to: sellerId,
          sellerUsername: data.username, 
          buyerUsername: currentUser.username,
        });

        navigate(`/message/${res.data.id}`);
      }

      setErr(err.response.data);
    }
  };



  return (
    <div className='gig'>
      {isLoading ? "loading" : error ? "Something went wrong!" : <div className="container">
        <div className="left">
          <Link to={`/gigs`} className='link'>
            <span className='breadCrumbs'> SERVICESMART {">"} {data.cat.toUpperCase()} {">"}</span>
          </Link>
          <h1>{data.title}</h1>
          {isLoadingUser ? "loading" : errorUser ? "Something went wrong!" : <div className="user">
            <img 
              className='pp'
              src={dataUser.img || "/img/noavatar.jpg"}
              alt="" />
            <span>{dataUser.username}</span>
            {!isNaN(data.totalStars/data.starNumber) &&
              <div className='stars'>
                {Array(Math.round(data.totalStars/data.starNumber))
                  .fill()
                  .map((item, i) => (
                    <img src="/img/star.png" alt="" key={i}/>
                  ))}
                <span>
                  {Math.round(data.totalStars/data.starNumber)}
                </span>
              </div>
            }
          </div>}
          <Slider slideToShow={1} arrowsScroll={1} className='slider'>
            {data.images.map(img =>  (
              <img 
                key={img}
                src={img} 
                alt="gig-image" 
              /> 
            ))}
          </Slider>
          <h2>About This Service</h2>
          <p>
              {data.desc}
          </p>
          {isLoadingUser ? "loading" : errorUser ? "Something went wrong!" : (<div className="seller">
            <h2>About The Seller</h2>
            <div className="user">
              <img src={dataUser.img || "/img/noavatar.jpg"} alt="user-img" />
              <div className="info">
                <span>{dataUser.username}</span>
                {!isNaN(data.totalStars/data.starNumber) &&
                <div className="stars">
                {Array(Math.round(data.totalStars/data.starNumber))
                  .fill()
                  .map((item, i) => (
                    <img src="/img/star.png" alt="" key={i}/>
                  ))}
                  <span>
                    {Math.round(data.totalStars/data.starNumber)}
                  </span>
                </div>}
                <button 
                  onClick={() => handleContact()}
                >
                  Contact Me
                </button>
                {err && err}
              </div>
            </div>
            <div className="box">
              <div className="items">
                <div className="item">
                  <span className="title">From</span>
                  <span className="desc">{dataUser.country.toUpperCase()}</span>
                </div>
                <div className="item">
                  <span className="title">Avg. response time</span>
                  <span className="desc">1 Hour</span>
                </div>
                <div className="item">
                  <span className="title">Last delivery</span>
                  <span className="desc">1 day</span>
                </div>
                <div className="item">
                  <span className="title">Languages</span>
                  <span className="desc">English</span>
                </div>
              </div>
              <hr />
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error excepturi iste fugiat, blanditiis aperiam recusandae consequatur. Atque cupiditate vitae error pariatur laboriosam. Facilis molestias nemo repudiandae officiis laudantium, assumenda explicabo qui obcaecati ad unde, ducimus reiciendis? Provident, cupiditate. Eum animi, quos alias consequuntur magni doloremque tenetur est commodi saepe amet.
              </p>
            </div>
          </div>)}
          <Reviews gigId={id}/>
        </div>
        <div className="right">
          <div className="price">
            <h3>{data.shortTitle}</h3>
            <h2>INR {data.price}</h2>
          </div>
          <p>{data.shortDesc}</p>
          <div className="details">
            <div className="item">
              <img src="/img/clock.png" alt="clock-img" />
              <span>{data.deliveryTime} Days Delivery</span>
            </div>
            <div className="item">
              <img src="/img/recycle.png" alt="revision-img" />
              <span>{data.revisionNumber} Revisions</span>
            </div>
          </div>
          <div className="features">
            {data.features.map((feature) => (
              <div className="item" key={feature}>
                <img src="/img/greencheck.png" alt="green-check-img" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
          {/* <Link to={`/pay/${id}`}><button>Continue</button></Link> */}
          <button onClick={handleContinue} disabled={isClicked}>Continue</button>
          {errConinue && errConinue}
        </div>
      </div>}
    </div>
  )
}

export default Gig