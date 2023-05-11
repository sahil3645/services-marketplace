import React from 'react'
import "./GigCard.scss"
import { Link } from 'react-router-dom'

const GigCard = ({item}) => {

  return (
    <Link to={`/gig/${item._id}`} className='link'>
        <div className='gigCard'>
            <img src={item.cover} alt="" />
            <div className="info">
                <div className="user">
                    <img src={item.img || "/img/noavatar.jpg"} alt="" />
                    <span>{item.username}</span>
                </div>
                <p>{item.title}</p>
                <div className="star">
                    <img src="/img/star.png" alt="star-img" />
                    <span>
                        {!isNaN(Math.round(item.totalStars/item.starNumber)) 
                            && (Math.round(item.totalStars/item.starNumber))}
                        {isNaN(Math.round(item.totalStars/item.starNumber))
                            && "Not rated yet"}
                    </span>
                </div>
            </div>
            <hr />
            <div className="details">
                <img src="/img/favourite.png" alt="favourite-img" />
                <div className="price">
                    <span>STARTING AT</span>
                    <h2>{item.price} INR</h2>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default GigCard