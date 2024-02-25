import React, { useEffect, useState } from 'react';
import "./user.css";
import coverImage from "../../assets/post/3.jpeg";
import userImage from "../../assets/person/1.jpeg";
import userAlt from "../../assets/user.png";
import { useUserContext } from '../../context/user-context';
import axios from 'axios';
import swal from 'sweetalert';
const User = ({ userID }) => {
    const [thisUser, setThisUser] = useState({});
    const { user, userID: userALT } = useUserContext();
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        const getUserDetails = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8800/api/users/${userID}`);
                setThisUser(data);
                setIsFollowing(user?.followings?.includes(userID));
            } catch (error) {
                console.error('Error fetching user details:', error.message);
            }
        };
        getUserDetails();
    }, [userID, user]);

    const handleFollow = async () => {
        try {
            await axios.put(`http://localhost:8800/api/users/${userID}/follow`, {
                userId: userALT
            });
            setIsFollowing(true);
            swal("User Followed")
        } catch (error) {
            console.error('Error following user:', error.message);
        }
    };

    const handleUnfollow = async () => {
        try {
            await axios.put(`http://localhost:8800/api/users/${userID}/unfollow`,);
            setIsFollowing(false);
            swal("User Unfollowed")

        } catch (error) {
            console.error('Error unfollowing user:', error.message);
        }
    };

    return (
        <div className='user'>
            <div className="userWrapper">
                <div className="coverImage">
                    <img src={thisUser?.coverPicture || coverImage} alt="" />
                    <div className='profileImage'>
                        <img src={thisUser.profilePicture || userAlt} alt="" />
                    </div>
                </div>
                <div className="userDetails">
                    <h3 className='username'>
                        {thisUser.username}
                    </h3>
                    <p className='fw-bold text-primary mt-2'>
                        {thisUser?.followers?.length} &nbsp; followers
                    </p>
                    {isFollowing ? (
                        <button className='button mt-2' onClick={handleUnfollow}>
                            Folowwing
                        </button>
                    ) : (
                        <button className='button mt-2' onClick={handleFollow}>
                            Follow
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default User;
