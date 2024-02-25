import React, { useState, useRef } from "react";
import "./share.css";
import profilePicture from "../../assets/person/1.jpeg";
import userAlt from "../../assets/user.png";
import { useUserContext } from '../../context/user-context';
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import LabelIcon from "@mui/icons-material/Label";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import axios from "axios";
import Loader from "../Loader/Loader";
import swal from 'sweetalert';

const Share = ({ addNewPost }) => {
  const ctx = useUserContext();
  const [loading, setLoading] = useState(false);
  const [share, setShare] = useState({
    desc: "",
    img: "",
    userId: ctx.userID,
  });

  const shareFile = useRef();

  const handleNewPost = () => {
    shareFile.current.click();
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setShare((prev) => ({
      ...prev,
      img: base64,
    }));
  };

  const handleShare = async () => {
    try {
      // Check if at least one of desc, img, or userId is provided
      setLoading(true);
      if (share.desc || share.img || share.userId) {
        // Send share data to the server
        const response = await axios.post(`http://localhost:8800/api/posts`, { ...share, userId: ctx.userID });
        addNewPost(response.data);
        setLoading(false);
        // Clear input fields after successful share
        setShare({ desc: "", img: "", userId: ctx.userID });
      } else {
        // Notify the user that they must provide at least one of desc, img, or userId
        swal("Please select a desc, img, or userId");
        setLoading(false);

        console.error("Please provide at least one of desc, img, or userId for the post");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error sharing post:", error);
      // Handle errors here, such as displaying error messages to the user
    }
  };


  return (
    <div className="shareWrapper">
      <div className="shareBox">
        <div className="d-flex">
          <img src={ctx.user.profilePicture || userAlt} className="profilePicture" alt="Profile" />
          <input
            type="text"
            value={share.desc}
            onChange={(e) => setShare((prev) => ({ ...prev, desc: e.target.value }))}
            className="w-100"
            placeholder="Share your thoughts"
          />
        </div>
        <hr className="hr" />
        <div className="shareActions">
          <div className="d-flex">
            <div className="d-flex" style={{ cursor: "pointer" }} onClick={handleNewPost}>
              <input
                name="coverPicture"
                onChange={handleImageUpload}
                type="file"
                hidden
                ref={shareFile}
              />
              <AddAPhotoIcon />
              <span>Photo Or Video</span>
            </div>
            <div className="d-flex" style={{ cursor: "pointer" }}>
              <AddLocationIcon />
              <span>Location</span>
            </div>
            <div className="d-flex" style={{ cursor: "pointer" }}>
              <LabelIcon />
              <span>Tag</span>
            </div>
            <div className="d-flex" style={{ cursor: "pointer" }}>
              <InsertEmoticonIcon />
              <span>Mood</span>
            </div>
          </div>
          <button className="button share-btn" onClick={handleShare}>
            {
              loading ? <Loader /> : " share"
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default Share;
