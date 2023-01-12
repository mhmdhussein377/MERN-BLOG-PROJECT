import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from "../../components/SideBar/SideBar";
import SinglePost from '../../components/SinglePost/SinglePost';
import "./Single.css"

const Single = () => {

    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState([]);
    const [inputTitle, setInputTitle] = useState("");
    const [inputDesc, setInputDesc] = useState("");

    useEffect(() => {
        const fetchPost = async () => {
            const res = await axios.get(`http://localhost:5000/api/posts/${path}`);
            setPost(res.data);
            setInputTitle(res.data.title);
            setInputDesc(res.data.desc);
        };
        fetchPost();
        window.scrollTo(0, 0)
    }, [path]);

    return (
        <div className='single'>
            <SinglePost {...post} path={path} inputTitle={inputTitle} inputDesc={inputDesc} setInputTitle={setInputTitle} setInputDesc={setInputDesc} />
            <Sidebar />
        </div>
    )
}

export default Single