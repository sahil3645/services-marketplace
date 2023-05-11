import React, { useState, useEffect } from 'react'
import newRequest from '../../utils/newRequest.js';
import getCurrentUser from '../../utils/getCurrentUser.js';
import "./Profile.scss"

const Profile = () => {
  
  const currentUser = getCurrentUser();

  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [update, setUpdate] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await newRequest.get(`/users/profile/${currentUser._id}`);
        setUser(response.data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, [currentUser._id, update]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleCurrentPasswordChange = (event) => {
    setCurrentPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await newRequest.patch(`/users/${currentUser._id}`, {
        email,
        currentPassword,
        newPassword,
      });

      console.log(response.data.message);
      setUpdate(!update);
      setError(null);
      setSuccessMessage(response.data.message);
      setTimeout(() =>  setSuccessMessage(null), 3000);
    } catch (err) {
      console.error(err.response.data);
      setError(err.response.data);
    }
  };

  return (
    <div key={update} className='profile'>
      <div className="info">
        <h3>User Information</h3>
        <h2>Username : <span>{user.username}</span></h2>
        <p>Email : {user.email}</p>
        <p>Phone : {user.phone}</p>
        {user?.isSeller ? <p>Seller Account Status : {user?.isSeller ? "Active" : "Not Activated"}</p> : ""}
      </div>
      <div className='update'>
        <h3>Update Profile</h3>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              name='email'
              value={email}
              onChange={handleEmailChange}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='currentPassword'>Current Password*</label>
            <input
              type='password'
              id='currentPassword'
              name='currentPassword'
              value={currentPassword}
              onChange={handleCurrentPasswordChange}
              required
            />
          </div>

          <div className='form-group'>
            <label htmlFor='newPassword'>New Password (if you want to update)</label>
            <input
              type='password'
              id='newPassword'
              name='newPassword'
              value={newPassword}
              onChange={handleNewPasswordChange}
            />
          </div>

          <button type='submit'>Update</button>
          {error && error}
          {successMessage && successMessage}
        </form>
      </div>
    </div>
  )
}

export default Profile