import React, { useState, useEffect } from 'react'
import "./Topbar.css"
import profilePicture from "../../assets/person/1.jpeg"
import PersonIcon from '@mui/icons-material/Person';
import ForumIcon from '@mui/icons-material/Forum';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router-dom";
import { useUserContext } from '../../context/user-context';
import userImage from "../../assets/user.png";

const Topbar = ({ isLogged }) => {
    const ctx = useUserContext()
    const { user } = useUserContext()
    const [loggedinUser, setLoggedinUser] = useState();

    useEffect(() => {
        setLoggedinUser(ctx.userID)
    }, [])
    return (
        <div className='topbarContainer'>
            <div className="topbarleft">
                <Link to={`/`} style={{ textDecoration: "none" }}>
                    <span className='logo'>Social Media</span>
                </Link>
            </div>
            {
                isLogged && <>
                    <div className="topbarCenter">
                        <SearchIcon />
                        <input type="text" placeholder='Search for a friend , post...' />
                    </div>
                    <div className="topbarRight">
                        <div className='d-flex'>
                            <Link to='/' style={{ textDecoration: "none" }}>
                                <p className="feedStatus">Homepage</p>
                            </Link>
                            {/* <Link to='/' style={{ textDecoration: "none" }}>
                                <p className="feedStatus">Timeline</p>
                            </Link> */}
                        </div>
                        <div className='d-flex'>
                            <div className="topbarIcon">
                                <PersonIcon />
                                <span>1</span>
                            </div>
                            <div className="topbarIcon">
                                <ForumIcon />
                                <span>2</span>
                            </div>
                            <div className="topbarIcon">
                                <NotificationsIcon />
                                <span>2</span>
                            </div>
                        </div>
                        <Link to={`/profile/${ctx.userID}`}>
                            <div className='profilePicture' >
                                <img src={user.profilePicture || userImage} />
                            </div>
                        </Link>
                    </div>
                </>
            }
        </div>
    )
}

export default Topbar