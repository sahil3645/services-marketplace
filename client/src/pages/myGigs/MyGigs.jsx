import React from 'react'
import "./MyGigs.scss"
import { Link } from 'react-router-dom'
import getCurrentUser from "../../utils/getCurrentUser.js"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest.js'
import moment from "moment"

const MyGigs = () => {

  const currentUser = getCurrentUser();
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["myGigs"],
    queryFn: () => 
      newRequest.get(`/gigs?userId=${currentUser._id}`).then((res) => {
          return res.data;
        }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/gigs/${id}`)
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"])
    }
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  }

  const { isLoadingOrders, errorOrders, data: orders } = useQuery({
    queryKey: ["orders"],
    queryFn: () => 
      newRequest
        .get(
          `/orders`
        ).then((res) => {
          return res.data;
        }),
  })

  return (
    <div className='myGigs'>
      {isLoading ? "loading" : error ? "error" : <div className="container">
        <div className="top">
          <div className="title">
            <h1>My Gigs</h1>
            <Link to="/add">
              <button>Add a New Gig</button>
            </Link>
          </div>
          <table>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Orders</th>
              <th>Earnings</th>
              <th>Action</th>
            </tr>
            {data.map(gig => (
              <tr key={gig._id}>
                <td>
                  <img
                    src={gig.cover}
                    alt="gig-img"
                    className='img'
                  />
                </td>
                <td>
                  <Link className='link' to={`/gig/${gig._id}`}>
                    {gig.title}
                  </Link>
                </td>
                <td>{gig.price}</td>
                <td>{gig.sales}</td>
                <td>{gig.price * gig.sales}</td>
                <td>
                  <img
                    src="/img/delete.png"
                    alt="delete-img"
                    className='delete'
                    onClick={() => handleDelete(gig._id)}
                  />
                </td>
              </tr>
            ))}
          </table>
        </div>
        <div className="bottom">
          <div className="title">
            <h1>Earnings</h1>
          </div>
          <div className="revenue">
            <h3>Earnings to date</h3>
            <h2>INR {orders?.reduce((acc, order) => acc + order.price, 0)}</h2>
          </div>
          {isLoadingOrders ? "loading" : errorOrders ? "error" : (
            <table>
              <tr>
                <th>Date</th>
                <th>Gig</th>
                <th>From Buyer</th>
                <th>Order ID</th>
                <th>Amount</th>
              </tr>
              {orders?.reverse().map(order => (
              <tr key={order._id}>
                <td>
                {moment(order?.date).format("MMM D, YYYY")}
                </td>
                <td>{order?.title}</td>
                <td>{order?.buyerUsername}</td>
                <td>
                  <Link to={`/orders/${order._id}/info`} className='link'>
                    {order?._id.toUpperCase()}
                  </Link>
                </td>
                <td>{order?.price}</td>
              </tr>
              ))}
            </table>
          )}
        </div>
      </div>}
    </div>
  )
}

export default MyGigs