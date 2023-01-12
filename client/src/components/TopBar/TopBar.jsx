import React from 'react'
import {useContext} from 'react';
import {AiFillFacebook, AiFillTwitterSquare, AiOutlineSearch} from "react-icons/ai";
import {FaInstagramSquare, FaPinterestSquare} from "react-icons/fa";
import {Link} from 'react-router-dom';
import {Context} from '../../context/Context';
import "./TopBar.css"

const TopBar = () => {

    const PF = "http://localhost:5000/images/";

    let {user, dispatch} = useContext(Context);

    const handleLogout = () => {
        dispatch({type: "LOGOUT"})
    }
    return (
        <div className="top">
            <div className="topLeft">
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
            <div className="topCenter">
                <ul className="topList">
                    <li className="topListItem">
                        <Link to="/">HOME</Link>
                    </li>
                    <li className="topListItem">ABOUT</li>
                    <li className="topListItem">CONTACT</li>
                    <li className="topListItem">
                        <Link to="/write">WRITE</Link>
                    </li>
                    <li className="topListItem" onClick={handleLogout}>
                        {user && "LOGOUT"}
                    </li>
                </ul>
            </div>
            <div className="topRight">
                {user
                    ? (
                        <Link to="/settings">
                            <img className="topImg" src={`${PF}${user?.profilePic}`} alt=""/>
                        </Link>
                    )
                    : (
                        <ul className="topList">
                            <li className="topListItem">
                                <Link to="/login">LOGIN</Link>
                            </li>
                            <li className="topListItem">
                                <Link to="/register">REGISTER</Link>
                            </li>
                        </ul>
                    )}
                <AiOutlineSearch className="searchIcon" size={25}/>
            </div>
        </div>
    );
}

export default TopBar