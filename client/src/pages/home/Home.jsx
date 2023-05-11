import React from 'react'
import Featured from '../../components/featured/Featured'
import Slide from '../../components/slide/Slide'
import "./Home.scss"
import CatCard from '../../components/catCard/CatCard'
import ProjectCard from '../../components/projectCard/ProjectCard'
import { useQuery } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest.js'

const Home = () => {

  const { isLoading, error, data: gigs, refetch } = useQuery({
    queryKey: ["gigs"],
    queryFn: () => 
      newRequest
        .get(
          `/gigs/`
        ).then((res) => {
          return res.data;
        }),
  })

  return (
    <div className='home'>
      <Featured />
      {/* <Slide slidesToShow={5} arrowsScroll={5}>
        {cards.map(card => (
          <CatCard key={card.id} item={card} />
        ))}
      </Slide> */}
      <div className="features">
        <div className="container">
          <div className="item">
            <h1>Freelance Services at your fingertips</h1>
            <div className="title">
              #1  Freelance Platform
            </div>
            <p>Connecting with Freelancers easier than ever</p>
            <div className="title">
              Contact. Order. And Get It Done.
            </div>
            <p>Verified freelancers with professional skills</p>
          </div>
          <div className="item">
            <img src="/img/explore.jpg" alt="home-features-img" />
          </div>
        </div>
      </div>
      {isLoading ? "loading" : error ? "error" : (
        <Slide slidesToShow={3} arrowsScroll={3}>
          {gigs?.map(card => (
              <ProjectCard key={card.id} item={card} />
          ))}
        </Slide>
      )}
    </div>
  )
}

export default Home