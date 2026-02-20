import React, { useEffect, useRef, useState } from 'react';
// import { useAsync } from 'react-use';
import axios from "axios";
import { getThumbnail } from "../../utils/thumbnail.ts";
import XIcon from "@duyank/icons/regular/X";
import { isMobile } from "react-device-detect";
import { useEditor } from "@adojs/editor";
import { Box, Modal, TextField } from "@mui/material";
import { TextContent as TextContent2 } from "@adojs/core";
import { functionToDwnload } from "../../../components/canvaFunction2.js";
import { PROXY } from "config/index.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import compressAndAppendFiles from "components/compressAndAppendFiles.js";
const RSVPContent = ({ onClose }) => {
  const [update, setUpdate] = useState(false);

  const inputFileRef = useRef(null);
  const [root, setRoot] = React.useState();
  console.log(`🚀 ~ file: RSVPContent.jsx:17 ~ RSVPContent ~ root:`, root);
  // axios.defaults.baseURL = 'https://api-gilt-one.vercel.app/';
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
        position: 'top-right',
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
      formData.append('Img', compressImg);
      formData.append('data', JSON.stringify(data));
      await axios.put(`${PROXY}/inviteText/upload?type=RSVP`, formData);
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
        position: 'top-right',
        autoClose: 1000,
      });
    }
  };

  const i = useRef(null);
  const SelectedLayers = (data, type) => {
    switch (data.type.resolvedName) {
      case 'TextLayer':
        if (
          data?.props.text.includes(`data-list-type="ordered"`) ||
          data?.props.text.includes(`data-list-type=""`)
        ) {
          let pTagArray = data?.props.text.split('</p>');
          pTagArray = pTagArray.filter((data) => data !== '');
          return (
            <div
              style={{
                height: `${data?.props.boxSize.height}px`,
                width: `${data?.props.boxSize.width}px`,

                ...(type === 'ROOT'
                  ? { position: 'relative' }
                  : {
                      position: 'absolute',
                      transform: `translate(${data?.props.position.x}px,${data?.props.position.y}px)`,
                    }),
                caretColor: 'transparent',
              }}
            >
              <div
                style={{
                  height: `${data?.props.boxSize.height / data?.props.scale}px`,
                  width: `${data?.props.boxSize.width / data?.props.scale}px`,
                  position: 'absolute',
                  caretColor: 'transparent',

                  transform: `rotate(${data?.props.rotate}deg) scale(${data?.props.scale})`,
                  fontSize: `${data?.props.fontSizes[0]}px`,
                  fontFamily: `${data?.props.fonts[0].name}`,
                  transformOrigin: '0 0',
                  ...(data?.props?.effect?.name === 'hollow'
                    ? {
                        'caret-color': `${data.props.colors[0]}`,
                        '-webkit-text-fill-color': 'transparent',
                        '-webkit-text-stroke': `${
                          0.0199985 * data?.props?.effect?.settings.thickness
                        }px ${data.props.colors[0]}`,
                      }
                    : {}),
                  ...(data?.props?.effect?.name === 'shadow'
                    ? {
                        textShadow: `${convertRGBToRGBA(
                          data?.props?.effect?.settings.color,
                          data?.props?.effect?.settings.transparency / 100
                        )} 
                        ${setTextShadow(
                          data?.props?.effect?.settings.direction,
                          data?.props?.effect?.settings.offset,
                          1,
                          'x',
                          data?.props?.scale,
                          data?.props?.fontSizes[0]
                        )}px
                        ${setTextShadow(
                          data?.props?.effect?.settings.direction,
                          data?.props?.effect?.settings.offset,
                          1,
                          'y',
                          data?.props?.scale,
                          data?.props?.fontSizes[0]
                        )}px
                        ${data?.props?.effect?.settings.blur}px`,
                      }
                    : {}),
                  ...(data?.props?.effect?.name === 'lift'
                    ? {
                        textShadow: `rgba(0,0,0,${
                          0.055 * data?.props?.effect?.settings.intensity
                        }) ${0}px ${2.1}px  ${
                          2.1 + data?.props?.effect?.settings.intensity * 0.065
                        }px`,
                        filter: 'opacity(1)',
                      }
                    : {}),
                  ...(data?.props?.effect?.name === 'echo'
                    ? {
                        textShadow: `${convertRGBToRGBA(
                          data?.props?.effect?.settings.color,
                          0.5
                        )} 
                        ${setTextShadow(
                          data?.props?.effect?.settings.direction,
                          data?.props?.effect?.settings.offset,
                          1,
                          'x',
                          data?.props?.scale,
                          data?.props?.fontSizes[0]
                        )}px
                        ${setTextShadow(
                          data?.props?.effect?.settings.direction,
                          data?.props?.effect?.settings.offset,
                          1,
                          'y',
                          data?.props?.scale,
                          data?.props?.fontSizes[0]
                        )}px
                        ${0}px,
                        ${convertRGBToRGBA(
                          data?.props?.effect?.settings.color,
                          0.3
                        )} 
                        ${setTextShadow(
                          data?.props?.effect?.settings.direction,
                          data?.props?.effect?.settings.offset,
                          2,
                          'x',
                          data?.props?.scale,
                          data?.props?.fontSizes[0]
                        )}px
                        ${setTextShadow(
                          data?.props?.effect?.settings.direction,
                          data?.props?.effect?.settings.offset,
                          2,
                          'y',
                          data?.props?.scale,
                          data?.props?.fontSizes[0]
                        )}px
                        ${0}px
                        `,
                      }
                    : {}),
                  ...(data?.props?.effect?.name === 'splice'
                    ? {
                        'caret-color': `${data.props.colors[0]}`,
                        '-webkit-text-fill-color': 'transparent',
                        '-webkit-text-stroke': `${
                          0.0199985 * data?.props?.effect?.settings.thickness
                        }px ${data.props.colors[0]}`,
                        textShadow: `${data?.props?.effect?.settings.color} 
                        ${setTextShadow(
                          data?.props?.effect?.settings.direction,
                          data?.props?.effect?.settings.offset,
                          1,
                          'x',
                          data?.props?.scale,
                          data?.props?.fontSizes[0]
                        )}px
                        ${setTextShadow(
                          data?.props?.effect?.settings.direction,
                          data?.props?.effect?.settings.offset,
                          1,
                          'y',
                          data?.props?.scale,
                          data?.props?.fontSizes[0]
                        )}px
                        ${0}px`,
                      }
                    : {}),
                }}
              >
                {data?.props.text.includes(`data-list-type="ordered"`) ? (
                  <ol className='PList oList'>
                    {pTagArray.map((data) => {
                      return ReactHtmlParser(data);
                    })}
                  </ol>
                ) : (
                  <ul className='PList'>
                    {pTagArray.map((data) => {
                      return ReactHtmlParser(data);
                    })}
                  </ul>
                )}
              </div>
            </div>
          );
        } else {
          return (
            <div
              style={{
                height: `${data?.props.boxSize.height}px`,
                width: `${data?.props.boxSize.width}px`,
                ...(type === 'ROOT'
                  ? { position: 'relative' }
                  : {
                      position: 'absolute',
                      transform: `translate(${data?.props.position.x}px,${data?.props.position.y}px)`,
                    }),
                caretColor: 'transparent',
              }}
            >
              <div
                style={{
                  height: `${data?.props.boxSize.height / data?.props.scale}px`,
                  width: `${data?.props.boxSize.width / data?.props.scale}px`,
                  position: 'absolute',
                  transform: `rotate(${data?.props.rotate}deg) scale(${data?.props.scale})`,
                  fontSize: `${data?.props.fontSizes[0]}px`,
                  fontFamily: `${data?.props.fonts[0].name}`,

                  transformOrigin: '0 0',
                  ...(data?.props?.effect?.name === 'hollow'
                    ? {
                        '-webkit-text-fill-color': 'transparent',
                        '-webkit-text-stroke': `${
                          0.0199985 * data?.props?.effect?.settings.thickness
                        }px ${data.props.colors[0]}`,
                      }
                    : {}),
                  ...(data?.props?.effect?.name === 'shadow'
                    ? {
                        textShadow: `${convertRGBToRGBA(
                          data?.props?.effect?.settings.color,
                          data?.props?.effect?.settings.transparency / 100
                        )} 
                        ${setTextShadow(
                          data?.props?.effect?.settings.direction,
                          data?.props?.effect?.settings.offset,
                          1,
                          'x',
                          data?.props?.scale,
                          data?.props?.fontSizes[0]
                        )}px
                        ${setTextShadow(
                          data?.props?.effect?.settings.direction,
                          data?.props?.effect?.settings.offset,
                          1,
                          'y',
                          data?.props?.scale,
                          data?.props?.fontSizes[0]
                        )}px
                        ${data?.props?.effect?.settings.blur}px`,
                      }
                    : {}),
                  ...(data?.props?.effect?.name === 'lift'
                    ? {
                        textShadow: `rgba(0,0,0,${
                          0.055 * data?.props?.effect?.settings.intensity
                        }) ${0}px ${2.1}px  ${
                          2.1 + data?.props?.effect?.settings.intensity * 0.065
                        }px`,
                        filter: 'opacity(1)',
                      }
                    : {}),
                  ...(data?.props?.effect?.name === 'echo'
                    ? {
                        textShadow: `${convertRGBToRGBA(
                          data?.props?.effect?.settings.color,
                          0.5
                        )} 
                        ${setTextShadow(
                          data?.props?.effect?.settings.direction,
                          data?.props?.effect?.settings.offset,
                          1,
                          'x',
                          data?.props?.scale,
                          data?.props?.fontSizes[0]
                        )}px
                        ${setTextShadow(
                          data?.props?.effect?.settings.direction,
                          data?.props?.effect?.settings.offset,
                          1,
                          'y',
                          data?.props?.scale,
                          data?.props?.fontSizes[0]
                        )}px
                        ${0}px,
                        ${convertRGBToRGBA(
                          data?.props?.effect?.settings.color,
                          0.3
                        )} 
                        ${setTextShadow(
                          data?.props?.effect?.settings.direction,
                          data?.props?.effect?.settings.offset,
                          2,
                          'x',
                          data?.props?.scale,
                          data?.props?.fontSizes[0]
                        )}px
                        ${setTextShadow(
                          data?.props?.effect?.settings.direction,
                          data?.props?.effect?.settings.offset,
                          2,
                          'y',
                          data?.props?.scale,
                          data?.props?.fontSizes[0]
                        )}px
                        ${0}px
                        `,
                      }
                    : {}),
                  ...(data?.props?.effect?.name === 'splice'
                    ? {
                        'caret-color': `${data.props.colors[0]}`,
                        '-webkit-text-fill-color': 'transparent',
                        '-webkit-text-stroke': `${
                          0.0199985 * data?.props?.effect?.settings.thickness
                        }px ${data.props.colors[0]}`,
                        textShadow: `${data?.props?.effect?.settings.color} 
                        ${setTextShadow(
                          data?.props?.effect?.settings.direction,
                          data?.props?.effect?.settings.offset,
                          1,
                          'x',
                          data?.props?.scale,
                          data?.props?.fontSizes[0]
                        )}px
                        ${setTextShadow(
                          data?.props?.effect?.settings.direction,
                          data?.props?.effect?.settings.offset,
                          1,
                          'y',
                          data?.props?.scale,
                          data?.props?.fontSizes[0]
                        )}px
                        ${0}px`,
                      }
                    : {}),
                }}
              >
                <TextContent2
                  text={data?.props?.text}
                  colors={data?.props?.colors}
                  fontSizes={data?.props?.fontSizes}
                  effect={data?.props?.effect}
                ></TextContent2>
              </div>
            </div>
          );
        }

      default:
        break;
    }
  };
  function convertRGBToRGBA(rgbColorString, alpha) {
    const rgbValues = rgbColorString.match(/\d+/g);

    if (!rgbValues || rgbValues.length !== 3) {
      return null;
    }

    const r = parseInt(rgbValues[0]);
    const g = parseInt(rgbValues[1]);
    const b = parseInt(rgbValues[2]);

    // Check and normalize the alpha value
    alpha = Math.min(1, Math.max(0, alpha));

    // Create the RGBA color string
    const rgbaColorString = `rgba(${r}, ${g}, ${b}, ${alpha})`;

    return rgbaColorString;
  }
  function setTextShadow(
    direction,
    offset,
    offsteTime,
    isDirection,
    translateScale,
    fontSize
  ) {
    const mappedOffset = ((0.083 * fontSize) / 50) * offset * offsteTime;

    const angleInRadians = -(direction - 90) * (Math.PI / 180);
    switch (isDirection) {
      case 'x':
        return mappedOffset * Math.cos(angleInRadians);

      case 'y':
        return mappedOffset * Math.sin(angleInRadians);
    }
  }
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
      return root.layers[data].type.resolvedName === 'TextLayer';
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
          Text
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
                root.layers[data].type.resolvedName === 'TextLayer' &&
                root.layers[data].props.text.includes(
                  'J7hPmWk2tR4Y8LqXvE5zNnD0cUj9AeV1f3S6'
                )
              );
            });
            if (isValid) {
              setRoot(root);
              inputFileRef.current?.click();
            } else {
              toast.error(`Select Proper Layer With Text`, {
                position: 'top-right',
                autoClose: 1000,
              });
            }
          } catch (e) {
            toast.error(`Something went wrong`, {
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
        accept='image/*'
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
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            position: 'relative',
            width: '100%',
            border: '1px solid ',
            height: 'fit-content',
          }}
        >
          {isLoading && <div>Loading...</div>}
          {texts?.map((data, idx) => (
            <div
              key={idx}
              style={{
                cursor: 'pointer',
                position: 'relative',
                width: '100%',
                border: '1px solid',
              }}
              onClick={() => handleAddText(data.data)}
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
    </div>
  );
};

export default RSVPContent;
