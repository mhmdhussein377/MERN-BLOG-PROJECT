import React, {useContext, useState} from 'react'
import {MdDeleteOutline} from "react-icons/md"
import {AiOutlineEdit} from "react-icons/ai"
import "./SinglePost.css"
import {Link, redirect, Route, useNavigate, useLocation} from 'react-router-dom';
import {Context} from '../../context/Context';
import axios from 'axios';
import Home from '../../pages/Home/Home';

const SinglePost = ({
    _id,
    title,
    desc,
    createdAt,
    photo,
    username,
    categories,
    inputTitle,
    setInputTitle,
    inputDesc,
    setInputDesc
}) => {

    const [updateMode,
        setUpdateMode] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const {user} = useContext(Context);

    let handleDelete = async() => {
        try {
            await axios.delete(`http://localhost:5000/api/posts/${_id}`, {
                data: {
                    username: user
                        ?.username
                }
            });
            navigate("/");
            // window     .location     .replace("/");
        } catch (error) {
            console.log(error.response.data)
        }
    }

    let handleUpdate = async() => {
        try {
            await axios.put(`http://localhost:5000/api/posts/${_id}`, {
                title: inputTitle,
                desc: inputDesc,
                username: user.username
            });
            setUpdateMode(false);
        } catch (error) {
            console.log(error.response.data);
        }
    }

    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                {photo && (<img
                    className="singlePostImg"
                    src={`http://localhost:5000/images/${photo}`}
                    alt="/"/>)}
                <div className="title-icons">
                    {updateMode
                        ? (<input
                            autoFocus
                            type="text"
                            value={inputTitle}
                            onChange={(e) => setInputTitle(e.target.value)}
                            className="singlePostTitleInput"/>)
                        : ( <> <h1 className="singlePostTitle">{inputTitle}</h1>
                            {
                            username === user
                                ?.username && (
                                    <div className="icons">
                                        <AiOutlineEdit onClick={() => setUpdateMode(true)} size={25} color="teal"/>
                                        <MdDeleteOutline onClick={handleDelete} size={25} color="tomato"/>
                                    </div>
                                )
                        } </>
            )}
                </div>
                <div className="singlePostInfo">
                    <span className="singlePostAuthor">
                        Author:
                        <Link to={`/?user=${username}`}>
                            <b>{username}</b>
                        </Link>
                    </span>
                    <span className="singlePostDate">
                        {new Date(createdAt).toDateString()}
                    </span>
                </div>
                {updateMode
                    ? <textarea
                            value={inputDesc}
                            onChange={(e) => setInputDesc(e.target.value)}
                            className='singlePostDescInput'/>
                    : <p>{inputDesc}</p>}
                {updateMode && <button className='singlePostButton' onClick={handleUpdate}>Update</button>}
            </div>
        </div>
    );
};

export default SinglePost