import React from 'react'
import "./Admin.scss"
import { Link, useNavigate } from 'react-router-dom'
import {useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import newRequest from "../../utils/newRequest.js"
import getCurrentUser from '../../utils/getCurrentUser.js'

const Admin = () => {

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const currentUser = getCurrentUser();

  const { data: users, isLoading, error } = useQuery(['users'], () =>
    newRequest.get('/admin/').then((res) => res.data)
  );

  const blockUser = useMutation(async (userId) => {
    const response = await newRequest.patch(`/admin/block/${userId}`);
    return response.data;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    },
  });
  
  const removeUser = useMutation(async (userId) => {
    const response = await newRequest.delete(`/admin/delete/${userId}`);
    return response.data;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    },
  });
  
  return (
    <div className='admin'>
        {isLoading ? "loading" : error ? "error" : <div className="container">
        <div className="title">
          <h1>Users</h1>
        </div>
        <table>
          <tr>
            <th>User ID</th>
            <th>Username</th>
            <th>Account Type</th>
            <th>Account Status</th>
            <th>Block User</th>
            <th>Remove User</th>
          </tr>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                <Link to={`/admin/${user._id}`} className='link'>
                  {user._id.toUpperCase()}
                </Link>
              </td>
              <td>{user.username}</td>
              <td>{user?.isSeller ? "Seller" : "Buyer"}</td>
              <td>
                {user.status}
              </td>
              <td>
                  <button 
                    onClick={() => blockUser.mutate(user._id)}
                    disabled={user?.isAdmin}
                  >
                  {user?.isBlocked ? "Unblock" : "Block"}
                  </button>
              </td>
              <td>
                  <button 
                    onClick={() => removeUser.mutate(user._id)}
                    disabled={!user?.isBlocked}
                  >
                  Remove
                  </button>
              </td>
            </tr>
          ))}
        </table>
        <div className="orders">
          {/* <button>
              Show Orders
          </button> */}
        </div>
      </div>}
    </div>
  )
}

export default Admin