import React, { useEffect } from 'react';
import "./OrderInfo.scss"
import { Link, useLocation, useParams } from 'react-router-dom';
import newRequest from '../../utils/newRequest.js';
import { useQuery } from '@tanstack/react-query';

const OrderInfo = () => {
  const { id } = useParams();

  const { isLoading, error, data: order } = useQuery( ['order', id], () => 
      newRequest.get(`/orders/${id}/info`).then((res) => res.data),
  );

  const formattedDate = new Date(order?.date).toLocaleString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    // timeZone: true,
  });


  return (
    <div className="orderInfo">
      <div className="card">
        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : error ? (
          <div className="error">Error: {error.message}</div>
        ) : (
          <>
            <Link className="link" to={`/orders`}>
              <h1>Order Detail</h1>
            </Link>
            <div className="card-item">
              <span>Order ID :</span> {order._id.toUpperCase()}
            </div>
            <div className="card-item">
              <span>Gig ID :</span> {order.gigId.toUpperCase()}
            </div>
            <div className="card-item">
              <span>Title :</span> {order.title}
            </div>
            <div className="card-item">
              <span>Price :</span> {order.price} INR
            </div>
            <div className="card-item">
              <span>Order Confirmed :</span>{' '}
              {order.isConfirmed ? 'Yes' : 'No'}
            </div>
            <div className="card-item">
              <span>Payment Intent :</span> {order.payment_intent}
            </div>
            <div className="card-item">
              <span>Seller Username :</span> {order.sellerUsername}
            </div>
            <div className="card-item">
              <span>Buyer Username :</span> {order.buyerUsername}
            </div>
            <div className="card-item">
              <span>Order Status :</span> {order.status}
            </div>
            <div className="card-item">
              <span>Accepted by Buyer :</span>{' '}
              {order.acceptedByBuyer ? 'Yes' : 'No'}
            </div>
            <div className="card-item">
              <span>Delivered by Seller:</span>{' '}
              {order.deliveredBySeller ? 'Yes' : 'No'}
            </div>
            <div className="card-item">
              <span>Delivery Status :</span> {order.deliveryStatus}
            </div>
            <div className="card-item">
              <span>Created At :</span> {formattedDate}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderInfo;