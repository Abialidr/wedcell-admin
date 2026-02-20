import { useEffect, useState } from 'react';
// import { useAsync } from 'react-use';
import axios from "axios";
import XIcon from "@duyank/icons/regular/X";
import { isMobile } from "react-device-detect";
import { useEditor } from "@adojs/editor";
import { SerializedPage } from "@adojs/core";
import { data } from "./../../../data";
import { PROXY } from "../../../config";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import compressAndAppendFiles from "components/compressAndAppendFiles";
const TemplateContent = ({ onClose }) => {
  const inputFileRef = useRef(null);
  const [update, setUpdate] = useState(false);
  const handleSave1 = async (e) => {
    try {
      const file = e.target.files && e.target.files[0];
      const data = query.serialize();
      const formData = new FormData();
      const compressImg = await compressAndAppendFiles(file);
      formData.append('Img', compressImg);
      formData.append('data', JSON.stringify(data));
      const res = await axios.put(`${PROXY}/template/upload`, formData);
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

  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { actions, activePage, query } = useEditor((state) => ({
    activePage: state.activePage,
  }));
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState('');
  const [totalres, settotalres] = useState();
  const useFunc = async () => {
    setIsLoading(true);
    const response = await axios.get(`${PROXY}/template?page=${page}`);
    setPageCount(response?.data?.totalPage);
    settotalres(response?.data?.total);
    setTemplates(response.data.data);
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
  }, [update, page]);
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  const addPage = async (id) => {
    const response = await axios.get(`${PROXY}/template/${id}`);
    const data = response?.data?.data[0]?.data;
    actions.setData(data);
    if (isMobile) {
      onClose();
    }
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
            fontWeight: 600,
            fontSize: '15px',
            color: '#181C32',
            flexGrow: 1,
            marginBottom: '0px',
          }}
        >
          Templates
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
        onChange={handleSave1}
      />
      {isLoading ? (
        <div style={{ height: '100%', flex: 1 }}>Loading...</div>
      ) : (
        <div
          style={{
            flexDirection: 'column',
            overflowY: 'auto',
            display: 'flex',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              position: 'relative',
              width: '100%',
              // border: '1px solid ',
              height: 'fit-content',
              flexDirection: 'column',
              gap: '5px',
            }}
          >
            {templates.map((item, index) => {
              console.log(
                `🚀 ~ file: TemplateContent.jsx:174 ~ {templates.map ~ item:`,
                item
              );
              return (
                <div
                  style={{
                    cursor: 'pointer',
                    position: 'relative',
                    border: '1px solid gray',
                  }}
                  key={index}
                  onClick={() => {
                    try {
                      addPage(item?._id);
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
                    key={index}
                    onClick={() => {
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
                                    `${PROXY}/template/${item._id}`
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
                    style={{ width: '100%' }}
                    src={item.Images}
                    loading='lazy'
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
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
        <span style={{ fontSize: '20px' }}>
          {isLoading ? <Spinner /> : `${page} of ${pageCount}`}
        </span>
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

export default TemplateContent;
