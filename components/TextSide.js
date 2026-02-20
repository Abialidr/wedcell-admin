import React, { useEffect, useRef, useState } from 'react';
import { SelectedLayers } from './SelectedLayers.js';
// import { useAsync } from 'react-use';
import axios from 'axios';
import XIcon from '@duyank/icons/regular/X';
import { isMobile } from 'react-device-detect';
import { useEditor } from '@adojs/editor';
import { Box, MenuItem, Modal, Select, TextField } from '@mui/material';
import { TextContent as TextContent2 } from '@adojs/core';
import { functionToDwnload } from './canvaFunction2.js';
import { PROXY } from 'config/index.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import compressAndAppendFiles from './compressAndAppendFiles.js';
const TextSide = () => {
  const [update, setUpdate] = useState(false);
  const [update1, setUpdate1] = useState(false);
  const [TypeArray, setTypeArray] = useState([]);
  const [selectedType, setselectedType] = useState('All');
  const [selectedType1, setselectedType1] = useState('NotSelected');
  const [addtype, setAddtype] = useState(false);
  const [type, settype] = useState();
  useEffect(() => {
    try {
      const getComp = async () => {
        const res = await axios.get(`${PROXY}/adminessentials/component`);
        setTypeArray(res.data.data.TextTypes);
      };
      getComp();
    } catch (e) {
      console.log(`🚀 ~ file: Lines.jsx:59 ~ useEffect ~ e:`, e);
    }
  }, [update1]);
  const inputFileRef = useRef(null);
  const [root, setRoot] = React.useState();
  const { actions, layers, serialize } = useEditor((state, query) => {
    return {
      layers: state?.selectedLayers,
      serialize: query.serialize,
    };
  });

  const [texts, setTexts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const useFunc = async () => {
    const response = await axios.get(
      `${PROXY}/inviteText?type=Text&&Subtype=${
        selectedType === 'All' ? 'false' : selectedType
      }`
    );
    setTexts(response.data.data);
    setIsLoading(false);
  };
  useEffect(() => {
    try {
      useFunc();
    } catch (e) {
      toast.error(`Something went wrong`, {
        position: 'top-right',
        autoClose: 1000,
      });
    }
  }, [update, selectedType]);
  const handleUpload = async (e) => {
    const file = e.target.files && e.target.files[0];
    const data = root;
    try {
      const formData = new FormData();
      const compressImg = await compressAndAppendFiles(file);
      formData.append("Img", compressImg);
      formData.append('data', JSON.stringify(data));
      const res = await axios.put(
        `${PROXY}/inviteText/upload?type=Text&&Subtype=${
          selectedType1 === 'NotSelected' ? 'false' : selectedType1
        }`,
        formData
      );
      toast.success(`Template Saved`, {
        position: 'top-right',
        autoClose: 1000,
      });
      setUpdate(!update);
    } catch (e) {
      console.log(`🚀 ~ file: TemplateContent.jsx:28 ~ handleSave1 ~ e:`, e);
      toast.error(`Something Went Wrong`, {
        position: 'top-right',
        autoClose: 1000,
      });
    }
  };

  const handleAddText = (data) => {
    actions.addLayerTree(data);
    if (isMobile) {
      onClose();
    }
  };

  const i = useRef(null);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    let pages = serialize();
    pages = pages[0].layers;
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
        root.layers[data].type.resolvedName === 'TextLayer' ||
        root.layers[data].type.resolvedName === 'GroupLayer'
      );
    });
    if (isValid) {
      setRoot(root);
      setOpen(true);
    } else {
      toast.error(`Select Proper Layer With Text`, {
        position: 'top-right',
        autoClose: 1000,
      });
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'fit-content',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px',
    height: 'fit-content',
    overflow: 'scroll',
    display: 'flex',
    zIndex: '-1',
    flexDirection: 'column',
    gap: '20px',
  };
  const handleAdType = async () => {
    if (type) {
      try {
        const res = await axios.put(
          `${PROXY}/adminessentials/component?type=TextType`,
          {
            value: type,
          }
        );
        if (res.data.success) {
          settype('');
          setAddtype(false);
          setUpdate1(!update1);
        } else {
          toast.error(`Value Already Exist`, {
            position: 'top-right',
            autoClose: 1000,
          });
        }
      } catch (e) {
        console.log(`🚀 ~ file: Lines.jsx:99 ~ handleAdType ~ e:`, e);
      }
    } else {
      alert('Enter Type');
    }
  };
  const style1 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '350px',
    bgcolor: 'background.paper',
    // border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: '10px',
    height: 'fit-content',
    overflow: 'scroll',
    display: 'flex',
    // paddingTop: "270px",
    zIndex: '-1',
    flexDirection: 'column',
    gap: '20px',
  };
  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => {
    setOpen1(true);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };
  return (
    <>
      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style1}>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <Select
              fullWidth
              value={selectedType1}
              onChange={(e) => setselectedType1(e.target.value)}
            >
              <MenuItem
                sx={{ color: 'gray' }}
                value={'NotSelected'}
              >
                ---Select Subtype---
              </MenuItem>
              {TypeArray?.map((data, key) => {
                return <MenuItem value={data}>{data}</MenuItem>;
              })}
            </Select>
            <button onClick={() => setAddtype(!addtype)}>
              {addtype ? '-' : '+'}
            </button>
          </div>
          {addtype && (
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <TextField
                onChange={(e) => settype(e.target.value)}
                fullWidth
              ></TextField>
              <button onClick={() => handleAdType()}>Add</button>
            </div>
          )}
          {!addtype && (
            <button
              style={{
                padding: '5px',
                border: 'none',
                background: '#B4245D',
                color: 'white',
                fontSize: '15px',
                fontWeight: '600',
                borderRadius: '5px',
              }}
              onClick={() => {
                handleClose1();
                inputFileRef.current?.click();
              }}
            >
              Save
            </button>
          )}
        </Box>
      </Modal>
      <ToastContainer></ToastContainer>
      <div style={{ display: 'flex', gap: '10px', padding: '10px ' }}>
        <Select
          fullWidth
          value={selectedType}
          onChange={(e) => setselectedType(e.target.value)}
        >
          {TypeArray?.map((data, key) => {
            return (
              <MenuItem
                key={key}
                value={data}
              >
                {data}
              </MenuItem>
            );
          })}
          <MenuItem value='All'>{'All'}</MenuItem>
        </Select>
      </div>
      <button
        style={{
          margin: 16,
          background: '#3a3a4c',
          borderRadius: 8,
          color: '#fff',
          padding: '8px 16px',
          cursor: 'pointer',
          textAlign: 'center',
        }}
        onClick={() => {
          try {
            let pages = serialize();
            pages = pages[0].layers;

            const child = pages[layers[0]]?.child
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
                root.layers[data].type.resolvedName === 'TextLayer' ||
                root.layers[data].type.resolvedName === 'GroupLayer'
              );
            });
            if (isValid) {
              setRoot(root);
              handleOpen1();
            } else {
              toast.error(`Select Proper Layer With Text`, {
                position: 'top-right',
                autoClose: 1000,
              });
            }
          } catch (e) {
            toast.error(`Select Layer first`, {
              position: 'top-right',
              autoClose: 1000,
            });
          }
        }}
      >
        add Text
      </button>
      <input
        ref={inputFileRef}
        type={'file'}
        accept='image/png'
        style={{ display: 'none' }}
        onChange={handleUpload}
      />
      <button
        style={{
          margin: '0px 16px 16px 16px',
          background: '#3a3a4c',
          borderRadius: 8,
          color: '#fff',
          padding: '8px 16px',
          cursor: 'pointer',
          textAlign: 'center',
        }}
        onClick={handleOpen}
      >
        view preview
      </button>
      <div
        style={{ flexDirection: 'column', overflowY: 'auto', display: 'flex' }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            position: 'relative',
            width: '100%',
            height: 'fit-content',
            padding: '16px',
          }}
        >
          {isLoading && <div>Loading...</div>}
          {texts?.map((data, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                position: 'relative',
                width: '100%',
                border: '1px solid ',
                height: 'fit-content',
              }}
              onClick={() => {
                try {
                  handleAddText(JSON.parse(data.data));
                } catch (e) {
                  toast.error(`Something went wrong`, {
                    position: 'top-right',
                    autoClose: 1000,
                  });
                }
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  zIndex: '100',
                  right: '0px',
                  top: '0px',
                  fontSize: '20px',
                  fontWeight: '500',
                }}
                onClick={async (e) => {
                  try {
                    e.stopPropagation();
                    e.preventDefault();
                    confirmAlert({
                      title: 'Confirm Delete',
                      message: `Are you sure you want to delete this Element`,
                      buttons: [
                        {
                          label: 'Yes',
                          onClick: async () => {
                            try {
                              const res = await axios.delete(
                                `${PROXY}/inviteText/${data._id}`
                              );
                              setUpdate(!update);
                              toast.success('Element delete successfully', {
                                position: 'top-right',
                                autoClose: 1000,
                              });
                            } catch (e) {
                              console.log(
                                `🚀 ~ file: UploadContent.jsx:189 ~ UploadContent ~ e:`,
                                e
                              );
                              toast.success('Something went wrong', {
                                position: 'top-right',
                                autoClose: 1000,
                              });
                            }
                          },
                        },
                        {
                          label: 'No',
                        },
                      ],
                    });
                  } catch (e) {
                    toast.error(`Something went wrong`, {
                      position: 'top-right',
                      autoClose: 1000,
                    });
                  }
                }}
              >
                <XIcon />
              </div>
              <img
                src={data.Images}
                style={{
                  padding: '5px',

                  height: '100%',
                  width: '100%',
                  objectFit: 'contain',
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <button
            onClick={() => {
              try {
                functionToDwnload(i, 1);
              } catch (e) {
                toast.error(`Something went wrong`, {
                  position: 'top-right',
                  autoClose: 1000,
                });
              }
            }}
          >
            Download
          </button>
          {root ? (
            root?.layers[root?.rootId]?.type.resolvedName === 'GroupLayer' ? (
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
                  position: 'relative',
                  transform: ` rotate(${
                    root?.layers[root.rootId].props.rotate
                  }deg) scale(${root?.layers[root.rootId].props.scale})`,
                  transformOrigin: '0 0',
                  pointerEvents: 'none',
                  backgroundColor: 'white',
                }}
              >
                {root?.layers[root.rootId].child.map((childId2) =>
                  SelectedLayers(root?.layers[childId2], 'NOTROOT')
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
                  position: 'relative',
                  transform: ` rotate(${
                    root?.layers[root.rootId].props.rotate
                  }deg) scale(${root?.layers[root.rootId].props.scale})`,
                  transformOrigin: '0 0',
                  backgroundColor: 'white',
                  pointerEvents: 'none',
                }}
                ref={i}
              >
                {SelectedLayers(root?.layers[root.rootId], 'ROOT')}
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

export default TextSide;
