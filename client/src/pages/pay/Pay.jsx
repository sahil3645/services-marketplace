import React, { useState,  useEffect } from 'react'
import "./Pay.scss"
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import newRequest from '../../utils/newRequest.js';
import { useParams } from 'react-router-dom';
import CheckoutForm from '../../components/checkoutForm/CheckoutForm';

const stripePromise = loadStripe("pk_test_51N1iopSFBrUxOdovoscQmzxzomsamzMQtUZqmISpsZvAABT7lmhxaxHZ0IFwxrsW51nqtmyV1ZTfjEvbsk0XTjf7000HAt8SrZ");

const Pay = () => {


  const [clientSecret, setClientSecret] = useState("");

  const { id }= useParams();
  // console.log('Pay component rendered with id:', id);

  useEffect(() => {
    // console.log('useEffect called');
    const makeRequest = async () => {
      // console.log("Sending request to server...");
        try {
           const res = await newRequest.post(`/orders/create-payment-intent/${id}`);
           setClientSecret(res.data.clientsecret);
        } catch (err) {
           console.log(err);
        }
    }

    if(id) {
      makeRequest();
    }
  }, [id]);
    
  const appearance = {
    theme: 'stripe',
  };

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe',
    },
  };


  return (
    <div className='pay'>
      {!clientSecret ? (
      <div>Loading...</div>
    ) : (
      <Elements options={options} stripe={stripePromise}>
        <CheckoutForm client_secret={clientSecret} />
      </Elements>
    )}
    </div>
  )
}

export default Pay