import React from "react";
import "./rightsidebar.css";
import profilePicture from "../../assets/person/1.jpeg";
import giftImage from "../../assets/gift.png";

import ad from "../../assets/ad.png";
import CloseFriends from "../CloseFriends/CloseFriends";
const RightSidebar = ({ profile }) => {
  let content;

  if (!profile) {
    content = (
      <div className="rightSidebar">
        <div className="rightsidebarWrapper">
          <div className="rightsidebarTop">
            <div className="d-flex">
              <img src={giftImage} className="giftImage" alt="gift-img" />
              <p>
                <span className="fw-bold">John Doe</span> and 2 others have
                birthday today.
              </p>
            </div>
          </div>
          <div className="rightsidebarCenter">
            <div className="image">
              <img src={ad} alt="" />
            </div>
          </div>
          <div className="rightsidebarBottom">
            <h3 className="onlineFriends">Online Friends</h3>
            <ul className="friendList">
              <li className="d-flex">
                <img src={profilePicture} className="profilePicture" alt="" />
                <span>John Doe</span>
                <div className="online"></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  } else {
    content = (
      <div className="rightSidebar">
        <div className="rightsidebarWrapper">
          <div className="rightSidebarProfileInfo">
            <h3>Close Friends</h3>
            <div className="closeFriendsDiv">
              <CloseFriends />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{content}</>;
};

export default RightSidebar;
