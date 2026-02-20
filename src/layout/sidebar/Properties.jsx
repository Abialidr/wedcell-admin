import React, { useEffect, useRef, useState } from 'react';
// import { useAsync } from 'react-use';
import axios from 'axios';
import XIcon from '@duyank/icons/regular/X';
import { isMobile } from 'react-device-detect';
import { useEditor } from '@/Canva-Core/editor';
import { Box, Modal, TextField } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
const Properties = ({ onClose, propertyName, setPropertyName, allLayers }) => {
  const { actions, pages, dragged, layers, activePage } = useEditor(
    (state) => ({
      pages: state?.pages,
      dragged: state?.dragData?.status,
      layers: state?.selectedLayers,
      activePage: state?.activePage,
    })
  );
  axios.defaults.baseURL = 'https://api-gilt-one.vercel.app/';
  const [ButtonEl, setButtonEl] = useState([]);
  const [texts, setTexts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const useFunc = async () => {
    const response = await axios.get('/texts');
    setTexts(response.data);
    setIsLoading(false);
  };
  const [handleclick, sethandleclick] = useState(false);
  useEffect(() => {
    useFunc();
  }, []);
  function checkAndRemove(propertyIdArray) {
    let array2 = propertyIdArray;
    let array1 = Object?.keys(pages[activePage]?.layers)?.map(
      (ids) => pages[activePage]?.layers[ids]?.data
    );
    array1 = [].concat(...array1);

    const idSet1 = array1.map(
      (obj) => obj?.props?.eventId && obj?.props?.eventId
    );
    const idSet2 = array2.map((obj) => obj?.propertyId);

    if (idSet1?.length && idSet2?.length) {
      const isExist = idSet2?.every((id) => idSet1?.includes(id));
      if (!isExist) {
        for (let i = 0; i < array2.length; i++) {
          const obj2 = array2[i];
          let foundInArray1;
          if (obj2.activePage === activePage) {
            foundInArray1 = array1?.some((obj1) => {
              return obj1?.props?.eventId === obj2?.propertyId;
            });
          } else {
            foundInArray1 = true;
          }
          if (!foundInArray1) {
            // Remove obj2 from array2

            array2.splice(i, 1);
            i--; // Decrement i to account for the removed element
          }
        }
        // setPropertyName(array2);
      }
    }
  }
  useEffect(() => {
    Object.keys(pages[activePage].layers).map((ids) => {
      const res = pages[activePage].layers[ids];
    });
  }, [Object.keys(pages[activePage].layers).length]);

  useEffect(() => {
    checkAndRemove(propertyName);
    // console.log(
    //   '🚀 ~ file: Properties.jsx:63 ~ useEffect ~ Object.keys(page1:',
    //   Object.keys(pages).length,
    //   allLayers.current.length,
    //   allLayers.current.length < Object.keys(pages).length
    // );
    // if (allLayers.current.length < Object.keys(pages).length && !dragged) {
    //   console.log('hello');
    //   sethandleclick(false);
    //   allLayers.current = Object.keys(pages);
    // } else if (
    //   allLayers.current.length > Object.keys(pages).length &&
    //   !dragged
    // ) {
    //   allLayers.current = Object.keys(pages);
    // } else if (dragged) {
    //   sethandleclick(true);
    // }
  }, [Object?.keys(pages[activePage]?.layers)?.length]);

  useEffect(() => {
    // console.log(
    //   '🚀 ~ file: Properties.jsx:63 ~ useEffect ~ Object.keys(page1:',
    //   Object.keys(pages).length,
    //   allLayers.current.length,
    //   allLayers.current.length < Object.keys(pages).length
    // );
    if (allLayers?.current?.length < pages?.length) {
    } else if (allLayers?.current?.length > pages?.length) {
    }
  }, [pages.length]);

  const [duplicateIds, setDuplicateIds] = useState([]);

  const findDuplicateIds = (res) => {
    const seenIds = {};
    const duplicates = [];

    for (const obj of res) {
      const eventId = obj.eventId;
      const id = obj.id;

      if (!seenIds[eventId]) {
        seenIds[eventId] = true;
      } else {
        if (!duplicates.includes(eventId)) {
          duplicates.push({ id: id, eventId: eventId });
        }
      }

      duplicates.map((data) => {
        actions.setProp(activePage, [data?.id], {
          eventId: '',
        });
      });
    }

    setDuplicateIds(duplicates);
  };
  useEffect(() => {
    if (
      allLayers.current.length < Object.keys(pages[0].layers).length &&
      !dragged
    ) {
      allLayers.current = Object.keys(pages[0].layers);
      let res = [];
      Object?.keys(pages[0]?.layers)?.map((ids) => {
        if (pages[0]?.layers[ids]?.data?.name === 'Group') {
          res.push({
            id: ids,
            eventId: pages[0]?.layers[ids]?.data?.props?.eventId,
          });
        }
      });
      findDuplicateIds(res);
    } else if (
      allLayers.current.length > Object.keys(pages[0].layers).length &&
      !dragged
    ) {
      allLayers.current = Object.keys(pages[0].layers);
      checkAndRemove(propertyName);
    }
  }, [Object?.keys(pages[0]?.layers)?.length]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
  const [propertyNameadd, setPropertyNameadd] = useState();
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        overflowY: 'auto',
        display: 'flex',
      }}
    >
      <ToastContainer></ToastContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <TextField
            id='standard-basic'
            label='Event'
            variant='outlined'
            multiline
            onChange={(e) => setPropertyNameadd(e.target.value)}
          ></TextField>
          {/* <span>Add Property Value</span>
          <TextField></TextField> */}
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
              try {
                let isGroup = false;
                const id123 = layers[activePage][0];
                const eId123 = pages[activePage]?.layers[id123]?.data;
                propertyName.map((item) => {
                  if (item.propertyId === eId123?.props?.eventId) {
                    isGroup = true;
                  }
                });

                if (!Object?.keys(layers)?.length) {
                  return alert('please select a layer');
                } else if (layers[activePage].length > 1) {
                  return alert('please selct one group');
                } else if (isGroup) {
                  return alert('Select other layer');
                }
                // else if (layers[activePage][0]) {
                //   return alert("layer should be group");
                // }
                else if (
                  pages[activePage].layers[layers[activePage][0]].data.type !==
                  'Group'
                ) {
                  return alert('layer should be group');
                } else if (isGroup) {
                  return alert('select other group');
                }
                const id = uuidv4();
                propertyName.push({
                  property: propertyNameadd,
                  propertyId: id,
                  activePage,
                });
                actions.setProp(activePage, layers[activePage][0], {
                  eventId: id,
                });
                setPropertyNameadd('');
                handleClose();
              } catch (e) {
                toast.error(`Something went wrong`, {
                  position: 'top-right',
                  autoClose: 1000,
                });
              }
            }}
          >
            Save
          </button>
        </Box>
      </Modal>
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
            lineHeight: '48px',
            fontWeight: 600,
            color: '#181C32',
            flexGrow: 1,
          }}
        >
          Events
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
      <div
        style={{ flexDirection: 'column', overflowY: 'auto', display: 'flex' }}
      >
        <div
          style={{
            flexGrow: 1,
            overflowY: 'auto',
            display: 'grid',
            // gridTemplateColumns: 'repeat(3,minmax(0,1fr))',
            gridGap: 10,
            padding: '16px',
          }}
        >
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
            onClick={() => setOpen(true)}
          >
            + Add
          </button>
          {propertyName?.length ? (
            propertyName?.map((item, key) => {
              return (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span
                    style={{
                      fontSize: '18px',
                      fontFamily: 'Ledger',
                      textTransform: 'capitalize',
                    }}
                  >
                    {item.property}
                  </span>
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
                    onClick={() => {
                      try {
                        if (item.activePage === activePage) {
                          const newarr = [...propertyName];
                          const id = newarr[key]?.propertyId;
                          let array1 = Object?.keys(
                            pages[activePage]?.layers
                          )?.map((ids) => pages[activePage]?.layers[ids]);

                          let FilteredId = array1?.filter(
                            (key) => key?.data?.props?.eventId === id
                          );
                          actions.deleteLayer(activePage, FilteredId[0]?.id);
                          newarr.splice(key, 1);
                          setPropertyName(newarr);
                        } else {
                          alert('cannot delete from other page');
                        }
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
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Properties;
