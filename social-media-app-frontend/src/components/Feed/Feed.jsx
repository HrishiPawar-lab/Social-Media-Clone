import React, { useState, useEffect } from 'react';
import { useUserContext } from '../../context/user-context';
import "./feed.css";
import Share from '../Share/Share';
import Post from '../Post/Post';
import axios from "axios";
import AOS from "aos"
import Loader from '../Loader/Loader';
const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const ctx = useUserContext();

    useEffect(() => {
        AOS.init()
    }, [])

    const fetchAllPosts = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('auth-token');
            const url = `http://localhost:8800/api/posts/timeline/${ctx.userID}`;
            const response = await axios.get(url, { headers: { 'auth-token': token } });
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchAllPosts();
    }, [ctx.userID]);

    const addNewPost = (newPost) => {
        setPosts([newPost, ...posts]);
    };

    return (
        <div className='feed'>
            <div className="feedWrapper">
                <Share addNewPost={addNewPost} />
                {loading ? (
                    <Loader />
                ) : (
                    posts.map((post) => {
                        return (
                            <>
                                <Post key={post._id} post={post} />
                            </>
                        )
                    })
                )}
            </div>
        </div>
    );

};

export default Feed;
