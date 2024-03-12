import React, { useEffect, useState } from "react";
import "./user.css";
import coverImage from "../../assets/post/3.jpeg";
import userImage from "../../assets/person/1.jpeg";
import userAlt from "../../assets/user.png";
import { useUserContext } from "../../context/user-context";
import axios from "axios";
import swal from "sweetalert";
const User = ({ userID }) => {

  const context = useUserContext();
  const { user } = context
  console.log(user)
  const [thisUser, setThisUser] = useState();
  const [isFollowing, setIsFollowing] = useState(false);
  const [] = useState();

  useEffect(() => {
    if (user?.followings?.includes(thisUser?._id)) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  }, [user, userID]);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:9000/api/users/${userID}`
        );
        setThisUser(data)
        setIsFollowing(user?.followings?.includes(user._id));
      } catch (error) {
        console.error("Error fetching user details:", error.message);
      }
    };
    getUserDetails();
  }, [userID, user]);

  const handleFollow = async () => {
    if (!isFollowing) {
      try {
        setIsFollowing(true);
        await axios.put(
          `http://localhost:9000/api/users/${thisUser?._id}/follow`,
          {
            userId: user?._id
          }
        );
        swal("User Followed", "success");
      } catch (error) {
        console.error("Error following user:", error.message);
      }
    }
  };

  const handleUnfollow = async () => {
    if (isFollowing) {
      try {
        setIsFollowing(false);
        await axios.put(
          `http://localhost:9000/api/users/${thisUser?._id}/unfollow`,
          {
            userId: user?._id,
          }
        );
        swal("User Unfollowed");
      } catch (error) {
        console.error("Error unfollowing user:", error.message);
      }
    }
  };

  return (
    <div className="user">
      <div className="userWrapper">
        <div className="coverImage">
          <img src={user?.coverPicture || coverImage} alt="" />
          <div className="profileImage">
            <img src={user?.profilePicture || userAlt} alt="" />
          </div>
        </div>
        <div className="userDetails">
          <h3 className="username">{thisUser?.username}</h3>
          <p className="fw-bold text-primary mt-2">
            {thisUser?.followers?.length}  followers
          </p>
          {thisUser?._id === user?._id ? null : isFollowing ? (
            <button className="button mt-2" onClick={handleUnfollow}>
              Followed
            </button>
          ) : (
            <button className="button mt-2" onClick={handleFollow}>
              Follow
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
