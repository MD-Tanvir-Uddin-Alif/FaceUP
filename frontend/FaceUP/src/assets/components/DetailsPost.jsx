import React from 'react'
import { useLocation } from 'react-router-dom'

const DetailsPost = () => {
    const location = useLocation();
    const post = location?.state;
  return (
    <div>
        <p>
            {post.content}
        </p>
    </div>
  )
}

export default DetailsPost