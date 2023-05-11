import React from 'react'
import "./Message.scss"
import { Link, useParams } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest.js'


const Message = () => {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  // console.log(currentUser);

  const {id} = useParams();

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: () => 
      newRequest
        .get(
          `/messages/${id}`
        ).then((res) => {
          return res.data;
        }),
  });

  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post(`/messages`, message);
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["messages"])
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = {
      conversationId: id,
      desc: e.target[0].value,
      username: currentUser.username,
    };
    mutation.mutate(message);
    // mutation.mutate({
    //   conversationId: id,
    //   desc: e.target[0].value,
    // });
    e.target[0].value = "";
  };

  return (
    <div className='message'>
      <div className="container">
        <span className="breadcrumbs">
            <Link to="/messages" className='link'>MESSAGES</Link> {">"}
        </span>
        {isLoading ? "loading" : error ? "error" : <div className="messages">
          {data.map(m => (
            <div className={m.userId === currentUser._id ? "owner item" : "non-owner item"} key={m._id}>
              <div className="left">
                <img src="/img/noavatar.jpg" alt="user1-img" />
                {m.userId !== currentUser._id && <span>{m.username}</span>}
                {m.userId === currentUser._id && <span>{currentUser.username}</span>}
              </div>
              <div className="right">
                <p>
                  {m.desc}
                </p>
              </div>
            </div>
          ))}
        </div>}
        <hr />
        <form className="write" onSubmit={handleSubmit}>
          <textarea name="" placeholder='write a message' id="" cols="30" rows="10"></textarea>
          <button type='submit'>Send</button>
        </form>
      </div>
    </div>
  )
}

export default Message