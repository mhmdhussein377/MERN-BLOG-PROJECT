import React from 'react'
import Post from '../Post/Post'
import "./Posts.css"

const Posts = ({posts}) => {
    return (
        <div className="posts">
            {posts.map((post, index) => (
                <Post {...post} key={index} />
            ))}
        </div>
    );
}

export default Posts