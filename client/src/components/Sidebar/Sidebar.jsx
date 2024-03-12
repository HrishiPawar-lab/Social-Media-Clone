import React, { useEffect, useState } from "react";
import "./sidebar.css";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import Loader from "../Loader/Loader";
import userAlt from "../../assets/user.png";
import GroupIcon from "@mui/icons-material/Group";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import WorkIcon from "@mui/icons-material/Work";
import EventNoteIcon from "@mui/icons-material/EventNote";
import SchoolIcon from "@mui/icons-material/School";
import { useUserContext } from "../../context/user-context";
import { Link } from "react-router-dom";
import axios from "axios";

const Sidebar = () => {
    const context = useUserContext();
    const { user } = context;
    const [showMore, setShowMore] = useState(false);
    const [followers, setFollowers] = useState([]);
    const [loading, setLoading] = useState(false);
    const currentuser = localStorage.getItem("currentuser");

    useEffect(() => {
        const fetchAllFollowers = async () => {
            setLoading(true);
            const { data } = await axios.get(`http://localhost:9000/api/users`);
            setFollowers(data);
            setLoading(false);
        };
        fetchAllFollowers();
    }, []);




    return (
        <div>
            <div className="sidebarWrapper">
                <ul className="activities">
                    <li>
                        <RssFeedIcon />
                        <span>feed</span>
                    </li>
                    <li>
                        <PlayCircleFilledIcon />
                        <span>videos</span>
                    </li>
                    <li>
                        <GroupIcon />
                        <span>groups</span>
                    </li>
                    <li>
                        <BookmarksIcon />
                        <span>bookmarks</span>
                    </li>
                    {
                        showMore &&
                        <>
                            <li>
                                <HelpOutlineIcon />
                                <span>questions</span>
                            </li>
                            <li>
                                <WorkIcon />
                                <span>jobs</span>
                            </li>
                            <li>
                                <EventNoteIcon />
                                <span>events</span>
                            </li>
                            <li>
                                <SchoolIcon />
                                <span>courses</span>
                            </li>
                        </>
                    }
                </ul>
                <button
                    onClick={() => {
                        setShowMore(prev => !prev)
                    }}
                    className="button">Show More</button>
                <hr className="hr" />
                <ul className="friendList">
                    <Link style={{ textDecoration: "none" }} to={`/profile/`}>
                        <li className="d-flex">
                            <img
                                src={user.profilePicture || userAlt}
                                className="profilePicture"
                                alt=""
                            />
                            <span>{user.username || currentuser?.username}</span>
                        </li>
                    </Link>
                    <p className="fw-bold mt-2 text-primary">Find People</p>
                    {followers.map((friend) => {
                        return (
                            <>
                                {loading ? (
                                    <Loader />
                                ) : (
                                    <>
                                        <Link
                                            style={{ textDecoration: "none" }}
                                            to={`/profile/${friend._id}`}
                                        >
                                            <li className="d-flex">
                                                <img
                                                    src={friend.profilePicture || userAlt}
                                                    className="profilePicture"
                                                    alt=""
                                                />
                                                <span>{friend.username}</span>
                                            </li>
                                        </Link>
                                    </>
                                )}
                            </>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
