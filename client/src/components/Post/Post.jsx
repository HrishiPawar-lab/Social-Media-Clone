import React, { useEffect, useState } from 'react';
import "./post.css";
import profilePicture from "../../assets/person/1.jpeg";
import postPicture from "../../assets/post/1.jpeg";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Loader from '../Loader/Loader';
import { useUserContext } from '../../context/user-context';
import axios from 'axios';
import { format } from 'timeago.js';
import AOS from "aos";
import 'aos/dist/aos.css';


const Post = ({ post }) => {
    useEffect(() => {
        AOS.init();
    }, [])
    const [likeCount, setLikeCount] = useState(post.likes.
        length);

    const [isLiked, setIsLiked] = useState(false);
    const ctx = useUserContext();
    const [postOwner, setPostOwner] = useState({
        userId: '',
        username: '',
        userProfilePicture: ""
    })



    useEffect(() => {
        const getPostowner = async () => {
            const { data } = await axios.get(`http://localhost:9000/api/users/user/${post.userId}`)
            const { username, _id, profilePicture } = data;
            setPostOwner(() => {
                return {
                    userId: _id,
                    username: username,
                    userProfilePicture: profilePicture
                }
            })
        };
        getPostowner();
    }, [])


    const handleLike = async () => {
        try {
            if (isLiked) {
                // Unlike the post
                await axios.put(`http://localhost:9000/api/posts/${post._id}/like`);
                setLikeCount(prevCount => prevCount - 1);
            } else {
                // Like the post
                await axios.put(`http://localhost:9000/api/posts/${post._id}/like`);
                setLikeCount(prevCount => prevCount + 1);
            }
            setIsLiked(!isLiked);
        } catch (error) {
            console.error("Error toggling like:", error);
        }
    };

    return (
        <div className='post'>
            <div className="postWrapper">
                <div className="postCard">
                    <div className="postCardTop">
                        <div className='d-flex'>
                            <img src={postOwner.userProfilePicture || profilePicture} className='profilePicture' alt="Profile" />
                            <span className='profileName'>{postOwner.username}</span>
                            <span>{format(post.createdAt)}</span>
                        </div>
                        <div>
                            <MoreVertIcon />
                        </div>
                    </div>
                    <p className='description'>{post.desc || "No Description"}</p>
                    <div className="postCardImage">
                        <img src={post.img || postPicture} alt="Post" />
                    </div>
                    <div className="postCardbottom">
                        <div className='d-flex'>
                            <div className="d-flex">
                                <ThumbUpIcon onClick={handleLike} style={{ color: isLiked ? 'blue' : 'black' }} />
                                <FavoriteIcon onClick={handleLike} style={{ color: isLiked ? 'red' : 'black' }} />
                            </div>
                            <span>{likeCount} people liked this</span>
                        </div>
                        <div className="comments">
                            <p>9 comments</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;
