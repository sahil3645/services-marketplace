import React, { useState } from 'react'
import Review from '../review/Review'
import "./Reviews.scss"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest.js'

const Reviews = ({gigId}) => {

  const [err, setErr] = useState(null);
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews"],
    queryFn: () => 
      newRequest.get(`/reviews/${gigId}`).then((res) => {
          return res.data;
        }),
  })

  const mutation = useMutation({
    mutationFn: (review) => {
      return newRequest.post(`/reviews`, review)
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"])
    },

    onError: (error) => {
      setErr(error.response.data);
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    const desc = e.target[0].value;
    const star = e.target[1].value;
    mutation.mutate({gigId, desc, star});
  }

  return (
    <div className='reviews'>
        <h2>Reviews</h2>
        {isLoading ? "loading" : error ? "Something went wrong!" : data.map((review) => (
          <Review key={review._id} review={review}/> 
        ))}

        <div className="add">
          <h3>Add a review</h3>
          <form action="" className='addForm' onSubmit={handleSubmit}>
            <input 
              placeholder='write a review'
              type="text" 
              name="" 
              id="" 
            />
            <select name="" id="">
              <option value={1}>1 - Poor</option>
              <option value={2}>2 - Fair</option>
              <option value={3}>3 - Good</option>
              <option value={4}>4 - Very Good</option>
              <option value={5}>5 - Excellent</option>
            </select>
            <button type='submit'>Submit</button>
            {err && err}
          </form>
        </div>
    </div>
  )
}

export default Reviews