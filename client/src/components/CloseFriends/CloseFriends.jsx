import React, { useEffect } from "react";
import profile1Picture from "../../assets/person/2.jpeg";
import userAlt from "../../assets/user.png";
import "./closefriends.css";
import { useUserContext } from "../../context/user-context";
import axios from "axios";
const CloseFriends = () => {
  const context = useUserContext()
  const { user } = context;







  return (
    <div className="closeFriendsWrapper">
      <div className="closeFriends">
        <img src={userAlt || profile1Picture} alt="" />
      </div>
    </div>
  );
};

export default CloseFriends;
