import React, { useEffect, useState } from 'react';
import "./Profile.css";
import Sidebar from '../../components/Sidebar/Sidebar';
import Feed from '../../components/Feed/Feed';
import RightSidebar from '../../components/RightSidebar/RightSidebar';
import User from '../../components/User/User';
import { useParams } from "react-router-dom";

const Profile = () => {
    const { userID } = useParams(); // Retrieving userID from URL params
    const [id, setId] = useState(userID); // Initialize id state with userID

    useEffect(() => {
        setId(userID); // Update id state when userID changes
    }, [userID]);

    return (
        <div className='profile'>
            <div className="profileSidebar">
                <Sidebar />
            </div>
            <div className="profileFeed">
                <User userID={id} />
                <Feed userID={id} /> {/* Pass userID as a prop to Feed component */}
            </div>
            <div className="profileRighsideBar">
                <RightSidebar profile={true} />
            </div>
        </div>
    );
}

export default Profile;
