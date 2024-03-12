import React, { useState, useEffect } from 'react';
import { useUserContext } from '../../context/user-context';
import "./feed.css";
import Share from '../Share/Share';
import Post from '../Post/Post';
import axios from "axios";
import Loader from '../Loader/Loader';
const Feed = ({ home }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const context = useUserContext();
    const { user } = context;

    const fetchAllPosts = async () => {
        setLoading(true);
        try {
            const url = `http://localhost:9000/api/posts/timeline/${user._id}`;
            const response = await axios.get(url);
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchAllPosts();
    }, [user._id]);

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
