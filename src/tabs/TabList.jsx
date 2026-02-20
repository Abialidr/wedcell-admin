import React, { useRef } from "react";
import { downloadObjectAsJson } from "../utils/download.ts";
import { useEditor } from "@adojs/editor";
import axios from "axios";
import { PROXY } from "../../config/index.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { Box, Modal } from "@mui/material";
import styles from "../../styles/planning.module.css";
import compressAndAppendFiles from "components/compressAndAppendFiles.js";
const SidebarTab = ({
  tabs,
  active,
  onChange,
  setOpenPreview,
  openPreview,
  propertyName,
  inviteDataId,
}) => {
  const inputFileRef = useRef(null);
  const { actions, query, layers } = useEditor((state) => ({
    layers: state.selectedLayers,
  }));
  const { pages, dragged, activePage } = useEditor((state) => ({
    pages: state?.pages,
    dragged: state?.dragData?.status,
    activePage: state?.activePage,
  }));
  const router = useRouter();
  const activeIdx = tabs.findIndex((tab) => tab.name === active);
  const uploadRef = useRef(null);
  const handleImport = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function () {
        const fileContent = JSON.parse(reader.result);
        actions.setData(fileContent);
      };
      reader.readAsText(file);
      e.target.value = '';
    }
  };

  const handleSave = async () => {
    const hello = Object?.keys(pages[0]?.layers)?.map((ids) => {
      return pages[0]?.layers[ids]?.data;
    });
    const counts = hello.reduce((count, obj) => {
      if (obj.props.rsvp === true) {
        return count + 1;
      } else {
        return count;
      }
    }, 0);

    console.log(`🚀 ~ file: TabList.jsx:55 ~ handleSave ~ count:`, counts);
    const arr = propertyName.map((val) => val.propertyId);
    try {
      if (counts === 1) {
        const rsvps = hello.find((obj) => {
          return obj.props.rsvp === true;
        });

        // if (
        //   rsvps.props.boxSize.width <
        //   pages[0]?.layers.ROOT.data.props.boxSize.width
        // ) {
        //   console.log('dfsdfsd');
        // }
        const res = await axios.put(
          `${PROXY}/invite/updateAdmin?id=${
            JSON.parse(localStorage.getItem('wedcell'))?.data?._id
          }`,
          {
            invitesData: query.serialize(),
            eventID: arr,
            events: propertyName,
          }
        );
        toast.success(`Invite Card Saved`, {
          position: 'top-right',
          autoClose: 1000,
        });
      } else {
        toast.error(`Enter One RSVP`, {
          position: 'top-right',
          autoClose: 1000,
        });
      }
    } catch (e) {
      toast.error(`Something Went Wrong`, {
        position: 'top-right',
        autoClose: 1000,
      });
    }
  };
  const handleSave1 = async (e) => {
    const file = e.target.files && e.target.files[0];
    const data = query.serialize();
    Object?.keys(pages[0]?.layers)?.map((ids) => {
      if (pages[0]?.layers[ids]?.data?.name === 'Group') {
        res.push({
          id: ids,
          eventId: pages[0]?.layers[ids]?.data?.props?.eventId,
        });
      }
    });
    const arr = propertyName.map((val) => val.propertyId);
    try {
      const formData = new FormData();
      const compressImg = await compressAndAppendFiles(file);
      formData.append('Img', compressImg);
      formData.append('data', JSON.stringify(data));
      const res = await axios.put(`${PROXY}/template/upload`, formData);
      toast.success(`Template Saved`, {
        position: 'top-right',
        autoClose: 1000,
      });
      handleClose();
    } catch (e) {
      toast.error(`Something Went Wrong`, {
        position: 'top-right',
        autoClose: 1000,
      });
    }
  };
  const handleExport = () => {
    downloadObjectAsJson('file', query.serialize());
  };
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
    width: '500px',
    bgcolor: 'background.paper',
    // border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: '10px',
    height: '360px',
    overflow: 'scroll',
    // paddingTop: "270px",
    zIndex: '-1',
  };
  return (
    <div
      className='mediaquery6'
      style={{
        color: '#5E6278',
        overflow: 'auto',
        height: '100%',
        borderRight: '1px solid rgba(217, 219, 228, 0.6)',
        '@media (max-width: 900px)': {
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: '#fff',
          display: 'flex',
          justifyContent: 'center',
        },
      }}
    >
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
            </div>
          </div>
        </Box>
      </Modal>
      <div
        className='mediaquery7'
        style={{
          overflow: 'hidden',
          position: 'relative',
          '@media (max-width: 900px)': {
            display: 'flex',
          },
        }}
      >
        {activeIdx >= 0 && (
          <div
            className='mediaquery8'
            style={{
              background: '#fff',
              width: 72,
              height: 72,
              position: 'absolute',
              left: 0,
              top: 0,
              transform: `translateY(${activeIdx * 100}%)`,
              '@media (max-width: 900px)': {
                display: 'none',
              },
            }}
          >
            <div
              style={{
                position: 'absolute',
                height: 8,
                width: 8,
                right: 0,
                top: -8,
                background:
                  'radial-gradient(circle closest-side,transparent 0,transparent 50%,#fff 0) 200% 200% /400% 400%',
              }}
            />
            <div
              style={{
                position: 'absolute',
                height: 8,
                width: 8,
                right: 0,
                bottom: -8,
                transform: 'scaleY(-1)',
                background:
                  'radial-gradient(circle closest-side,transparent 0,transparent 50%,#fff 0) 200% 200% /400% 400%',
              }}
            />
          </div>
        )}
        {tabs.map((tab, idx) => (
          <>
            <div
              key={idx}
              style={{
                color: idx === activeIdx ? '#009ef7' : undefined,
                borderBottomRightRadius: idx === activeIdx - 1 ? 8 : 0,
                borderTopRightRadius: idx === activeIdx + 1 ? 8 : 0,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0 2px',
                height: 72,
                width: 72,
                cursor: 'pointer',
                ':hover': {
                  color: '#009ef7',
                },
              }}
              onClick={(e) => onChange(e, tab.name)}
            >
              <div style={{ fontSize: 24 }}>{tab.icon}</div>
              <span style={{ fontSize: 10, lineHeight: 1.6, fontWeight: 600 }}>
                {tab.name}
              </span>
            </div>
          </>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default SidebarTab;
