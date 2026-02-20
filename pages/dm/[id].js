import { useEffect, useRef, useState } from "react";
import styles from "../../styles/planning.module.css";
import {
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import useWindowSize from "@rooks/use-window-size";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { PROXY } from "../../config";
import MoreVertSharpIcon from "@mui/icons-material/MoreVertSharp";
import { io } from "socket.io-client";
import ImageIcon from "@mui/icons-material/Image";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";
// import ForwardMsg from "../user-dashboard/ForwardMsg";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
const theme3 = createTheme({
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
const theme4 = createTheme({
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

const MegaMessage = ({
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
const Msg = () => {
  const router = useRouter();
  console.log(router.query);
  //   const { id } = router.query;
  // console.log(router.query)
  //   const config = {
  //     headers: { authorization: globleuser?.data?.token },
  //   };
  const [modifiedMsgs, setModifiedMsgs] = useState([]);
  const [AllMEssages, setALLmessages] = useState([]);
  const [showAllMessage, setShowAllMessage] = useState();
  const { innerWidth: windowWidth } = useWindowSize();
  const [globleuser, setglobleuser] = useState();
  const [selected, setSelected] = useState();
  const [initialQuerySelect, setInitialQuerySelect] = useState(true);
  const [message, setMessage] = useState();
  const [latest, setLatest] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [openModalForward, setOpenModalForward] = useState(false);
  const socketRef = useRef(null);
  const [delMsg, setDelMsg] = useState(null);
  const [frwdMsg, setFrwdMsg] = useState();
  const [rplyMsg, setRplyMsg] = useState(null);
  console.log("rply", rplyMsg);
  console.log("globleuser", globleuser);
  useEffect(() => {
    setglobleuser(JSON.parse(localStorage.getItem("wedcell")));
  }, []);
  useEffect(() => {
    console.log("RUN", delMsg);
    deleteMsg();
  }, [delMsg]);
  console.log("sel", selected);

  const deleteMsg = async () => {
    if (delMsg) {
      const config = {
        headers: {
          authorization: JSON.parse(localStorage.getItem("wedcell"))?.data
            ?.token,
        },
      };
      await axios.post(
        `${PROXY}/contacts/deletemsg`,
        {
          messageId: delMsg,
        },
        config
      );
      console.log("ID");
      const updatedAllMessages = modifiedMsgs.filter(
        (message) => message._id !== delMsg
      );
      console.log("ID", updatedAllMessages);

      setModifiedMsgs(updatedAllMessages);
    }
  };
  const uploadFile = async (e) => {
    if (e) {
      //Now you can upload the file to your server.

      const maxSizeInBytes = 50 * 1024 * 1024;
      let type;
      console.log(e.type);
      if (e.type.startsWith("image/")) {
        type = "image";
      }
      if (e.type.startsWith("video/")) {
        type = "video";
      }
      if (e.type.startsWith("text/")) {
        type = "doc";
      }
      if (e.type.startsWith("application/pdf")) {
        type = "doc";
      }
      if (e.size < maxSizeInBytes) {
        const formData = new FormData();
        formData.append("file", e);

        // formData.append('name', e.name);
        // formData.append('type', e.type);
        let { data } = await axios.post(
          `${PROXY}/contacts/uploadfile`,
          formData,
          config
        );

        console.log("DATA", data, type);
        if (data) {
          console.log(type);
          type ? sendMessage(data, type) : alert("Unsupported document");
        }
      } else {
        alert("File size must be less than 5 mb");
      }
    }
  };
  function transformMessagesForFirstTime(messages) {
    // console.log("MMM", messages);
    if (selected && AllMEssages) {
      const transformedMessages = [...modifiedMsgs];

      messages.forEach((message) => {
        // console.log("single msg :(", message);

        console.log(message.senderId == globleuser?.data?._id);
        const messageType =
          message.senderId == globleuser?.data?._id ? "receiver" : "sender";
        const name =
          message.senderId == globleuser?.data?._id
            ? "Admin Wedcell"
            : message.senderId == selected?.prospectId
            ? selected.prospectName
            : selected.vendorName;

        const transformedMessage = {
          time: new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          type: messageType,
          textFileType: message.messageType,
          name: name,
          img: "",
          message: message.message,
          _id: message._id,
          forwarded: message.forwarded,
          replyOf: message.replyOf,
        };

        transformedMessages.push(transformedMessage);
      });

      // console.log('tr', transformedMessages);
      setModifiedMsgs(transformedMessages);
    }
  }
  function transformMessages(messages) {
    console.log("MMM", messages);
    if (selected && AllMEssages) {
      console.log("msgs", messages);

      const allM = [];
      const transformedMessages = [...modifiedMsgs];

      messages.forEach((message) => {
        console.log(message.senderId == globleuser?.data?._id);
        const messageType =
          message.senderId == globleuser?.data?._id ? "receiver" : "sender";
        const name =
          message.senderId == globleuser?.data?._id
            ? "Admin Wedcell"
            : message.senderId == selected?.prospectId
            ? selected.prospectName
            : selected.vendorName;

        const transformedMessage = {
          time: new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          type: messageType,
          textFileType: message.messageType,
          name: name,
          img: "",
          message: message.message,
          _id: message._id,
          forwarded: message.forwarded,
          replyOf: message.replyOf,
        };

        transformedMessages.push(transformedMessage);
      });

      // console.log('tr', transformedMessages);
      setModifiedMsgs(transformedMessages); // Update AllMEssages state
    }
  }
  const getMsg = async () => {
    const config = {
      headers: {
        authorization: globleuser.data?.token,
      },
    };
    const result = await axios.post(
      `${PROXY}/contacts/getone`,
      {
        id: router.query.id,
        page: 1,
      },
      config
    );
    console.log("ID", result.data);
    result.data && setSelected(result.data.data);
    result.data && setALLmessages(result.data.data.messages);
  };
  const scrollTobottom = () => {
    const element = document.getElementById("messagebody");
    element && element.scrollTo(0, element.scrollHeight);
  };
  const sendMessage = async (fileurl, msgtype) => {
    const config = {
      headers: {
        authorization: JSON.parse(localStorage.getItem("wedcell"))?.data?.token,
      },
    };
    const arr = modifiedMsgs;
    let msgBody = {
      contactId: selected._id,
      senderId: globleuser?.data?._id,
      receiverId: [selected.prospectId],
      message: fileurl ? fileurl : message,
      messageType: msgtype,
    };
    rplyMsg
      ? (msgBody.replyOf = {
          msgId: rplyMsg._id,
          sender: rplyMsg.name,
          msg: rplyMsg.message,
          msgType: rplyMsg.textFileType,
        })
      : null;
    const res = await axios.post(
      `${PROXY}/contacts/addmessage`,
      msgBody,
      config
    );
    console.log("VVVassa", res.data);
    const newMsg = {
      message: fileurl ? fileurl : message,
      messageType: msgtype,
      textFileType: msgtype,
      type: "receiver",
      img: "",
      time: new Date(Date.now()).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      name: "Admin Wedcell",
      _id: res.data.data._id,
      forwarded: message?.forwarded,
    };
    rplyMsg
      ? (newMsg.replyOf = {
          msgId: rplyMsg._id,
          sender: rplyMsg.name,
          msg: rplyMsg.message,
          msgType: rplyMsg.textFileType,
        })
      : null;
    arr.push(newMsg);
    setModifiedMsgs([...arr]);

    setMessage("");
    let socketBody = {
      data: res.data.data,
      msgId: res.data.msgId,
      messageBody: {
        contactId: selected._id,
        senderId: globleuser?.data?._id,
        senderName: "Admin Wedcell",
        receiverId: selected.prospectId,
        time: new Date(Date.now()).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        message: fileurl ? fileurl : message,
        messageType: msgtype,
      },
    };
    rplyMsg
      ? (socketBody.replyOf = {
          msgId: rplyMsg._id,
          sender: rplyMsg.name,
          msg: rplyMsg.message,
          msgType: rplyMsg.textFileType,
        })
      : null;
    socketRef.current.emit("message", socketBody);
    setRplyMsg(null);
    // console.log('shdfjasf', res.data)
  };
  // console.log('SELECTED', selected)

  const joinSelf = () => {
    console.log("EMIT", globleuser?.data?._id);
    socketRef.current &&
      socketRef.current.emit("joinSelf", globleuser?.data?._id);
  };

  useEffect(() => {
    socketRef.current = io.connect(PROXY);
    console.log("connected to socket");

    return () => {
      console.log("disconnecting from socket");
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    globleuser && getMsg();
  }, [globleuser, router.query.id]);

  useEffect(() => {
    scrollTobottom();
  }, [modifiedMsgs, showAllMessage]);

  useEffect(() => {
    selected && AllMEssages
      ? transformMessagesForFirstTime(AllMEssages)
      : console.log("err");
  }, [AllMEssages]);

  useEffect(() => {
    joinSelf();
  }, [globleuser]);

  useEffect(() => {
    latest &&
      selected &&
      selected._id == latest.msgId &&
      transformMessages([latest.data]);
  }, [latest]);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on("message", (data) => {
        console.log("Received message:", data);
        console.log("SELECTED", AllMEssages);
        setLatest(data);
      });
    }
    return () => {
      if (socketRef.current) {
        socketRef.current.off("message");
      }
    };
  }, []);

  return (
    <>
      {/* <ForwardMsg
        isOpen={true}
        setOpenModal={setOpenModalForward}
        user={globleuser?.data}
        message={frwdMsg}
        openModal={openModalForward}
      ></ForwardMsg> */}
      <div
        className={styles.VendorManagerDiv}
        style={{
          // marginTop: windowWidth > 900 ? "100px" : "67px",
          paddingBottom: "0px",
          gap: "0px",
        }}
      >
        {windowWidth > 900 ? (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                height: `calc(100vh)`,
              }}
            >
              <div
                className={styles.VendorManagerBody1}
                style={{
                  padding: "0px",
                  width: "100%",
                  gap: "0px",
                  justifyContent: "center",
                }}
              >
                <div className={styles.bodyRightSec} style={{ width: "100%" }}>
                  <div
                    className={styles.rightsecbody}
                    style={{ height: "100%" }}
                  >
                    <>
                      {selected && (
                        <div className={styles.messagediv}>
                          <div
                            className={styles.messagedivhead}
                            style={{ borderRadius: "0px" }}
                          >
                            <div className={styles.messagedivheadleft}>
                              <span
                                style={{ cursor: "pointer" }}
                                onClick={() => router.back()}
                              >
                                <ArrowBackIcon></ArrowBackIcon>
                              </span>
                              <img
                                className={styles.messagedivheadImg}
                                src={selected?.vendorImage}
                                alt={selected?.vendorName?.substring(0, 1)}
                              />
                              {/* <div className={styles.messagedivheadImg}>A</div> */}
                              <div className={styles.messagedivheadnameOnline}>
                                <span className={styles.messageheadname}>
                                  {/* <Link
                                    href={
                                      selected.vendorType == "venue"
                                        ? `/venue/${selected.vendorId}`
                                        : `/vendors/${selected.vendorId}`
                                    }
                                    passHref
                                  > */}
                                  <div>
                                    {selected
                                      ? selected.prospectName
                                      : "Open a Chat"}
                                  </div>
                                  {/* </Link> */}
                                  <span className={styles.memberonline}>
                                    {selected ? selected.prospectContact : ""}
                                  </span>
                                </span>
                              </div>
                            </div>
                            <div className={styles.messagehead3dots}>
                              <MoreVertSharpIcon></MoreVertSharpIcon>
                            </div>
                          </div>
                          <div className={styles.messagedivbody}>
                            <div
                              id="messagebody"
                              style={{
                                padding: "20px 30px",
                                display: "flex",
                                flexDirection: "column",
                                gap: "20px",
                                height: "100%",
                                overflow: "scroll",
                              }}
                            >
                              {modifiedMsgs?.map((item, key) => {
                                return (
                                  <MegaMessage
                                    message={item}
                                    setDelMsg={setDelMsg}
                                    setFrwdMsg={setFrwdMsg}
                                    setOpenModalForward={setOpenModalForward}
                                    key={key}
                                    setRplyMsg={setRplyMsg}
                                  ></MegaMessage>
                                );
                              })}
                            </div>
                            <div
                              style={{
                                display: "flex",
                                backgroundColor: "#f4f4f4",
                                width: "100%",
                                // alignItems: 'center',
                                flexDirection: "column",
                              }}
                            >
                              <ThemeProvider theme={theme4}>
                                {rplyMsg && (
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      width: "90%",
                                      background: "rgba(0,0,0,.1)",
                                      borderRadius: "8px 8px 0px 0px",
                                      borderTop: "2px solid white",
                                      borderBottom: "2px solid rgba(0,0,0,.5)",
                                      marginTop: "10px",
                                      padding: "3px 10px",
                                      marginLeft: "10px",
                                      boxShadow:
                                        "1px 1px 2px 1px rgba(0,0,0,.5)",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                      }}
                                    >
                                      <span
                                        style={{
                                          fontSize: "17px",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        {rplyMsg.name}
                                      </span>
                                      {rplyMsg.textFileType == "image" ? (
                                        <img
                                          className={styles.myFilebody}
                                          height="100px"
                                          src={rplyMsg?.message}
                                        />
                                      ) : rplyMsg.textFileType == "video" ? (
                                        <video
                                          className={styles.myFilebody}
                                          height="100px"
                                        >
                                          <source
                                            src={rplyMsg?.message}
                                            type="video/mp4"
                                          />
                                          Your browser does not support the
                                          video tag.
                                        </video>
                                      ) : rplyMsg.textFileType === "doc" ? (
                                        <embed
                                          className={styles.myFilebody}
                                          src={rplyMsg?.message}
                                          type="application/pdf"
                                          width="70%"
                                          height="100px"
                                        />
                                      ) : (
                                        <span
                                          style={{
                                            fontSize: "17px",
                                          }}
                                        >
                                          {rplyMsg?.message?.substring(0, 30)}
                                          {rplyMsg?.message?.length > 30 &&
                                            "..."}
                                          {/* {rplyMsg.message} */}
                                        </span>
                                      )}
                                    </div>
                                    <CancelOutlinedIcon
                                      sx={{
                                        color: "rgba(0,0,0,.6)",
                                        fontWeight: "bold",
                                      }}
                                      onClick={() => {
                                        setRplyMsg(null);
                                      }}
                                    ></CancelOutlinedIcon>
                                    {/* <button
                                      onClick={() => {
                                        setRplyMsg(null);
                                      }}
                                    >
                                      Cancel
                                    </button> */}
                                  </div>
                                )}
                                <TextField
                                  label=""
                                  placeholder="Type Your Message..."
                                  // variant="filled"
                                  fullWidth
                                  value={message}
                                  onChange={(e) => {
                                    setMessage(e.target.value);
                                  }}
                                  sx={{ backgroundColor: "#f4f4f4" }}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      e.preventDefault(); // Prevent the default Enter key behavior (e.g., adding a new line)
                                      sendMessage(null, "text"); // Call your sendMessage function here
                                    }
                                  }}
                                  // margin="dense"
                                  size="large"
                                  multiline
                                  InputProps={{
                                    endAdornment: (
                                      <InputAdornment>
                                        <label
                                          htmlFor="file-input"
                                          className={styles.fileLabel}
                                        >
                                          <input
                                            type="file"
                                            id="file-input"
                                            className={styles.fileInput}
                                            onChange={(e) =>
                                              uploadFile(e.target.files[0])
                                            }
                                            accept=".jpg, .jpeg, .png, .gif,.mp4, .mov, .avi"
                                          />
                                          <ImageIcon
                                            sx={{
                                              fontSize: "25px",
                                              marginRight: "5px",
                                              color: "rgba(0,0,0,.6)",
                                            }}
                                          />
                                        </label>

                                        <label
                                          htmlFor="file-input"
                                          className={styles.fileLabel}
                                        >
                                          <input
                                            type="file"
                                            id="file-input"
                                            className={styles.fileInput}
                                            onChange={(e) =>
                                              uploadFile(e.target.files[0])
                                            }
                                            accept=".pdf"
                                          />
                                          <PictureAsPdfIcon
                                            sx={{
                                              fontSize: "25px",
                                              marginRight: "5px",
                                              color: "rgba(0,0,0,.6)",
                                            }}
                                          />
                                        </label>
                                        <div
                                          style={{
                                            height: "25px",
                                            borderRight: "2px solid darkgrey",
                                            marginRight: "2px",
                                            marginLeft: "5px",
                                          }}
                                        ></div>
                                        <IconButton
                                          onClick={() =>
                                            sendMessage(null, "text")
                                          }
                                        >
                                          <SendIcon
                                            sx={{
                                              color: "#d43f7a",
                                              transform:
                                                "rotate(-40deg) translateX(5px)",
                                            }}
                                          />
                                        </IconButton>
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                              </ThemeProvider>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                    {/* // )} */}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* <div
              className={styles.checkListhead}
              style={{
                display: 'flex',
                flexDirection: 'row',
                padding: '10px 3%',
                border: 'none',
                marginBottom: '0px',
              }}
            >
              <div
                className={styles.checkListhead1}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  // padding: "20px 6%",
                  fontSize: '18px',
                  gap: '5px',
                  width: '80%',
                  fontWeight: '600',
                }}
              >
                <span
                  className={styles.VendorManagerspan1}
                  style={{ fontSize: '35px', padding: '0px' }}
                >
                  Messages
                </span>
              </div>
              <div className={styles.DownloadAndPrintdiv1}></div>
            </div> */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                height: "calc(100vh - 132px)",
              }}
            >
              <div
                className={styles.VendorManagerBody1}
                style={{
                  padding: "0px",
                  width: "100%",
                  gap: "20px",
                  justifyContent: "center",
                }}
              >
                {selected && (
                  <div
                    className={styles.bodyRightSec}
                    style={{ width: "100%" }}
                  >
                    <div
                      className={styles.rightsecbody}
                      style={{ height: "100%" }}
                    >
                      <div className={styles.messagediv}>
                        <div
                          className={styles.messagedivhead}
                          style={{ borderRadius: "0px" }}
                        >
                          <div className={styles.messagedivheadleft}>
                            <ArrowBackIcon
                              onClick={() => setShowAllMessage(false)}
                              sx={{ fontSize: "18px" }}
                            ></ArrowBackIcon>
                            <img
                              className={styles.messagedivheadImg}
                              src={selected.vendorImage}
                              alt={selected.vendorName.substring(0, 1)}
                            />
                            {/* <div className={styles.messagedivheadImg}>A</div> */}
                            <div className={styles.messagedivheadnameOnline}>
                              <span className={styles.messageheadname}>
                                {selected
                                  ? selected.prospectName +
                                    ", " +
                                    selected.vendorName
                                  : "DEMO"}
                                <span className={styles.memberonline}>
                                  {selected ? selected.vendorContact : "DEMO"}
                                </span>
                              </span>
                            </div>
                          </div>
                          <div className={styles.messagehead3dots}>
                            <MoreVertSharpIcon></MoreVertSharpIcon>
                          </div>
                        </div>
                        <div className={styles.messagedivbody}>
                          <div
                            id="messagebody"
                            style={{
                              padding: "20px 30px",
                              display: "flex",
                              flexDirection: "column",
                              gap: "20px",
                              height: "100%",
                              overflow: "scroll",
                            }}
                          >
                            {modifiedMsgs?.map((item, key) => {
                              return (
                                <MegaMessage
                                  message={item}
                                  setDelMsg={setDelMsg}
                                  setFrwdMsg={setFrwdMsg}
                                  setOpenModalForward={setOpenModalForward}
                                  key={key}
                                  setRplyMsg={setRplyMsg}
                                ></MegaMessage>
                              );
                            })}
                          </div>

                          {/* <div
                            style={{
                              display: "flex",
                              backgroundColor: "rgba(0, 0, 0, 0.06)",
                            }}> */}
                          {/* <div
                              className={styles.fileUploadContainer}
                              style={{ width: "100px", gap: "10px" }}>
                              <label
                                htmlFor="file-input"
                                className={styles.fileLabel}>
                                <input
                                  type="file"
                                  id="file-input"
                                  className={styles.fileInput}
                                  onChange={(e) =>
                                    uploadFile(e.target.files[0])
                                  }
                                  accept=".jpg, .jpeg, .png, .gif,.mp4, .mov, .avi"
                                />
                                <ImageIcon
                                  sx={{
                                    fontSize: "25px",
                                    color: "rgba(0,0,0,.6)",
                                  }}
                                />
                              </label>

                              <label
                                htmlFor="file-input"
                                className={styles.fileLabel}>
                                <input
                                  type="file"
                                  id="file-input"
                                  className={styles.fileInput}
                                  onChange={(e) =>
                                    uploadFile(e.target.files[0])
                                  }
                                  accept=".pdf"
                                />
                                <PictureAsPdfIcon
                                  sx={{
                                    fontSize: "25px",
                                    color: "rgba(0,0,0,.6)",
                                  }}
                                />
                              </label>
                            </div> */}
                          <div
                            style={{
                              display: "flex",
                              backgroundColor: "#f4f4f4",
                              width: "100%",
                              alignItems: "center",
                              flexDirection: "column",
                            }}
                          >
                            <ThemeProvider theme={theme4}>
                              {rplyMsg && (
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    width: "95%",
                                    background: "rgba(0,0,0,.1)",
                                    borderRadius: "8px 8px 0px 0px",
                                    borderTop: "2px solid white",
                                    borderBottom: "2px solid rgba(0,0,0,.5)",
                                    marginTop: "10px",
                                    padding: "3px 10px",
                                    // marginLeft: '10px',
                                    boxShadow: "1px 1px 2px 1px rgba(0,0,0,.5)",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontSize: "17px",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      {rplyMsg.name}
                                    </span>
                                    {rplyMsg.textFileType == "image" ? (
                                      <img
                                        className={styles.myFilebody}
                                        height="100px"
                                        src={rplyMsg?.message}
                                      />
                                    ) : rplyMsg.textFileType == "video" ? (
                                      <video
                                        className={styles.myFilebody}
                                        height="100px"
                                      >
                                        <source
                                          src={rplyMsg?.message}
                                          type="video/mp4"
                                        />
                                        Your browser does not support the video
                                        tag.
                                      </video>
                                    ) : rplyMsg.textFileType === "doc" ? (
                                      <embed
                                        className={styles.myFilebody}
                                        src={rplyMsg?.message}
                                        type="application/pdf"
                                        width="70%"
                                        height="100px"
                                      />
                                    ) : (
                                      <span
                                        style={{
                                          fontSize: "17px",
                                        }}
                                      >
                                        {rplyMsg?.message?.substring(0, 30)}
                                        {rplyMsg?.message?.length > 30 && "..."}
                                        {/* {rplyMsg.message} */}
                                      </span>
                                    )}
                                  </div>
                                  <CancelOutlinedIcon
                                    sx={{
                                      color: "rgba(0,0,0,.6)",
                                      fontWeight: "bold",
                                    }}
                                    onClick={() => {
                                      setRplyMsg(null);
                                    }}
                                  ></CancelOutlinedIcon>
                                  {/* <button
                                      onClick={() => {
                                        setRplyMsg(null);
                                      }}
                                    >
                                      Cancel
                                    </button> */}
                                </div>
                              )}
                              <TextField
                                label=""
                                placeholder="Type Your Message..."
                                // variant="filled"
                                fullWidth={true}
                                value={message}
                                onChange={(e) => {
                                  setMessage(e.target.value);
                                }}
                                sx={{ backgroundColor: "#f4f4f4" }}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault(); // Prevent the default Enter key behavior (e.g., adding a new line)
                                    sendMessage(null, "text"); // Call your sendMessage function here
                                  }
                                }}
                                // margin="dense"
                                size="large"
                                multiline
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment>
                                      <label
                                        htmlFor="file-input"
                                        className={styles.fileLabel}
                                      >
                                        <input
                                          type="file"
                                          id="file-input"
                                          className={styles.fileInput}
                                          onChange={(e) =>
                                            uploadFile(e.target.files[0])
                                          }
                                          accept=".jpg, .jpeg, .png, .gif,.mp4, .mov, .avi"
                                        />
                                        <ImageIcon
                                          sx={{
                                            fontSize: "25px",
                                            marginRight: "5px",
                                            color: "rgba(0,0,0,.6)",
                                          }}
                                        />
                                      </label>

                                      <label
                                        htmlFor="file-input"
                                        className={styles.fileLabel}
                                      >
                                        <input
                                          type="file"
                                          id="file-input"
                                          className={styles.fileInput}
                                          onChange={(e) =>
                                            uploadFile(e.target.files[0])
                                          }
                                          accept=".pdf"
                                        />
                                        <PictureAsPdfIcon
                                          sx={{
                                            fontSize: "25px",
                                            marginRight: "5px",
                                            color: "rgba(0,0,0,.6)",
                                          }}
                                        />
                                      </label>
                                      <div
                                        style={{
                                          height: "25px",
                                          borderRight: "2px solid darkgrey",
                                          marginRight: "2px",
                                          marginLeft: "5px",
                                        }}
                                      ></div>
                                      <IconButton
                                        onClick={() =>
                                          sendMessage(null, "text")
                                        }
                                      >
                                        <SendIcon
                                          sx={{
                                            color: "#d43f7a",
                                            transform:
                                              "rotate(-40deg) translateX(5px)",
                                          }}
                                        />
                                      </IconButton>
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </ThemeProvider>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Msg;
