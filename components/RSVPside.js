import React, { useEffect, useRef, useState } from 'react';
import { SelectedLayers } from './SelectedLayers.js';
import axios from 'axios';
import XIcon from '@duyank/icons/regular/X';
import { isMobile } from 'react-device-detect';
import { useEditor } from '@adojs/editor';
import { Box, Modal, TextField } from '@mui/material';
import { TextContent as TextContent2 } from '@adojs/core';
import { functionToDwnload } from './canvaFunction2.js';
import { PROXY } from 'config/index.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import compressAndAppendFiles from './compressAndAppendFiles.js';
const RSVPside = ({ onClose }) => {
  const [update, setUpdate] = useState(false);

  const inputFileRef = useRef(null);
  const [root, setRoot] = React.useState();
  const { actions, layers, serialize, activePage } = useEditor(
    (state, query) => {
      return {
        // pages: state?.pages,
        layers: state?.selectedLayers,
        serialize: query.serialize,
        activePage: state?.activePage,
      };
    }
  );

  const [texts, setTexts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const useFunc = async () => {
    const response = await axios.get(`${PROXY}/inviteText?type=RSVP`);
    setTexts(response.data.data);
    setIsLoading(false);
  };
  useEffect(() => {
    try {
      useFunc();
    } catch (e) {
      toast.error(`Something went wrong`, {
        position: "top-right",
        autoClose: 1000,
      });
    }
  }, [update]);
  const handleUpload = async (e) => {
    const file = e.target.files && e.target.files[0];
    const data = root;
    try {
      const formData = new FormData();
      const compressImg = await compressAndAppendFiles(file);
      formData.append("Img", compressImg);
      formData.append("data", JSON.stringify(data));
      await axios.put(`${PROXY}/inviteText/upload?type=RSVP`, formData);
      toast.success(`Template Saved`, {
        position: "top-right",
        autoClose: 1000,
      });
      setUpdate(!update);
    } catch (e) {
      console.log(`🚀 ~ file: TemplateContent.jsx:28 ~ handleSave1 ~ e:`, e);
      toast.error(`Something Went Wrong`, {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };

  const handleAddText = (data1) => {
    try {
      const data2 = data1;
      const data = JSON.parse(data2);
      actions.addLayerTree(data);
      if (isMobile) {
        onClose();
      }
    } catch (e) {
      toast.error(`Something went wrong`, {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };

  const i = useRef(null);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    let pages = serialize();
    pages = pages[0].layers;
    actions.setProp(activePage, layers[activePage][0], {
      rsvp: true,
    });
    const child = pages[layers[0]].child
      .map((key) => {
        return [key, pages[key]];
      })
      .reduce((value, data) => {
        value[data[0]] = data[1];
        return value;
      }, {});

    const root = {
      rootId: layers[0][0],
      layers: {
        [layers[0]]: pages[layers[0]],
        ...child,
      },
    };
    const rootIds = Object.keys(root.layers);
    const isValid = rootIds.every((data, key) => {
      return root.layers[data].type.resolvedName === "TextLayer";
    });
    if (isValid) {
      setRoot(root);
      setOpen(true);
    } else {
      toast.error(`Select Proper Layer With Text`, {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "fit-content",
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
    height: "fit-content",
    overflow: "scroll",
    display: "flex",
    // paddingTop: "270px",
    zIndex: "-1",
    flexDirection: "column",
    gap: "20px",
  };
  return (
    <>
      <ToastContainer></ToastContainer>

      <button
        style={{
          margin: 16,
          background: "#3a3a4c",
          borderRadius: 8,
          color: "#fff",
          padding: "8px 16px",
          cursor: "pointer",
          textAlign: "center",
        }}
        onClick={() => {
          try {
            let pages = serialize();
            pages = pages[0].layers;
            if (layers[0][0]) {
              actions.setProp(activePage, layers[activePage][0], {
                rsvp: true,
              });
            }
            const child = pages[layers[0]].child
              .map((key) => {
                return [key, pages[key]];
              })
              .reduce((value, data) => {
                value[data[0]] = data[1];
                return value;
              }, {});
            const root = {
              rootId: layers[0][0],
              layers: {
                [layers[0]]: pages[layers[0]],
                ...child,
              },
            };
            const rootIds = Object.keys(root.layers);
            const isValid = rootIds.every((data, key) => {
              return (
                root.layers[data].type.resolvedName === "TextLayer" &&
                root.layers[data].props.text.includes(
                  "J7hPmWk2tR4Y8LqXvE5zNnD0cUj9AeV1f3S6"
                )
              );
            });
            if (isValid) {
              setRoot(root);
              inputFileRef.current?.click();
            } else {
              toast.error(`Select Proper Layer With Text`, {
                position: "top-right",
                autoClose: 1000,
              });
            }
          } catch (e) {
            toast.error(`Something went wrong`, {
              position: "top-right",
              autoClose: 1000,
            });
          }
        }}>
        add Text
      </button>
      <input
        ref={inputFileRef}
        type={"file"}
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleUpload}
      />
      <button
        style={{
          margin: "0px 16px 16px 16px",
          background: "#3a3a4c",
          borderRadius: 8,
          color: "#fff",
          padding: "8px 16px",
          cursor: "pointer",
          textAlign: "center",
        }}
        onClick={handleOpen}>
        view preview
      </button>
      <div
        style={{ flexDirection: "column", overflowY: "auto", display: "flex" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            position: "relative",
            width: "100%",
            height: "fit-content",
            padding: "16px",
          }}>
          {isLoading && <div>Loading...</div>}
          {texts?.map((data, idx) => (
            <div
              key={idx}
              style={{
                cursor: "pointer",
                position: "relative",
                width: "100%",
                border: "1px solid",
              }}
              onClick={() => handleAddText(data.data)}>
              <div
                style={{
                  position: "absolute",
                  zIndex: "100",
                  right: "0px",
                  top: "0px",
                  fontSize: "20px",
                  fontWeight: "500",
                }}
                onClick={async (e) => {
                  try {
                    e.stopPropagation();
                    e.preventDefault();
                    confirmAlert({
                      title: "Confirm Delete",
                      message: `Are you sure you want to delete this Element`,
                      buttons: [
                        {
                          label: "Yes",
                          onClick: async () => {
                            try {
                              const res = await axios.delete(
                                `${PROXY}/inviteText/${data._id}`
                              );
                              setUpdate(!update);
                              toast.success("Element delete successfully", {
                                position: "top-right",
                                autoClose: 1000,
                              });
                            } catch (e) {
                              console.log(
                                `🚀 ~ file: UploadContent.jsx:189 ~ UploadContent ~ e:`,
                                e
                              );
                              toast.error("Something went wrong", {
                                position: "top-right",
                                autoClose: 1000,
                              });
                            }
                          },
                        },
                        {
                          label: "No",
                        },
                      ],
                    });
                  } catch (e) {
                    toast.error(`Something went wrong`, {
                      position: "top-right",
                      autoClose: 1000,
                    });
                  }
                }}>
                <XIcon />
              </div>
              <img
                src={data.Images}
                style={{
                  padding: "5px",
                  height: "100%",
                  width: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <button
            onClick={() => {
              try {
                functionToDwnload(i, 1);
              } catch (e) {
                toast.error(`Something went wrong`, {
                  position: "top-right",
                  autoClose: 1000,
                });
              }
            }}>
            Download
          </button>
          {root ? (
            root?.layers[root?.rootId]?.type.resolvedName === "GroupLayer" ? (
              <div
                ref={i}
                style={{
                  height: `${
                    root?.layers[root.rootId].props.boxSize.height /
                    root?.layers[root.rootId].props.scale
                  }px`,
                  width: `${
                    root?.layers[root.rootId].props.boxSize.width /
                    root?.layers[root.rootId].props.scale
                  }px`,
                  position: "relative",
                  transform: ` rotate(${
                    root?.layers[root.rootId].props.rotate
                  }deg) scale(${root?.layers[root.rootId].props.scale})`,
                  transformOrigin: "0 0",
                  pointerEvents: "none",
                  backgroundColor: "white",
                }}>
                {root?.layers[root.rootId].child.map((childId2) =>
                  SelectedLayers(root?.layers[childId2], "NOTROOT")
                )}
              </div>
            ) : (
              <div
                style={{
                  height: `${
                    root?.layers[root.rootId].props.boxSize.height /
                    root?.layers[root.rootId].props.scale
                  }px`,
                  width: `${
                    root?.layers[root.rootId].props.boxSize.width /
                    root?.layers[root.rootId].props.scale
                  }px`,
                  position: "relative",
                  transform: ` rotate(${
                    root?.layers[root.rootId].props.rotate
                  }deg) scale(${root?.layers[root.rootId].props.scale})`,
                  transformOrigin: "0 0",
                  backgroundColor: "white",
                  pointerEvents: "none",
                }}
                ref={i}>
                {SelectedLayers(root?.layers[root.rootId], "ROOT")}
              </div>
            )
          ) : (
            <></>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default RSVPside;
