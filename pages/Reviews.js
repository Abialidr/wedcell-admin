import React, { useState } from "react";
import Styles from "../styles/reviews.module.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import StarRatings from "react-star-ratings";
// import moment from "moment";
import axios from "axios";
import { PROXY } from "../config";
import Reply from "./Reply";

const Reviews = ({
  item,
  totalReview,
  setSubRev,
  main,
  page,
  setPage,
  handleButtonClick,
}) => {
  console.log("🚀 ~ file: Reviews.js:8 ~ Reviews ~ totalReview:", totalReview);
  const [viewReview, setViewReview] = useState(false);
  const [isReply, setisReply] = useState(true);
  const [allReplies, setAllReplies] = useState([]);
  const [totalReplies, setTotalReplies] = useState();
  const handleViewMore = () => {};
  const handleViewReply = async (id) => {
    const res = await axios.post(`${PROXY}/rr/replies/all`, {
      page: page,
      reviewid: id,
    });
    console.log("🚀 ~ file: Reviews.js:19 ~ handleViewReply ~ res:", res);
    setAllReplies([...allReplies, ...res.data.data]);
    setTotalReplies(res.data);
    setPage(page + 1);

    // setSubRev(Math.random);
    console.log("🚀 ~ file: Reviews.js:15 ~ handleViewReply ~ res:", res.data);
    setViewReview(true);
  };
  const handleDeleteReply = async (id) => {
    const res = await axios.delete(`${PROXY}/rr/replies/${id}`);
    console.log("🚀 ~ file: Reviews.js:43 ~ handleDeleteReply ~ res:", res);
    if (res.data.success) {
      window.location.reload();
    }
  };
  return (
    <>
      <div className={Styles.ReviewContainer}>
        <div className={Styles.ReviewUser}>
          <AccountCircleIcon fontSize="large"></AccountCircleIcon>
          <h6>{item?.name}</h6>
        </div>
        <div className={Styles.ReviewStar}>
          {/* <StarRatings
            rating={item?.rating}
            starRatedColor="gold"
            numberOfStars={5}
            name="rating"
            starDimension="17px"
            starSpacing="2px"
          /> */}
          <span style={{ fontSize: "15px" }}>{item?.reviewTitle}</span>
        </div>
        <span className={Styles.ReviewCountryDate}>Reviewed on</span>
        {/* {moment(item?.createdAt).format("MMM DD YYYY")} */}
        <div className={Styles.ReviewSpan}>
          <span>{item?.reviewBody}</span>
        </div>

        {/* {allReplies?.map((item) => {
              <div
                className={Styles.ReplyContainer}
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div className={Styles.ReviewUser}>
                  <AccountCircleIcon fontSize="medium"></AccountCircleIcon>
                  <h6>{item?.name}</h6>
                </div>
                <span className={Styles.ReviewCountryDate}>
                  Reply on {moment(item?.createdAt).format("MMM DD YYYY")}
                </span>
                <div className={Styles.ReviewSpan}>
                  <span>{item?.replyBody}</span>
                </div>
              </div>;
            })} */}

        <div
          className={Styles.ReplyContainer}
          style={{
            display: viewReview ? "flex" : "none",
            flexDirection: "column",
          }}
        >
          {allReplies?.map((items) => {
            return (
              <Reply
                items={items}
                item={item}
                handleButtonClick={handleButtonClick}
                handleDeleteReply={handleDeleteReply}
              />
            );
          })}
        </div>
        <div style={{ display: "flex" }}>
          <span
            className={Styles.Viewbtn}
            style={{
              display: isReply ? "flex" : "none",
              paddingLeft: viewReview ? "50px" : "",
              // width: "80px",
              marginRight: "10px",
            }}
            onClick={async (e) => {
              e.stopPropagation();
              if (!viewReview && page === 1) {
                setViewReview(true);
                handleViewReply(item?._id);
              } else {
                setViewReview(!viewReview);
              }
            }}
          >
            {viewReview ? "Hide Reply" : "View Reply"}
          </span>
          <span
            onClick={(e) => {
              handleViewReply(item?._id);
            }}
            className={Styles.Viewbtn}
            style={{
              display: "flex",
              paddingLeft: "0px",
            }}
          >
            {totalReplies?.remainingReplies && viewReview
              ? `${totalReplies?.remainingReplies} Remaning `
              : ""}
          </span>
        </div>

        {/* <span
          className={Styles.Viewbtn}
          style={{
            display: "flex",
            paddingLeft: "0px",
          }}
        >
          {totalReview?.remainingReviews
            ? `${totalReview?.remainingReviews} Remaning`
            : ``}
        </span> */}
      </div>

      {/* <span
          className={Styles.Viewbtn}
          style={{
            display: "flex",
            paddingLeft: "0px",
          }}
        >
          {totalReview?.remainingReviews
            ? `${totalReview?.remainingReviews} Remaning`
            : ``}
        </span> */}
      {/* </div> */}

      {/* <div className={Styles.ReviewContainer}>
        <div className={Styles.ReviewUser}>
          <AccountCircleIcon fontSize="large"></AccountCircleIcon>
          <h6>Name</h6>
        </div>
        <div className={Styles.ReviewStar}>
          <StarRatings
            rating={4.3}
            starRatedColor="gold"
            numberOfStars={5}
            name="rating"
            starDimension="17px"
            starSpacing="2px"
          />
        </div>
        <span className={Styles.ReviewCountryDate}>Reviwed on date</span>
        <div className={Styles.ReviewSpan}>
          <span>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat
            error voluptatum sed asperiores quis consectetur illo deleniti fugit
            autem saepe!
          </span>
        </div>
        <div
          className={Styles.ReplyContainer}
          style={{
            display: viewReview ? "flex" : "none",
            flexDirection: "column",
          }}
        >
          <div className={Styles.ReviewUser}>
            <AccountCircleIcon fontSize="medium"></AccountCircleIcon>
            <h6>Name</h6>
          </div>
          <span className={Styles.ReviewCountryDate}>Reply on date</span>
          <div className={Styles.ReviewSpan}>
            <span>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam
              doloremque iusto blanditiis amet, odit culpa modi explicabo.
              Dicta, inventore officiis!
            </span>
          </div>
        </div>
        <span
          className={Styles.Viewbtn}
          style={{
            display: isReply ? "flex" : "none",
            paddingLeft: viewReview ? "50px" : "",
          }}
          onClick={() => setViewReview(!viewReview)}
        >
          {viewReview ? "Hide Reply" : "View Reply"}
        </span>
      </div> */}
    </>
  );
};

export default Reviews;
