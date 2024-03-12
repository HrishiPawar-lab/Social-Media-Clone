import React, { useState, useEffect } from "react";
import "./Topbar.css";
import profilePicture from "../../assets/person/1.jpeg";
import PersonIcon from "@mui/icons-material/Person";
import ForumIcon from "@mui/icons-material/Forum";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/user-context";
import userImage from "../../assets/user.png";
import axios from "axios";

const Topbar = () => {
    const context = useUserContext();
    const { user, handleLogout } = context;
    const [searchText, setSearchText] = useState('');
    const [debouncedSearchText, setDebouncedSearchText] = useState('');

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedSearchText(searchText);
        }, 500);

        return () => {
            clearTimeout(timerId);
        };
    }, [searchText]);

    useEffect(() => {
        if (debouncedSearchText) {
            axios.get(`http://localhost:9000/api/users/search?name=${debouncedSearchText}`)
                .then(response => {
                    console.log(response.data);
                    // Update state or do something with the response data
                })
                .catch(error => {
                    console.error("Error fetching search results:", error);
                });
        }
    }, [debouncedSearchText]);

    const handleChange = (e) => {
        setSearchText(e.target.value);
    };

    return (
        <div className="topbarContainer">
            <div className="topbarleft">
                <Link to={`/`} style={{ textDecoration: "none" }}>
                    <span className="logo">Social Media</span>
                </Link>
            </div>
            {user && (
                <>
                    <div className="topbarCenter">
                        <SearchIcon />
                        <input
                            value={searchText}
                            onChange={handleChange}
                            type="text"
                            placeholder="Search for a friend, post..."
                        />
                    </div>
                    <div className="topbarRight">
                        <div className="d-flex">
                            <Link to="/" style={{ textDecoration: "none" }}>
                                <p className="feedStatus">Homepage</p>
                            </Link>
                        </div>
                        <div className="d-flex">
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
                        <div className="profilePicture">
                            <Link to={`/profile/${user._id}`}>
                                <img src={user.profilePicture || userImage} alt="Profile" />
                            </Link>
                            <div onClick={handleLogout} className="logout-box">
                                <button className="button">Logout</button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Topbar;
