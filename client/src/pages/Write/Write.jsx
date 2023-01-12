import axios from 'axios';
import React, {useState} from 'react'
import {useContext} from 'react';
import {AiOutlinePlusCircle} from "react-icons/ai"
import {Context} from '../../context/Context';
import { useNavigate } from 'react-router-dom';
import "./Write.css"

const Write = () => {

    let [title,
        setTitle] = useState("");
    let [desc,
        setDesc] = useState("");
    let [file,
        setFile] = useState(null); 
    const {user} = useContext(Context);
    let navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();

        const newPost = {
            title,
            desc,
            username: user.username
        }

        let data;

        if (file) {
            data = new FormData();
            // Date.now() +
            const filename = file.name;
            data.append("name", filename);
            data.append("file", file);
            newPost.photo = filename;
        }

        try {
            await axios.post("http://localhost:5000/api/upload", data);
            console.log(data)
        } catch (error) {
            console.log(error);
        }

        try {
            const res = await axios.post("http://localhost:5000/api/posts", newPost);
            navigate(`/post/${res.data._id}`)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="write">
            <div className="img">
                {file && (<img
                    className="writeImg"
                    src={URL.createObjectURL(file)}
                    alt=""/>)}
            </div>
            <form className="writeForm" onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <AiOutlinePlusCircle
                            style={{
                            cursor: "pointer"
                        }}
                            size={35}/>
                    </label>
                    <input
                        onChange={(e) => setFile(e.target.files[0])}
                        type="file"
                        id="fileInput"
                        style={{
                        display: "none"
                    }}/>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Title" autoFocus={true} className="writeInput"/>
                </div>
                <div className="writeFormGroup">
                    <textarea
                        value={desc}
                        onChange={(e) =>  setDesc(e.target.value)}
                        placeholder="Tell your story..."
                        type="text"
                        className="writeText writeInput"></textarea>
                </div>
                <button className="writeSubmit" type="submit">
                    Publish
                </button>
            </form>
        </div>
    );
}

export default Write