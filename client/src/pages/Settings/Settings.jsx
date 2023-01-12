import React, { useState } from 'react'
import Sidebar from "./../../components/SideBar/SideBar"
import {FaUserCircle} from "react-icons/fa"
import "./Settings.css"
import {useContext} from 'react'
import {Context} from '../../context/Context'
import axios from 'axios'

const Settings = () => {

    const PF = "http://localhost:5000/images/";

    let [file,
        setFile] = useState(null);
    let [username, setUsername] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [success, setSuccess] = useState(false);
    const {user, dispatch} = useContext(Context);

    const handleSubmit = async(e) => {
        e.preventDefault();
        // setSuccess(false);
        dispatch({ type: "UPDATE_START" });

        const updatedUser = {
            userId: user._id,
            username,
            email,
            password,
        };

        let data;

        if (file) {
            data = new FormData();
            // Date.now() +
            const filename = file.name;
            data.append("name", filename);
            data.append("file", file);
            updatedUser.profilePic = filename;
        }

        try {
            await axios.post("http://localhost:5000/api/upload", data);
        } catch (error) {
            console.log(error);
        }

        try {
            
            const res = await axios.put(`http://localhost:5000/api/users/${user._id}`, updatedUser);
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
            setSuccess(true);
        } catch (error) {
            console.log(error);
            dispatch({ type: "UPDATE_FAILURE" });
        }
    };

    return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Update Your Account</span>
                    <span className="settingsDeleteTitle">Delete Account</span>
                </div>
                <form className="settingsForm" onSubmit={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className="settingsPP">
                        <img src={file ? URL.createObjectURL(file) : `${PF}${user?.profilePic}`} alt="profile pic"/>
                        <label htmlFor="fileInput">
                            <div className='settingsPPIcon'>
                                <FaUserCircle color="white" size={30}/>
                            </div>
                        </label>
                        <input
                            onChange={(e) => setFile(e.target.files[0])}
                            type="file"
                            id="fileInput"
                            style={{
                            display: "none"
                        }}/>
                    </div>
                    <label>Username</label>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder={user.username}/>
                    <label>Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder={user.email}/>
                    <label>Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password"/>
                    <button className="settingsSubmit" type='submit'>Update</button>
                    {success && <span style={{color: "green", textAlign: "center", marginTop: "20px"}}>Profile has been updated...</span>}
                </form>
            </div>
            <Sidebar/>
        </div>
    );
}

export default Settings