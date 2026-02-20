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
import compressAndAppendFilesSingle from 'components/compressAndAppendFilesSingle';

const UploadContent = ({ visibility, onClose }) => {
  const inputFileRef = useRef(null);
  const { actions } = useEditor();
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState('');
  const [totalres, settotalres] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const getallImg = async () => {
    setIsLoading(true);
    const res = await axios.get(
      `${PROXY}/inviteImg/getAdmin?type=Images&page=${page}`
    );
    setImages(res.data.data);
    setPageCount(res?.totalPage);
    settotalres(res?.total);
    setIsLoading(false);
    // setAdminImg(res.data.adminImg);
  };
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
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
  useEffect(() => {
    try {
      getallImg();
    } catch (e) {
      toast.error(`Something went wrong`, {
        position: 'top-right',
        autoClose: 1000,
      });
    }
  }, [update, page]);
  const handleUpload = async (e) => {
    let file = e.target.files && e.target.files[0];
    file = await compressAndAppendFilesSingle(file);
    // try {
    //   const formData = new FormData();
    //   formData.append('Img', file);
    //   const res = await axios.put(`${PROXY}/inviteImg/uploadAdmin`, formData);
    //   setUpdate(!update);
    // } catch (e) {
    //   console.log(`🚀 ~ file: UploadContent.jsx:52 ~ handleUpload ~ e:`, e);
    // }
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        // setImages((prevState) => {
        //   return prevState.concat([
        //     {
        //       url: reader.result,
        //       type: file.type === 'image/svg+xml' ? 'svg' : 'image',
        //     },
        //   ]);
        // });
        try {
          const res = await axios.put(`${PROXY}/inviteImg/uploadAdmin`, {
            dataurl: reader.result,
            type1: file.type === 'image/svg+xml' ? 'svg' : 'image',
            type2: 'Images',
          });
          setUpdate(!update);
        } catch (e) {
          console.log(`🚀 ~ file: UploadContent.jsx:52 ~ handleUpload ~ e:`, e);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        display: visibility ? 'flex' : 'none',
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
            fontWeight: 600,
            fontSize: '15px',
            color: '#181C32',
            flexGrow: 1,
            marginBottom: '0px',
          }}
        >
          Upload Images
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
        style={{
          margin: 16,
          background: '#3a3a4c',
          borderRadius: 8,
          color: '#fff',
          padding: '8px 16px',
          cursor: 'pointer',
          textAlign: 'center',
          top: '150px',
        }}
        onClick={() => inputFileRef.current?.click()}
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
      {isLoading ? (
        <div
          style={{
            height: '100%',
            flex: '1',
          }}
        >
          Loading....
        </div>
      ) : (
        <div
          style={{
            padding: '16px',
            overflow: 'scroll',
            height: '100%',
            flex: '1',
          }}
        >
          <div
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              display: 'flex',
              // border: '1px solid ',
              height: 'fit-content',
              flexDirection: 'column',
              gap: '10px',
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
                  <div style={{ height: 0 }} />
                  <div style={{}}>
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
            {/* {[
              1,
              1,
              1,
              1,
              1,
              1,
              ,
              1,
              1,
              1,
              1,
              1,
              ,
              1,
              1,
              1,
              1,
              ,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
            ].map((val) => {
              return (
                <div
                  style={{
                    background: 'red',
                    width: '320px',
                    height: '300px',
                    marginTop: '20px',
                  }}
                ></div>
              );
            })} */}
          </div>
        </div>
      )}
      <div
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          gap: '10px',
          padding: '10px 0px',
        }}
      >
        {page === 1 ? (
          <span></span>
        ) : (
          <>
            <span
              onClick={() => handlePageChange(page - 1)}
              style={{ fontSize: '20px' }}
            >
              {'<'}
            </span>
          </>
        )}
        <span style={{ fontSize: '20px' }}>{page}</span>
        {page === pageCount ? (
          <span></span>
        ) : (
          <span
            onClick={() => handlePageChange(page + 1)}
            style={{ fontSize: '20px' }}
          >
            {'>'}
          </span>
        )}
      </div>
    </div>
  );
};

export default UploadContent;
