import React from 'react'
import { useLocation } from 'react-router-dom'

const UpdatePost = () => {
    const location  = useLocation();
    const post = location?.state;
  return (
    <div>
        <p>this is post update {post.content}</p>
    </div>
  )
}

export default UpdatePost