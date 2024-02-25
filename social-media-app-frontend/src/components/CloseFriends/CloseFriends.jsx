import React from "react";
import profile1Picture from "../../assets/person/2.jpeg";
import userAlt from "../../assets/user.png";
import "./closefriends.css";
const CloseFriends = () => {
  return (
    <div className="closeFriendsWrapper">
      <div className="closeFriends">
        <img src={userAlt || profile1Picture} alt="" />
      </div>
    </div>
  );
};

export default CloseFriends;
