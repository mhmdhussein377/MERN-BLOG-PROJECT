import axios from 'axios';
import React, {useState} from 'react'
import {useEffect} from 'react';
import {AiFillFacebook, AiFillTwitterSquare} from "react-icons/ai";
import {FaInstagramSquare, FaPinterestSquare} from "react-icons/fa";
import {Link} from 'react-router-dom';
import "./SideBar.css"

const SideBar = () => {

    const [categories,
        setCategories] = useState([]);

    useEffect(() => {
        const getCategories = async() => {
            const res = await axios.get("http://localhost:5000/api/categories");
            setCategories(res.data);
        };
        getCategories();
    }, []);

    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT ME</span>
                <img
                    src="https://i.pinimg.com/236x/1e/3f/58/1e3f587572a7a7b20bbf1828595a1786--holiday-party-themes-holiday-gift-guide.jpg"
                    alt="/"/>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, unde. Ipsum
                    repellat vitae, blanditiis cumque consequuntur quaerat ad minus nesciunt!
                </p>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORIES</span>
                <ul className="sidebarList">
                    {categories.map((category, index) => (
                        <Link to={`/?category=${category.name}`} key={index}>
                            <li className="sidebarListItem">
                                {category.name}
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">FOLLOW US</span>
                <div className="sidebarSocial">
                    <AiFillFacebook
                        style={{
                        marginRight: "10px",
                        cursor: "pointer",
                        color: "#444"
                    }}
                        size={25}/>
                    <FaInstagramSquare
                        style={{
                        marginRight: "10px",
                        cursor: "pointer",
                        color: "#444"
                    }}
                        size={25}/>
                    <FaPinterestSquare
                        style={{
                        marginRight: "10px",
                        cursor: "pointer",
                        color: "#444"
                    }}
                        size={25}/>
                    <AiFillTwitterSquare
                        style={{
                        marginRight: "10px",
                        cursor: "pointer",
                        color: "#444"
                    }}
                        size={25}/>
                </div>
            </div>
        </div>
    );
}

export default SideBar