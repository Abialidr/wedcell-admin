import Head from 'next/head';
import React, { useEffect, useRef, useState } from 'react';
import {
  FrameContent,
  ImageContent,
  ShapeContent,
  SvgContent,
  TextContent,
} from './canvaFunctions';
import { functionToDwnload } from './canvaFunction2';
// import { data } from '../data';
import { Box, Modal } from '@mui/material';
import axios from 'axios';
import { PROXY } from '../config';
import { data as Data1 } from '../data';
import useWindowSize from '@rooks/use-window-size';
import styles from '../styles/planning.module.css';
import { useRouter } from 'next/router';

function test({ id, setShowcard }) {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [modaldata, setModalData] = useState();
  const [data, setData] = useState([]);
  const [eventId, seteventId] = useState();
  const [t, p] = useState();

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`${PROXY}/invite/getById/${id}`);
      if (res.data.data.invitesData) {
        setData(res.data.data.invitesData);
        seteventId(res.data.data.eventID);
      } else {
        setData(Data1);
      }
    };
    getData();
  }, [id]);
  useEffect(() => {
    console.log(`🚀 ~ file: Test.js:41 ~ useEffect ~ data:`, data);
    if (data?.length) {
      const TextLayers = Object.keys(data[0].layers).filter(
        (key) => data[0].layers[key].type.resolvedName === 'TextLayer'
      );
      let fonts = TextLayers.flatMap((key) => {
        return data[0].layers[key].props.fonts[0].fonts.map((fonts) => {
          fonts.fontStyle = data[0].layers[key].props.fonts[0].name;
          return fonts;
        });
      });
      fonts = fonts
        .flatMap((data) => {
          return `@font-face {
                  font-family: ${data.fontStyle};
                  src: url(${data.urls[0]}) format('woff2');
                  ${data?.style?.includes('Bold')
              ? `font-weight: bold;`
              : `font-weight: 400;`
            }${data?.style?.includes('Italic')
              ? `font-style: italic;`
              : `font-style: normal;`
            }
                }`;
        })
        .flat()
        .join(' ');
      setFonts(fonts);
    }
  }, [data]);
  const [fonts, setFonts] = useState([]);
  function convertRGBToRGBA(rgbColorString, alpha) {
    // Extract the RGB values from the input string
    const rgbValues = rgbColorString.match(/\d+/g);

    if (!rgbValues || rgbValues.length !== 3) {
      // Handle invalid input
      return null;
    }

    // Convert the RGB values to integers
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

  const getGradientBackground = (e, t) => {
    const r = 100 / (e.length - 1);
    var n = e.map((e, t) => `${e} ${t * r}%`);

    switch (t) {
      case 'leftToRight':
        return `linear-gradient(90deg, ${n.join(', ')})`;
      case 'topToBottom':
        return `linear-gradient(${n.join(', ')})`;
      case 'topLeftToBottomRight':
        return `linear-gradient(135deg, ${n.join(', ')})`;
      case 'circleCenter':
        return `radial-gradient(circle at 50% 50%, ${n.join(', ')})`;
      default:
        return `radial-gradient(circle at 0% 0%, ${n.join(', ')})`;
    }
  };
  let [path123, setpath123] = useState();

  const SelectedLayers = (data) => {
    switch (data.type.resolvedName) {
      case 'TextLayer':
        const hello = data?.props.text.replace(
          'J7hPmWk2tR4Y8LqXvE5zNnD0cUj9AeV1f3S6',
          'Murtaza  dhjkfhsadkf Manjniwala'
        );
        if (
          data?.props.text.includes(`data-list-type="ordered"`) ||
          data?.props.text.includes(`data-list-type=""`)
        ) {
          let pTagArray = hello.split('</p>');
          pTagArray = pTagArray.filter((data) => data !== '');
          return (
            <div
              style={{
                height: `${data?.props.boxSize.height}px`,
                width: `${data?.props.boxSize.width}px`,
                position: 'absolute',
                transform: `translate(${data?.props.position.x}px,${data?.props.position.y}px)`,
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
                      '-webkit-text-stroke': `${0.0199985 * data?.props?.effect?.settings.thickness
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
                      textShadow: `rgba(0,0,0,${0.055 * data?.props?.effect?.settings.intensity
                        }) ${0}px ${2.1}px  ${2.1 + data?.props?.effect?.settings.intensity * 0.065
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
                      '-webkit-text-stroke': `${0.0199985 * data?.props?.effect?.settings.thickness
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
                    {pTagArray.map((item, index) => {
                      return <div key={index} style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: item }} />;
                    })}
                  </ol>
                ) : (
                  <ul className='PList'>
                    {pTagArray.map((item, index) => {
                      return <div key={index} style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: item }} />;
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
                position: 'absolute',
                transform: `translate(${data?.props.position.x}px,${data?.props.position.y}px)`,
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
                      '-webkit-text-stroke': `${0.0199985 * data?.props?.effect?.settings.thickness
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
                      textShadow: `rgba(0,0,0,${0.055 * data?.props?.effect?.settings.intensity
                        }) ${0}px ${2.1}px  ${2.1 + data?.props?.effect?.settings.intensity * 0.065
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
                      '-webkit-text-stroke': `${0.0199985 * data?.props?.effect?.settings.thickness
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
                <TextContent
                  text={hello}
                  colors={data?.props?.colors}
                  fontSizes={data?.props?.fontSizes}
                  effect={data?.props?.effect}
                ></TextContent>
              </div>
            </div>
          );
        }
      case 'FrameLayer':
        return (
          <div
            style={{
              height: `${data?.props.boxSize.height}px`,
              width: `${data?.props.boxSize.width}px`,
              position: 'absolute',
              transform: data.props.rotate
                ? `translate(${data?.props.position.x}px,${data?.props.position.y}px) rotate(${data?.props.rotate}deg)`
                : `translate(${data?.props.position.x}px,${data?.props.position.y}px)`,
            }}
          >
            <div
              style={{
                height: `${data?.props.boxSize.height / data?.props.scale}px`,
                width: `${data?.props.boxSize.width / data?.props.scale}px`,
                transform: `scale(${data?.props.scale})`,
                transformOrigin: '0 0',
              }}
            >
              <FrameContent
                clipPath={data?.props.clipPath}
                image={data.props.image}
                color={data?.props.color}
                gradientBackground={data?.props.gradientBackground}
              ></FrameContent>
              {/* <div
                style={{
                  width: '100%',
                  height: '100%',
                  clipPath: data?.props.clipPath,
                }}
              >
                <div
                  style={{
                    width: data.props.image
                      ? `${data.props.image.boxSize.width}px`
                      : `100%`,
                    height: data.props.image
                      ? `${data.props.image.boxSize.height}px`
                      : `100%`,
                    transform:
                      data.props.image &&
                      `translate(${data.props.image.position.x}px,${data.props.image.position.y}px)`,
                    position: 'relative',
                    background: data?.props.gradientBackground
                      ? getGradientBackground(
                          data?.props.gradientBackground.colors,
                          data?.props.gradientBackground.style
                        )
                      : data?.props.color,
                  }}
                >
                  {(data?.props.gradientBackground || data?.props.color) &&
                  !data.props.image ? (
                    <></>
                  ) : (
                    <img
                      src={
                        data.props.image
                          ? data.props.image.url
                          : '/assets/images/frame-placeholder.png'
                      }
                      style={{
                        objectFit: 'fill',
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                      }}
                    />
                  )}
                </div>
              </div> */}
            </div>
          </div>
        );
      case 'ImageLayer':
        return (
          <div
            style={{
              height: `${data?.props.boxSize.height}px`,
              width: `${data?.props.boxSize.width}px`,
              position: 'absolute',
              transform: data.props.rotate
                ? `translate(${data?.props.position.x}px,${data?.props.position.y}px) rotate(${data?.props.rotate}deg)`
                : `translate(${data?.props.position.x}px,${data?.props.position.y}px)`,
            }}
          >
            <ImageContent
              image={data?.props.image}
              boxSize={data?.props.boxSize}
            ></ImageContent>
          </div>
        );
      case 'SvgLayer':
        const image = data.props.image;
        const boxSize = data?.props.boxSize;
        const colors = data.props.colors;

        return (
          <div
            style={{
              height: `${data?.props.boxSize.height}px`,
              width: `${data?.props.boxSize.width}px`,
              position: 'absolute',
              transform: data.props.rotate
                ? `translate(${data?.props.position.x}px,${data?.props.position.y}px) rotate(${data?.props.rotate}deg)`
                : `translate(${data?.props.position.x}px,${data?.props.position.y}px)`,
            }}
          >
            <div
              style={{
                height: `${data?.props.boxSize.height}px`,
                width: `${data?.props.boxSize.width}px`,
                // overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: `100%`,

                  // transform: `translate(${data.props.image.position.x}px,${data.props.image.position.y}px)`,
                }}
              >
                <SvgContent
                  image={image}
                  boxSize={boxSize}
                  colors={colors}
                ></SvgContent>
              </div>
            </div>
          </div>
        );
      case 'ShapeLayer':
        return (
          <div
            style={{
              height: `${data?.props.boxSize.height}px`,
              width: `${data?.props.boxSize.width}px`,
              position: 'absolute',
              transform: data.props.rotate
                ? `translate(${data?.props.position.x}px,${data?.props.position.y}px) rotate(${data?.props.rotate}deg)`
                : `translate(${data?.props.position.x}px,${data?.props.position.y}px)`,
            }}
          >
            <div
              style={{
                height: `${data?.props.boxSize.height / data.props.scale}px`,
                width: `${data?.props.boxSize.width / data.props.scale}px`,
              }}
            >
              <div
                style={{
                  // clipPath: shape,
                  height: `${data?.props.boxSize.height}px`,
                  width: `${data?.props.boxSize.width}px`,
                  position: 'relative',
                }}
              >
                <ShapeContent
                  boxSize={{
                    height: data?.props.boxSize.height * data.props.scale,

                    width: data?.props.boxSize.width * data.props.scale,
                  }}
                  shape={data?.props.shape}
                  color={data?.props.color}
                  gradientBackground={data?.props.gradientBackground}
                  roundedCorners={data?.props.roundedCorners}
                  scale={data?.props.scale}
                  border={{
                    style: data?.props?.border?.style,
                    weight: data?.props.border?.weight * data.props.scale,
                    color: data?.props.border?.color,
                  }}
                ></ShapeContent>
                {/* <div
                  style={{
                    ...(type === 'normal'
                      ? {
                          height: `${
                            data?.props.boxSize.height / data.props.scale
                          }px`,
                          width: `${
                            data?.props.boxSize.width / data.props.scale
                          }px`,
                          clipPath: ogclip,
                          background: data?.props.color,
                          transform: `scaleX(${
                            data?.props.boxSize.width / ogw
                          }) scaleY(${data?.props.boxSize.height / ogh})`,
                          transformOrigin: '0 0',
                        }
                      : {
                          height: `${
                            data?.props.boxSize.height / data.props.scale
                          }px`,
                          width: `${
                            data?.props.boxSize.width / data.props.scale
                          }px`,
                          clipPath: ogclip,
                          background: data?.props.gradientBackground
                            ? getGradientBackground(
                                data?.props.gradientBackground.colors,
                                data?.props.gradientBackground.style
                              )
                            : data?.props.color,
                          transform: `scaleX(${data?.props.scale}) scaleY(${data?.props.scale})`,
                          transformOrigin: '0 0',
                        }),
                  }}
                ></div>
                {data.props.border ? (
                  <svg
                    viewBox={`0 0 ${
                      data?.props.boxSize.width / data.props.scale
                    }  ${data?.props.boxSize.height / data.props.scale} `}
                    style={{ position: 'absolute', inset: 0 }}
                  >
                    "0"
                    <path
                      d={`${path}`}
                      strokeLinecap='butt'
                      fill='none'
                      stroke={data.props.border.color}
                      strokeWidth={data.props.border.weight}
                      strokeDasharray={
                        data.props.border.style === 'dots'
                          ? `${data?.props?.border.weight * 1},${
                              data?.props?.border.weight
                            }`
                          : data.props.border.style === 'shortDashes'
                          ? `${data?.props?.border.weight * 3},${
                              data?.props?.border.weight
                            }`
                          : data.props.border.style === 'longDashes'
                          ? `${data?.props?.border.weight * 6},${
                              data?.props?.border.weight
                            }`
                          : ''
                      }
                      clipPath={ogclip}
                    ></path>
                  </svg>
                ) : (
                  <></>
                )} */}
              </div>
            </div>
          </div>
        );
      default:
        break;
    }
  };
  const { innerWidth: windowWidth } = useWindowSize();
  const gradient =
    data[0]?.layers.ROOT.props.gradientBackground &&
    getGradientBackground(
      data[0]?.layers.ROOT.props.gradientBackground.colors,
      data[0]?.layers.ROOT.props.gradientBackground.style
    );
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: windowWidth >= 900 ? '500px' : windowWidth >= 460 ? '95%' : '95%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px',
    height: windowWidth >= 900 ? '360px' : '360px',
    overflow: 'scroll',
    zIndex: '-1',
  };
  const i = useRef(null);
  return (
    <>
      <Head>
        <style>
          {fonts}
          {`.PList p {
              display:list-item !important;
              margin-left : 1.7em
            }
            .oList p{
              list-style-type: decimal !important;
            }
            .PList {
              padding-left: 0px !important; 
              margin: 0; 
            }
            `}
        </style>
      </Head>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <div
            className={styles.mainModaldiv}
            style={{ position: 'relative' }}
          >
            <span
              className={styles.seemoreX}
              onClick={() => handleClose()}
            >
              <img
                src='/images/Vector12.png'
                alt=''
              />
            </span>
            <div className={styles.seemorehead}>
              <span>{modaldata?.name}</span>
            </div>
          </div>
          <div className={styles.seemorebody}>
            <article>
              <img
                src='/images/Clock.png'
                alt=''
              />
              <span className={styles.seemorebodybold}>
                Time :&nbsp; <span className={styles.seemorebodylight}></span>
              </span>
            </article>
            <article>
              <img
                src='/images/Wedding Day.png'
                alt=''
              />
              <span className={styles.seemorebodybold}>
                Date :&nbsp; <span className={styles.seemorebodylight}></span>
              </span>
            </article>
            <article>
              <img
                src='/images/Place Marker.png'
                alt=''
              />
              <span className={styles.seemorebodybold}>
                Venue :&nbsp; <span className={styles.seemorebodylight}></span>
              </span>
            </article>
            <article>
              <img
                src='/images/Wedding Photo.png'
                alt=''
              />
              <span className={styles.seemorebodybold}>
                Theme :&nbsp; <span className={styles.seemorebodylight}></span>
              </span>
            </article>
            <article>
              <img
                src='/images/Wedding.png'
                alt=''
              />
              <span className={styles.seemorebodybold}>
                Colour Code :&nbsp;{' '}
                <span className={styles.seemorebodylight}></span>
              </span>
            </article>
          </div>
        </Box>
      </Modal>
      <div
        onClick={() => {
          functionToDwnload(i, 1);
        }}
      >
        Download
      </div>
      <div
        onClick={() => {
          functionToDwnload(i, 1);
        }}
      >
        Download
      </div>
      <div
        style={{
          height: 'fit-content',
          width: '100vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '50px 10px',
          width: '100%',
          transform: 'translate(0px, 0px)',
          height: '100%',
        }}
      >
        <div
          ref={i}
          style={{
            height: `${windowWidth < data[0]?.layers.ROOT.props.boxSize.width &&
              (windowWidth / data[0]?.layers.ROOT.props.boxSize.width) *
              data[0]?.layers.ROOT.props.boxSize.height
              }px`,
            width: `${data[0]?.layers.ROOT.props.boxSize.width}px`,
            backgroundImage: `url(${data[0]?.layers?.ROOT?.props?.image?.url})`,
            position: 'relative',
            background: gradient ? gradient : data[0]?.layers.ROOT.props.color,
            boxShadow: '0 0 10px rgba(0,0,0,0.7)',
            overflow: 'hidden',
            caretColor: 'transparent',
          }}
        >
          <div
            style={{
              height: `${data[0]?.layers.ROOT.props.boxSize.height}px`,
              width: `${data[0]?.layers.ROOT.props.boxSize.width}px`,
              transform: `scale(${windowWidth < data[0]?.layers.ROOT.props.boxSize.width &&
                windowWidth / data[0]?.layers.ROOT.props.boxSize.width
                })`,
              transformOrigin: '0 0',
            }}
          >
            {data[0]?.layers.ROOT.child.map((childId, key) => {
              if (data[0]?.layers[childId].type.resolvedName === 'GroupLayer') {
                if (eventId?.includes(data[0]?.layers[childId].props.eventId)) {
                  return (
                    <div
                      onClick={() => {
                        handleOpen();
                      }}
                      key={key}
                      style={{
                        height: `${data[0]?.layers[childId].props.boxSize.height /
                          data[0]?.layers[childId].props.scale
                          }px`,
                        width: `${data[0]?.layers[childId].props.boxSize.width /
                          data[0]?.layers[childId].props.scale
                          }px`,
                        position: 'absolute',
                        transform: `translate(${data[0]?.layers[childId].props.position.x}px,${data[0]?.layers[childId].props.position.y}px) rotate(${data[0]?.layers[childId].props.rotate}deg) scale(${data[0]?.layers[childId].props.scale})`,
                        transformOrigin: '0 0',
                        cursor: 'pointer',
                        caretColor: 'transparent',
                      }}
                    >
                      {data[0]?.layers[childId].child.map((childId2) =>
                        SelectedLayers(data[0]?.layers[childId2])
                      )}
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={key}
                      style={{
                        height: `${data[0]?.layers[childId].props.boxSize.height /
                          data[0]?.layers[childId].props.scale
                          }px`,
                        width: `${data[0]?.layers[childId].props.boxSize.width /
                          data[0]?.layers[childId].props.scale
                          }px`,
                        position: 'absolute',
                        transform: `translate(${data[0]?.layers[childId].props.position.x}px,${data[0]?.layers[childId].props.position.y}px) rotate(${data[0]?.layers[childId].props.rotate}deg) scale(${data[0]?.layers[childId].props.scale})`,
                        transformOrigin: '0 0',
                        pointerEvents: 'none',
                      }}
                    >
                      {data[0]?.layers[childId].child.map((childId2) =>
                        SelectedLayers(data[0]?.layers[childId2])
                      )}
                    </div>
                  );
                }
              } else {
                return SelectedLayers(data[0]?.layers[childId]);
              }
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(test);
