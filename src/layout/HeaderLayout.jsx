import { forwardRef, useEffect, useRef, useState } from 'react';
import { downloadObjectAsJson } from '../utils/download';
import { useEditor } from '@adojs/editor';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { PROXY } from 'config/index.js';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router.js';
import useWindowSize from '@rooks/use-window-size';
import { Button } from '@mui/material';
const HeaderLayout = forwardRef(function HeaderLayout(
  { openPreview, propertyName },
  ref
) {
  const router = useRouter();
  const uploadRef = useRef(null);
  const { actions, query, layers, pages, state } = useEditor((state) => ({
    layers: state.selectedLayers,
    pages: state?.pages,
  }));

  const handleSave = async (propertyName) => {
    try {
      const arr = propertyName.map((val) => val.propertyId);
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
      if (counts === 1) {
        const rsvps = hello.find((obj) => {
          return obj.props.rsvp === true;
        });
        const res = await axios.put(
          `${PROXY}/invite/update`,
          {
            invitesData: query.serialize(),
            eventID: arr,
            events: propertyName,
            zoom: state.scale,
          },
          {
            headers: {
              authorization: JSON.parse(localStorage.getItem('wedcell'))?.data
                ?.token,
            },
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
      console.log('🚀 ~ file: HeaderLayout.jsx:57 ~ handleSave ~ e:', e);
      toast.error(`Something Went Wrong`, {
        position: 'top-right',
        autoClose: 1000,
      });
    }
  };

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
  const [role, setrole] = useState();
  useEffect(() => {
    const auth = localStorage.getItem('wedcell');
    const role = JSON.parse(localStorage.getItem('role'));
    setrole(role.role);
    if (!auth) {
      router.push('/Login');
    }
    if (auth) {
      if (role.role === 'Designer') {
        router.push('/canva');
      }
      if (role.role === 'Blog') {
        router.push('/blog-writer');
      }
    }
  }, []);
  return (
    <div
      ref={ref}
      className="mediaquery4"
      style={{
        background:
          'linear-gradient(rgb(197, 50, 68) 0%, rgb(180, 36, 93) 100%)',
        padding: '12px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '@media (max-width: 900px)': {
          padding: 12,
        },
      }}>
      <div
        style={{
          color: '#3d8eff',
          fontSize: 36,
          display: 'flex',
          gap: '10px',
          marginLeft: '-10px',
        }}>
        {role !== 'Designer' && (
          <button
            onClick={() => {
              router.push('/');
            }}
            style={{
              border: 'none',
              backgroundColor: 'rgba(0,0,0,0)',
            }}>
            <ArrowBackIcon />
          </button>
        )}
        <div style={{ color: 'white', height: 46 }}>
          {/* <img
            src={'./assets/logo.png'}
            style={{ maxHeight: '100%' }}
          /> */}
          {/* Wedcell */}

          <img
            src="/images/Group 4 (1).png"
            alt="Wedcell"
            style={{
              width: '60%',
              height: '60%',
              maxHeight: '70px',
              maxWidth: '70px',
              minHeight: '40px',
              minWidth: '40px',
              cursor: 'pointer',
            }}
            // style={{ marginTop: "4px" }}
          />
        </div>
        <ToastContainer></ToastContainer>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div
          style={{
            margin: '0 16px',
            cursor: 'pointer',
            color: '#fff',
            fontWeight: 700,
            ':hover': {
              textDecoration: 'underline',
            },
          }}
          onClick={() => uploadRef.current?.click()}>
          <input
            ref={uploadRef}
            type="file"
            accept="application/json"
            onChange={handleImport}
            style={{ display: 'none' }}
          />
          Import
        </div>
        <div
          style={{
            margin: '0 16px',
            cursor: 'pointer',
            color: '#fff',
            fontWeight: 700,
            ':hover': {
              textDecoration: 'underline',
            },
          }}
          onClick={() => downloadObjectAsJson('file', query.serialize())}>
          Export
        </div>
        <div
          style={{
            margin: '0 16px',
            cursor: 'pointer',
            color: '#fff',
            fontWeight: 700,
            ':hover': {
              textDecoration: 'underline',
            },
          }}
          onClick={() => handleSave(propertyName)}>
          Save
        </div>
        {role === 'Designer' && (
          <Button
            onClick={(e) => {
              e.preventDefault();
              localStorage.removeItem('wedcell');
              localStorage.removeItem('role');
              // window.location.reload(true);
              router.push('/Login');
            }}
            variant="contained"
            size="small">
            LOGOUT
          </Button>
        )}
      </div>
    </div>
  );
});

export default HeaderLayout;
