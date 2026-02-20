import React, { useEffect, useRef, useState } from 'react';
import XIcon from '@duyank/icons/regular/X';
import { isMobile } from 'react-device-detect';
import { useEditor } from '@adojs/editor';
import { fetchSvgContent } from '@adojs/utils';
import axios from 'axios';
import { PROXY } from '../../../config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Box, MenuItem, Modal, Select, TextField } from '@mui/material';
import compressAndAppendFilesSingle from 'components/compressAndAppendFilesSingle';
const Lines = ({ visibility, onClose }) => {
  const inputFileRef = useRef(null);
  const { actions } = useEditor();

  const [images, setImages] = useState([]);

  const addImage = async (url) => {
    const img = new Image();
    img.src = url;
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      actions.addImageLayer(
        { url, thumb: url },
        { width: img.naturalWidth, height: img.naturalHeight }
      );
      if (isMobile) {
        onClose();
      }
    };
  };

  const addSvg = async (url) => {
    const ele = await fetchSvgContent(url);
    const viewBox = ele.getAttribute('viewBox')?.split(' ') || [];
    const width =
      viewBox.length === 4 ? +viewBox[2] : +(ele.getAttribute('width') || 100);
    const height =
      viewBox.length === 4 ? +viewBox[3] : +(ele.getAttribute('height') || 100);
    actions.addSvgLayer(url, { width, height }, ele);
    if (isMobile) {
      onClose();
    }
  };
  const [update, setUpdate] = useState(false);
  const [update1, setUpdate1] = useState(false);
  const [adminImg, setAdminImg] = useState();
  const [addtype, setAddtype] = useState(false);
  const [type, setType] = useState();
  const [isloading, setIsLoading] = useState(true);
  const [addSubtype, setAddSubtype] = useState(false);
  const [Subtype, setSubtype] = useState();
  const [selectedtype, setSelectedType] = useState('All');
  const [selectedtype1, setSelectedType1] = useState();
  const [compArray, setCompArray] = useState([]);
  const [selectedSubtype, setSelectedSubType] = useState('NotSelected');
  const [selectedSubtype1, setSelectedSubType1] = useState('NotSelected');
  const [SubArray, setSubArray] = useState([]);
  useEffect(() => {
    try {
      const getComp = async () => {
        const res = await axios.get(`${PROXY}/adminessentials/component`);
        setCompArray(res.data.data.data);
        setSubArray(res.data.data.subTypes);
        setSelectedType1(res.data.data.data[0]);
      };
      getComp();
    } catch (e) {
      console.log(`🚀 ~ file: Lines.jsx:59 ~ useEffect ~ e:`, e);
    }
  }, [update1]);
  useEffect(() => {
    try {
      setIsLoading(true);
      const getallImg = async () => {
        const res = await axios.get(
          `${PROXY}/inviteImg/getAdmin?type=${
            selectedtype !== 'All' ? selectedtype : ''
          }&&Subtype=${selectedSubtype1 !== 'NotSelected' && selectedSubtype1}`
        );
        setImages(res.data.data);
        setIsLoading(false);
      };
      getallImg();
    } catch (e) {
      toast.error(`Something went wrong`, {
        position: 'top-right',
        autoClose: 1000,
      });
    }
  }, [update, selectedtype, selectedSubtype1]);
  const handleUpload = async (e) => {
    try {
      confirmAlert({
        title: `Add Image in ${selectedtype1} ${
          selectedSubtype !== 'NotSelected'
            ? `in Subtype ${selectedSubtype}`
            : ''
        }`,
        message: `Are you sure you want to Add this Element`,
        buttons: [
          {
            label: 'Yes',
            onClick: async () => {
              try {
                let file = e.target.files && e.target.files[0];
                file = await compressAndAppendFilesSingle(file);
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = async () => {
                    try {
                      const res = await axios.put(
                        `${PROXY}/inviteImg/uploadAdmin`,
                        {
                          dataurl: reader.result,
                          type1:
                            file.type === 'image/svg+xml' ? 'svg' : 'image',
                          type2: selectedtype1,
                          Subtype:
                            selectedSubtype !== 'NotSelected' &&
                            selectedSubtype,
                        }
                      );
                      setSelectedSubType('NotSelected');
                      setUpdate(!update);
                    } catch (e) {
                      console.log(
                        `🚀 ~ file: Lines.jsx:117 ~ reader.onloadend= ~ e:`,
                        e
                      );
                    }
                  };
                  reader.readAsDataURL(file);
                }
              } catch (e) {
                console.log(
                  `🚀 ~ file: UploadContent.jsx:189 ~ UploadContent ~ e:`,
                  e
                );
                toast.error('Something went wrong', {
                  position: 'top-right',
                  autoClose: 1000,
                });
              }
            },
          },
          {
            label: 'No',
            onClick: () => {
              setSelectedSubType('NotSelected');
            },
          },
        ],
      });
    } catch (e) {
      toast.error(`Something Went Wrong`, {
        position: 'top-right',
        autoClose: 1000,
      });
    }
  };
  const handleAdType = async () => {
    if (type) {
      try {
        const res = await axios.put(`${PROXY}/adminessentials/component`, {
          value: type,
        });
        if (res.data.success) {
          setType('');
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
  const handleAdSubType = async () => {
    if (Subtype) {
      try {
        const res = await axios.put(
          `${PROXY}/adminessentials/component?type=Subtype`,
          {
            value: Subtype,
          }
        );
        if (res.data.success) {
          setSubtype('');
          setAddSubtype(false);
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
      alert('Enter SubType');
    }
  };
  const style = {
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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        overflowY: 'auto',
        display: visibility ? 'flex' : 'none',
      }}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <Select
              fullWidth
              value={selectedtype1}
              onChange={(e) => setSelectedType1(e.target.value)}
            >
              {compArray?.map((data, key) => {
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
                onChange={(e) => setType(e.target.value)}
                fullWidth
              ></TextField>
              <button onClick={() => handleAdType()}>Add</button>
            </div>
          )}
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <Select
              fullWidth
              value={selectedSubtype}
              onChange={(e) => setSelectedSubType(e.target.value)}
            >
              <MenuItem
                sx={{ color: 'gray' }}
                value={'NotSelected'}
              >
                ---Select Subtype---
              </MenuItem>
              {SubArray?.map((data, key) => {
                return <MenuItem value={data}>{data}</MenuItem>;
              })}
            </Select>
            <button onClick={() => setAddSubtype(!addSubtype)}>
              {addSubtype ? '-' : '+'}
            </button>
          </div>
          {addSubtype && (
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <TextField
                onChange={(e) => setSubtype(e.target.value)}
                fullWidth
              ></TextField>
              <button onClick={() => handleAdSubType()}>Add</button>
            </div>
          )}
          {!addSubtype && !addtype && (
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
                handleClose();
                inputFileRef.current?.click();
              }}
            >
              Save
            </button>
          )}
        </Box>
      </Modal>
      <ToastContainer></ToastContainer>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          height: 48,
          borderBottom: '1px solid rgba(57,76,96,.15)',
          padding: '0 20px',
        }}
      >
        <p
          style={{
            fontWeight: 600,
            fontSize: '15px',
            color: '#181C32',
            flexGrow: 1,
            marginBottom: '0px',
          }}
        >
          Upload Elements
        </p>
        <div
          style={{
            fontSize: 20,
            flexShrink: 0,
            width: 32,
            height: 32,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={onClose}
        >
          <XIcon />
        </div>
      </div>
      <div style={{ display: 'flex', gap: '10px', padding: '10px ' }}>
        <Select
          fullWidth
          value={selectedtype !== '' ? selectedtype : ''}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          {compArray?.map((data, key) => {
            return <MenuItem value={data}>{data}</MenuItem>;
          })}
          <MenuItem value='All'>{'All'}</MenuItem>
        </Select>
        <Select
          fullWidth
          value={selectedSubtype1}
          onChange={(e) => setSelectedSubType1(e.target.value)}
        >
          <MenuItem
            sx={{ color: 'gray' }}
            value={'NotSelected'}
          >
            ---Select Subtype---
          </MenuItem>
          {SubArray?.map((data, key) => {
            return <MenuItem value={data}>{data}</MenuItem>;
          })}
        </Select>
      </div>
      <div
        style={{
          margin: 16,
          background: '#3a3a4c',
          borderRadius: 8,
          color: '#fff',
          padding: '8px 16px',
          cursor: 'pointer',
          textAlign: 'center',
        }}
        onClick={() => handleOpen()}
      >
        Upload
      </div>
      <input
        ref={inputFileRef}
        type={'file'}
        accept='image/*'
        style={{ display: 'none' }}
        onChange={handleUpload}
      />
      <div style={{ padding: '16px' }}>
        {isloading ? (
          <>Loading...</>
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              position: 'relative',
              width: '100%',
              border: images?.length ? '1px solid' : 'none',
              height: 'fit-content',
              flexDirection: 'column',
              gap: '5px',
            }}
          >
            {images.map((item, idx) => (
              <>
                <div
                  key={idx}
                  style={{
                    cursor: 'pointer',
                    position: 'relative',
                    border: '1px solid gray',
                    width: '100%',
                  }}
                  onClick={() => {
                    try {
                      item.type1 === 'image'
                        ? addImage(item.dataurl)
                        : addSvg(item.dataurl);
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
                                    `${PROXY}/inviteImg/${item._id}`
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
                                  toast.error('Something went wrong', {
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
                  <div style={{ height: 0 }} />
                  <div
                    style={{
                      padding: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <img
                      src={item.dataurl}
                      loading='lazy'
                      style={{
                        maxHeight: '100%',
                        height: '100%',
                        width: '100%',
                      }}
                    />
                  </div>
                </div>
              </>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Lines;
