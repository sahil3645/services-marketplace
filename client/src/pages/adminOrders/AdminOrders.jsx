import React from 'react'
import "./AdminOrders.scss"
import { useQuery, useQueryClient } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest.js'
import { Link } from 'react-router-dom'

const AdminOrders = () => {

  const { isLoading, error, data: orders } = useQuery({
    queryKey: ["orders"],
    queryFn: () => 
      newRequest
        .get(
          `/admin/orders/get`
        ).then((res) => {
          return res.data;
        }),
  })

  return (
    <div className='adminOrders'>
        {isLoading ? "loading" : error ? "error" : <div className="container">
        <div className="title">
          <h1>Orders</h1>
        </div>
        <table>
          <tr>
            <th>Seller</th>
            <th>Buyer</th>
            <th>Title</th>
            <th>Price</th>
            <th>Order ID</th>
            <th>Order Status</th>
            <th>Delivery Status</th>
          </tr>
          {orders.reverse().map((order) => (
            <tr key={order._id}>
              <td>{order.sellerUsername}</td>
              <td>{order.buyerUsername}</td>
              <td>
                <Link to={`/gig/${order.gigId}`} className='link'>
                  {order?.title?.substring(0,50)}...
                </Link>
              </td>
              <td>{order.price}</td>
              <td>
                <Link to={`/orders/${order._id}/info`} className='link'>
                  {order._id.toUpperCase()}
                </Link> 
              </td>
              <td>{order.status}</td>
              <td>{order.deliveryStatus}</td>
            </tr>
          ))}
        </table>
      </div>}
    </div>
  )
}

export default AdminOrders