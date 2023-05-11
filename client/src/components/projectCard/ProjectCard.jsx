import React from 'react'
import "./ProjectCard.scss"
import { Link } from 'react-router-dom'

const ProjectCard = ({item}) => {
  return (
    <Link to={`/gig/${item._id}`} className='link'>
      <div className='projectCard'>
        <img src={item?.cover} alt="" />
        <div className="info">
          <div className="user">
            <img src="/img/noavatar.jpg" alt="" />
            <h2>{item?.username}</h2>
          </div>
          <div className="texts">
            <span>{item?.title?.substring(0, 200)}</span>
            <h2>INR {item?.price}</h2>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProjectCard