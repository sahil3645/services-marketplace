import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./Featured.scss"

const Featured = () => {

    const [input, setInput] = useState("");
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate(`/gigs?${input}`)
    }

  return (
    <div className='featured'>
        <div className="container">
            <div className="left">
                <h1>Find the best freelance services today!</h1>
                <div className="search">
                    <div className="searchInput">
                        <img src="/img/search.png" alt="search-image" />
                        <input 
                            type="text" 
                            placeholder='e.g. I want to build a website' 
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </div>
                    <button onClick={handleSubmit}>Search</button>
                </div>
                    <div className="popular">
                        <span>Popular &nbsp; : &nbsp;</span>
                        <button>Photography</button>
                        <button>Web Design</button>
                        <button>Programming</button>
                    </div>
                </div>  
            <div className="right">
                {/* <img src="/img/person.png" alt="person-image" /> */}
            </div>
        </div>
    </div>
  )
}

export default Featured