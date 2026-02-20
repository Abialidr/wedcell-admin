import React, { useState } from "react";
import Styles from "../styles/reviews.module.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import StarRatings from "react-star-ratings";
// import moment from "moment";
import axios from "axios";
import { PROXY } from "../config";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { useRef } from "react";
import Iconify from "../components/Iconify";
const Reply = ({ items, item, handleButtonClick, handleDeleteReply }) => {
  console.log("🚀 ~ file: Reply.js:18 ~ item:", item)
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className={Styles.ReviewUser}>
        <AccountCircleIcon fontSize="medium"></AccountCircleIcon>
        <h6>{items?.name}</h6>
      </div>
      <span className={Styles.ReviewCountryDate}>
        Reply on
        {/* {moment(items?.createdAt).format("MMM DD YYYY") */}
      </span>
      <div className={Styles.ReviewSpan} style={{ marginBottom: "10px" }}>
        <span>{items?.replyBody}</span>

        <IconButton ref={ref} onClick={() => setIsOpen(true)}>
          <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
        </IconButton>

        <Menu
          open={isOpen}
          anchorEl={ref.current}
          onClose={() => setIsOpen(false)}
          PaperProps={{
            sx: { width: 200, maxWidth: "100%" },
          }}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem
            onClick={() => {
              handleDeleteReply(items?._id);
            }}
          >
            <ListItemIcon></ListItemIcon>
            <ListItemText
              primary="Delete"
              primaryTypographyProps={{ variant: "body2" }}
            />
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleButtonClick(
                item?.productid,
                items?.userid,
                items?.id,
                setIsOpen
              );
              console.log(
                "🚀 ~ file: Reviews.js:168 ~ {allReplies?.map ~ item?._id:",
                item?._id
              );
              console.log(
                "🚀 ~ file: Reviews.js:168 ~ {allReplies?.map ~ item?._id:",
                item?._id
              );
            }}
          >
            <ListItemIcon></ListItemIcon>
            <ListItemText
              primary="Update"
              primaryTypographyProps={{ variant: "body2" }}
            />
          </MenuItem>
        </Menu>
      </div>
    </>
  );
};

export default Reply;
