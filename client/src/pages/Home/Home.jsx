import React, { useState } from 'react'
import { useEffect } from 'react'
import Header from '../../components/Header/Header'
import Posts from '../../components/Posts/Posts'
import SideBar from '../../components/SideBar/SideBar'
import axios from "axios"
import "./Home.css"
import { useLocation } from 'react-router-dom'

const Home = () => {

    let [posts, setPosts] = useState([]);
    const {search} = useLocation();

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get(`http://localhost:5000/api/posts${search}`);
            const data = res.data;
            setPosts(data);
        };
        fetchPosts();
    }, [search]);

    return (
        <div className='Home'>
            <Header />
            <div className="home">
                <Posts posts={posts}/>
                <SideBar />
            </div>
        </div>
    )
}

export default Home