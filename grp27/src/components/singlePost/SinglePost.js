import React,{useState,useEffect, useContext} from "react";
import axios from "axios";
import {useLocation, Link } from "react-router-dom";
import "./singlePost.css";
import { Context } from "../../context/Context";

const SinglePost = () => {

  //fetching the url
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});

  //fetching image from local host
  const PF = "http://localhost:5000/images/"
  //fetching user from context
  const {user} = useContext(Context)

  //Declaring set and use states
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);



  //Fetchs a single post from the backend and sets it to the variable
  useEffect(()=>{
    const getPost = async ()=>{
      const res = await axios.get("/posts/"+path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost()
  },[path])


  //Handles the delete functionality
  const handleDelete = async ()=>{
    try {
      await axios.delete(`/posts/${post._id}`,{
        data:{username:user.username},
      });
      window.location.replace("/");//Reloads the page

    } catch (err) {
      
    }
  }

  //Handles the update functionality
  const handleUpdate = async ()=>{
    try {
      await axios.put(`/posts/${post._id}`,{
        username:user.username, title,desc,
      });
      window.location.reload("/");//Reloads the page

    } catch (err) {
      
    }
  }
  
  return (
    <div>
      <div className="singlePost">
        {/* fetching a single post and displaying in the page */}
        <div className="singlePostWrapper">
          {post.photo && (
            <img className="singleWrapperImg"
            src={PF + post.photo}
            alt=""
            className="singlePostImg"
          />
          )}{
            updateMode ? <input type="text" className="singlePostTitleInput" value={title} autoFocus  onChange={(e)=>setTitle(e.target.value)}/> : (
              <h1 className="singlePostTitle">
            {post.title}
            {/* Only the user who added the blog can edit and delete the blog */}
            {post.username === user?.username && (
              <div className="singlePostEdit">
              <i className="singlePostIcon far fa-edit" onClick={()=>setUpdateMode(true)}></i>
                <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
              </div>
            )}
          </h1>
            )
          }
        {/* fectching and displaying the details like author and created date */}
          <div className="singlePostInfo">
            <span className="singlePostAuthor">
              Author:  
              <Link to={`/?user=${post.username}`} className="link"><b> {post.username} </b></Link>
            </span>
            <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
          </div>
          {/* It can be updated only if it is in updated mode or it it will just show the content */}
          {updateMode ? <textarea className="singlePostDescInput" value={desc} onChange={(e)=>setDesc(e.target.value)}/> : (
            <p className="singlePostDesc">{post.desc}</p>
          ) }
          {/* onclick it handles the update funcion */}
          {updateMode && <button className="singlePostButton" onClick={handleUpdate}> Update </button>}
        </div>
      </div>
    </div>

  );
}

export default SinglePost;