import React, { useEffect, useState } from 'react'
import "./Orders.scss"
import { Link, useNavigate } from 'react-router-dom'
import {useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import newRequest from "../../utils/newRequest.js"

const Orders = () => {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () => 
      newRequest
        .get(
          `/orders`
        ).then((res) => {
          return res.data;
        }),
  })

  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;

    try {
      const res = await newRequest.get(`/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      if(err.response.status === 404) {
        const res = await newRequest.post(`/conversations`, {
          to: currentUser.isSeller ? buyerId : sellerId,
          sellerUsername: currentUser.isSeller? currentUser.username : order.sellerUsername,
          buyerUsername: currentUser.isSeller?  currentUser.username : order.buyerUsername,
        });

        navigate(`/message/${res.data.id}`);
      }
    }
  };

  const acceptOrderMutation = useMutation(
    (order) => newRequest.patch(`/orders/${order._id}/accept`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('orders');
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
  
  const deliverOrderMutation = useMutation(
    (order) => newRequest.patch(`/orders/${order._id}/deliver`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('orders');
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
  
  const handleAccepted = (order) => {
    acceptOrderMutation.mutate(order);
  };
  
  const handleDelivered = (order) => {
    deliverOrderMutation.mutate(order);
  };

  return (
    <div className='orders'>
      {isLoading ? "loading" : error ? "error" : <div className="container">
        <div className="title">
          <h1>Orders</h1>
        </div>
        <table>
          <tr>
            <th>{currentUser?.isSeller ? "Buyer" : "Seller"}</th>
            <th>Title</th>
            <th>Price</th>
            <th>Order ID</th>
            <th>Contact</th>
            <th>Order Status</th>
            <th>Delivery Status</th>
            <th>{currentUser?.isSeller ? "Deliver Order" : "Accept Delivery"}</th>
          </tr>
          {data.reverse().map((order) => (
            <tr key={order._id}>
              <td>{currentUser?.isSeller ? order.buyerUsername : order.sellerUsername}</td>
              <td>
                <Link to={`/gig/${order.gigId}`} className='link'>
                  {order.title.substring(0,50)}...
                </Link>
              </td>
              <td>{order.price}</td>
              <td>
                <Link to={`/orders/${order._id}/info`} className='link'>
                  {order._id.toUpperCase()}
                </Link> 
              </td>
              <td>
                <div className="message-div">
                  <img
                    src="/img/message.png"
                    alt="message-img"
                    className='message'
                    onClick={() => handleContact(order)}
                  />
                </div>
              </td>
              <td>{order.status}</td>
              <td>{order.deliveryStatus}</td>
              <td>
                {currentUser?.isSeller ? (
                  <button 
                    onClick={() => handleDelivered(order)}
                    disabled={order?.deliveredBySeller}
                  >
                    {order?.deliveredBySeller ? "Delivered" : "Deliver"}
                  </button>) : ( 
                  <button 
                    onClick={() => handleAccepted(order)}
                    disabled={order?.acceptedByBuyer || !order?.deliveredBySeller}
                  >
                    {order?.acceptedByBuyer ? "Accepted" : "Accept"}
                  </button>
                )}
              </td>
            </tr>
          ))}
          
        </table>
      </div>}
    </div>
  )
}

export default Orders