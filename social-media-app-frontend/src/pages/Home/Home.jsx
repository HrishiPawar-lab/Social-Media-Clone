import React, { useEffect, useState } from 'react';
import './home.css';
import Feed from '../../components/Feed/Feed';
import Sidebar from '../../components/Sidebar/Sidebar';
import RightSidebar from '../../components/RightSidebar/RightSidebar';
import { useUserContext } from '../../context/user-context';
const Home = ({ isLogged }) => {

    const ctx = useUserContext()
    const [loggedinUser, setLoggedinUser] = useState();

    useEffect(() => {
        setLoggedinUser(ctx.userID)
    }, [])


    return (
        <div className='homeContainer'>
            <div className="homeSidebar">
                <Sidebar />
            </div>
            <div className="homeFeed">
                <Feed />
            </div>
            <div className="homeRighsideBar">
                <RightSidebar />
            </div>
        </div>
    )
}

export default Home