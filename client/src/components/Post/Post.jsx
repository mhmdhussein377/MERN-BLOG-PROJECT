import React from 'react'
import {Link} from 'react-router-dom';
import "./Post.css"

const Post = ({
    _id,
    title,
    desc,
    createdAt,
    photo,
    categories,
}) => {

    console.log(photo)

    return (
        <Link to={`/post/${_id}`}>
            <div className="post">
                {photo && (<img
                    className="postImg"
                    src={`http://localhost:5000/images/${photo}`}
                    alt="/"/>)}
                <div className="postInfo">
                    <div className="postCategories">
                        {categories.map((category, index) => (
                            <span className="postCategory" key={index}>
                                {category.name}
                            </span>
                        ))}
                    </div>
                    <Link to={`/post/${_id}`}>
                        <span className="postTitle">{title}</span>
                    </Link>
                    <hr/>
                    <span className="postDate">
                        {new Date(createdAt).toDateString()}
                    </span>
                    <p className="postDesc">{desc}</p>
                </div>
            </div>
        </Link>
    );
}

export default Post