import React, { useEffect } from 'react'
import "./Gigs.scss"
import { useState, useRef } from 'react';
import GigCard from "../../components/gigCard/GigCard"
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest.js';
import { Link, useLocation } from 'react-router-dom';

const Gigs = () => {

  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("sales");
  const minRef = useRef();
  const maxRef = useRef();

  const {search} = useLocation();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs"],
    queryFn: () => 
      newRequest
        .get(
          // `/gigs/?${search ? `search=${search}&` : ''}${minRef.current?.value ? `min=${minRef.current.value}&` : ''}${maxRef.current?.value ? `max=${maxRef.current.value}&` : ''}sort=${sort}`
          // `/gigs/?${search ? `search=${search}&` : ''}${minRef.current?.value ? `min=${minRef.current.value}&` : ''}${maxRef.current?.value ? `max=${maxRef.current.value}&` : ''}${sort ? `sort=${sort}` : ''}`
          // `/gigs/?${minRef.current?.value ? `min=${minRef.current.value}&` : ''}${maxRef.current?.value ? `max=${maxRef.current.value}&` : ''}${sort ? `sort=${sort}` : ''}`
          `/gigs/?${minRef.current?.value ? `min=${minRef.current.value}&` : ''}${maxRef.current?.value ? `max=${maxRef.current.value}&` : ''}${sort ? `sort=${sort}` : ''}`
        ).then((res) => {
          return res.data;
        }),
  })

  // console.log(data);

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  useEffect(() => {
    refetch();
  }, [sort]);

  const apply = () => {
    refetch();
  };

  return (
    <div className='gigs'>
      <div className="container">
        <Link className="link" to={`/`}>
          <span className="breadcrumbs">SERVICESMART {">"}</span>
        </Link>
        <h1>Services Available</h1>
        <p>Explore the depth of work with our Professional Service Providers</p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="text" placeholder='min' />
            <input ref={maxRef} type="text" placeholder='max' />
            <button onClick={apply}>Apply</button>
          </div>
          <div className="right">
            <span className='sortBy'>Sort by</span>
            <span className='sortType'>{sort === "sales" ? "Best Selling" : "Newest"}</span>
            <img 
              src="/img/down-arrow.png" 
              alt="drop-down-arrow-img"
              onClick={() => setOpen(!open)}
            />
            {open && (
              <div className="rightMenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                  ) : ( 
                  <span onClick={() => reSort("sales")}>Best Selling</span>
                )}
                <span onClick={() => reSort("sales")}>Popular</span>
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {isLoading ? "loading" : error ? "Something went wrong!" : data.map(gig => (
            <GigCard key={gig._id} item={gig} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Gigs