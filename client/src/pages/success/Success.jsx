import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import newRequest from '../../utils/newRequest.js';
import './Success.scss';

const Success = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const payment_intent = params.get('payment_intent');

  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await newRequest.patch('/orders', { payment_intent });
        setTimeout(() => {
          navigate('/orders');
        }, 5000);
      } catch (err) {
        console.log(err);
      }
    };

    makeRequest();
  // }, [navigate, payment_intent]);
  }, []);

  useEffect(() => {
    const timer =
      countdown > 0 && setInterval(() => setCountdown(countdown - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <div className="success-container">
      <p>Payment Successful! You will be redirected to the orders page shortly.</p>
      <div className="countdown-container">
        <p className="countdown">Redirecting...</p>
      </div>
    </div>
  );
};

export default Success;


