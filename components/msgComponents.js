import { useState } from "react";
import styles from "../styles/planning.module.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Menu, MenuItem } from "@mui/material";

// import ForwardMsg from "../user-dashboard/ForwardMsg";
import { createTheme } from "@mui/material/styles";
export const theme3 = createTheme({
  palette: {
    primary: {
      main: "#B6255A",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderRadius: "10px",
            borderColor: "#b6255a",
          },
          ".MuiOutlinedInput-notchedOutline": {
            borderRadius: "10px",
            border: "1px solid #b6255a",
          },

          "MuiFormLabel-root": {
            color: "#b6255a !important",
          },
        },
      },
    },
  },
});
export const theme4 = createTheme({
  palette: {
    primary: {
      main: "#1E1E1E",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          ".MuiOutlinedInput-notchedOutline": {
            // backgroundColor: "#f4f4f4",
            border: "none",
          },
        },
      },
    },
  },
});

export const MegaMessage = ({
  message,
  setDelMsg,
  setFrwdMsg,
  setRplyMsg,
  setOpenModalForward,
}) => {
  const [anchorEl, setAnchorEl] = useState();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [anchorEl1, setAnchorEl1] = useState();
  const open1 = Boolean(anchorEl1);
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClose1 = () => {
    setAnchorEl1(null);
  };
  const ITEM_HEIGHT = 48;
  // console.log("BIGMESSAGE", message);
  if (message.type === "receiver") {
    return (
      <div className={styles.mymessagebloackmaindiv}>
        <div className={styles.mymessage}>
          <div className={styles.mymessagenametime}>
            <div className={styles.mymessageimg}>
              {message.name.substring(0, 1)}
            </div>

            <span className={styles.mymessagename}>
              {message.name}
              <span className={styles.mymessagetime}>{message.time}</span>
            </span>
          </div>
          <div className={styles.mymessagebodymaindiv}>
            <article className={styles.myMessagebody}>
              <div className={styles.arrowdownmess}>
                <KeyboardArrowDownIcon
                  aria-label="more"
                  id="long-button"
                  aria-controls={open ? "long-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                ></KeyboardArrowDownIcon>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    "aria-labelledby": "long-button",
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: "20ch",
                      left: "50",
                    },
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      setDelMsg(message._id);
                      handleClose();
                    }}
                  >
                    Delete
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setFrwdMsg(message);
                      setOpenModalForward(true);
                    }}
                  >
                    Forward
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setRplyMsg(message);
                    }}
                  >
                    Reply
                  </MenuItem>
                </Menu>
              </div>
              {message.replyOf && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "fit-content",
                    background: "rgba(0,0,0,.1)",
                    borderRadius: "8px 8px 0px 0px",
                    borderTop: "1px solid white",
                    borderBottom: "2px solid rgba(0,0,0,.5)",
                    // marginTop: '10px',
                    padding: "3px 10px",
                    boxShadow: "1px 1px 2px 1px rgba(0,0,0,.2)",
                    fontSize: "15px",
                    marginBottom: "3px",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontWeight: "600" }}>
                      {message.replyOf.sender}
                    </span>
                    {message.replyOf.msgType == "image" ? (
                      <img
                        height="100px"
                        className={styles.myFilebody}
                        src={message.replyOf.msg}
                      />
                    ) : message.replyOf.msgType == "video" ? (
                      <video className={styles.myFilebody} height="100px">
                        <source src={message.replyOf.msg} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : message.replyOf.msgType === "doc" ? (
                      <embed
                        className={styles.myFilebody}
                        src={message.replyOf.msg}
                        type="application/pdf"
                        width="70%"
                        height="100px"
                      />
                    ) : (
                      <span>
                        {message?.replyOf?.msg?.substring(0, 30)}
                        {message?.replyOf?.msg?.length > 30 && "..."}
                      </span>
                    )}
                  </div>
                </div>
              )}
              {message.textFileType == "image" ? (
                <img className={styles.myFilebody} src={message.message} />
              ) : message.textFileType == "video" ? (
                <video className={styles.myFilebody} controls>
                  <source src={message.message} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : message.textFileType === "doc" ? (
                <embed
                  className={styles.myFilebody}
                  src={message.message}
                  type="application/pdf"
                  width="70%"
                  height="500px"
                />
              ) : (
                <>{message.message}</>
              )}
            </article>
          </div>
          {message.forwarded && <p style={{ color: "red" }}>Forwarded</p>}
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.yourmessagebloackmaindiv}>
        <div className={styles.yourmessage}>
          <div className={styles.yourmessagenametime}>
            <div className={styles.yourmessageimg}>
              {message.name.substring(0, 1)}
            </div>
            {/* {message.replyOf && (
              <div>
                <h3>{message.replyOf.sender}</h3>
                {message.replyOf.msgType == 'image' ? (
                  <img
                    className={styles.myFilebody}
                    src={message.message}
                  />
                ) : message.replyOf.msgType == 'video' ? (
                  <video
                    className={styles.myFilebody}
                    controls
                  >
                    <source
                      src={message.message}
                      type='video/mp4'
                    />
                    Your browser does not support the video tag.
                  </video>
                ) : message.replyOf.msgType === 'doc' ? (
                  <embed
                    className={styles.myFilebody}
                    src={message.message}
                    type='application/pdf'
                    width='70%'
                    height='500px'
                  />
                ) : (
                  <h2>{message.replyOf.msg}</h2>
                )}
              </div>
            )} */}
            <span className={styles.yourmessagename}>
              {message.name}
              <span className={styles.yourmessagetime}>{message.time}</span>
            </span>
          </div>
          {/* <p onClick={() => setDelMsg(message._id)}>Del</p>
          <p
            onClick={() => {
              setFrwdMsg(message);
              setOpenModalForward(true);
            }}>
            Forward
          </p> */}
          <div className={styles.yourmessagebodymaindiv}>
            <article className={styles.yourMessagebody}>
              <div className={styles.arrowdownmess1}>
                <KeyboardArrowDownIcon
                  aria-label="more"
                  id="long-button1"
                  aria-controls={open1 ? "long-menu" : undefined}
                  aria-expanded={open1 ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleClick1}
                ></KeyboardArrowDownIcon>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    "aria-labelledby": "long-button1",
                  }}
                  anchorEl={anchorEl1}
                  open={open1}
                  onClose={handleClose1}
                  PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: "20ch",
                    },
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      setDelMsg(message._id);
                      handleClose1();
                    }}
                  >
                    Delete
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setFrwdMsg(message);
                      setOpenModalForward(true);
                    }}
                  >
                    Forward
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setRplyMsg(message);
                    }}
                  >
                    Reply
                  </MenuItem>
                </Menu>
              </div>
              {message.replyOf && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "fit-content",
                    background: "rgba(0,0,0,.1)",
                    borderRadius: "8px 8px 0px 0px",
                    borderTop: "1px solid white",
                    borderBottom: "2px solid rgba(0,0,0,.5)",
                    // marginTop: '10px',
                    padding: "3px 10px",
                    boxShadow: "1px 1px 2px 1px rgba(0,0,0,.2)",
                    fontSize: "15px",
                    marginBottom: "3px",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontWeight: "600" }}>
                      {message.replyOf.sender}
                    </span>
                    {message.replyOf.msgType == "image" ? (
                      <img
                        height="100px"
                        className={styles.myFilebody}
                        src={message.replyOf.msg}
                      />
                    ) : message.replyOf.msgType == "video" ? (
                      <video className={styles.myFilebody} height="100px">
                        <source src={message.replyOf.msg} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : message.replyOf.msgType === "doc" ? (
                      <embed
                        className={styles.myFilebody}
                        src={message.replyOf.msg}
                        type="application/pdf"
                        width="70%"
                        height="100px"
                      />
                    ) : (
                      <span>
                        {message?.replyOf?.msg?.substring(0, 30)}
                        {message?.replyOf?.msg?.length > 30 && "..."}
                      </span>
                    )}
                  </div>
                </div>
              )}
              {message.textFileType == "image" ? (
                <img className={styles.yourFilebody} src={message.message} />
              ) : message.textFileType == "video" ? (
                <video className={styles.yourFilebody} controls>
                  <source src={message.message} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : message.textFileType === "doc" ? (
                <embed
                  className={styles.yourFilebody}
                  src={message.message}
                  type="application/pdf"
                  width="70%"
                  height="500px"
                />
              ) : (
                <>{message.message}</>
              )}
            </article>
          </div>
          {message.forwarded && <p style={{ color: "red" }}>Forwarded</p>}
        </div>
      </div>
    );
  }
};
