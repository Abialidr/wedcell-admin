import { useEffect, useRef, useState } from 'react';
import Sidebar from '../src/layout/Sidebar';
import PreviewModal from './PreviewModal';
import axios from 'axios';
import AppLayerSettings from './layout/AppLayerSettings';
import { DesignFrame, PageControl, useEditor } from '@adojs/editor';
import { PROXY } from '../config';
import { data } from '../data';
import { useRouter } from 'next/router';
import HeaderLayout from './layout/HeaderLayout';
import useWindowSize from '@rooks/use-window-size';
// import EditorContent from '../src/pages/EditorContent';
import { ToastContainer, toast } from 'react-toastify';

const Test = () => {
  const router = useRouter();
  const [inviteDataId, setInviteDataId] = useState();
  const [propertyName, setPropertyName] = useState([]);
  const { actions, state } = useEditor();
  const [inviteData, setInviteData] = useState([]);
  const [zoom, setZoom] = useState(1);
  const [isRenderTime, setIsRenderTime] = useState(0);

  const {
    innerWidth: windowWidth,
    innerHeight: windowHeight,
    outerHeight,
    outerWidth,
  } = useWindowSize();

  useEffect(() => {
    try {
      if (isRenderTime < 3 && inviteData.length) {
        if (windowHeight >= 900) {
          const height = windowHeight - 200;
          const scale = height / state.pageSize.height;
          actions.setScale(scale);
        } else {
          const height = windowHeight - 300;
          const scale = height / state.pageSize.height;
          actions.setScale(scale);
        }
        setIsRenderTime(isRenderTime + 1);
      }

      let pageDiv = document.querySelector(
        `.mediaquery9 > div:first-child > div:first-child > div:first-child > div:first-child > div:first-child > div:first-child`
      );
      // console.log(`🚀 ~ file: Test.jsx:58 ~ useEffect ~ state.activePage:`, state.activePage);
      if (pageDiv !== null && state && windowWidth < 900) {
        if (Object.keys(state.selectedLayers).length) {
          if (state.selectedLayers[state.activePage][0] === 'ROOT') {
            if (pageDiv) {
              pageDiv.style.overflow = 'scroll';
            }
          } else {
            if (pageDiv) {
              pageDiv.style.overflow = 'hidden';
            }
          }
        }

        if (state.pageSize.height * state.scale >= windowHeight - 300) {
          if (pageDiv) {
            pageDiv.style['justify-content'] = 'start';
          }
        } else {
          if (pageDiv) {
            pageDiv.style['justify-content'] = 'center';
          }
        }

        if (state.pageSize.width * state.scale >= windowWidth) {
          if (pageDiv) {
            pageDiv.style['align-items'] = 'start';
          }
        } else {
          if (pageDiv) {
            pageDiv.style['align-items'] = 'center';
          }
        }
      }
    } catch (e) {
      toast.error(`Enter One RSVP`, {
        position: 'top-right',
        autoClose: 1000,
      });
    }
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${PROXY}/invite`, {
          headers: {
            authorization: JSON.parse(localStorage.getItem('wedcell'))?.data
              ?.token,
          },
        });
        if (res.data.success) {
          const file = res.data.data.invitesData && res.data.data.invitesData;
          file[0].layers.ROOT.props.scale = res.data.data.zoom;
          const property = res.data.data.events && res.data.data.events;
          setInviteData(file);
          setPropertyName(property);
          setInviteDataId(res.data.data._id);
        } else {
          setInviteData(data);
          setPropertyName([]);
          setInviteDataId([]);
        }
      } catch (e) {
        toast.error(`Something went wrong`, {
          position: 'top-right',
          autoClose: 1000,
        });
      }
    })();
  }, []);

  const leftSidebarRef = useRef(null);
  const [openPreview, setOpenPreview] = useState(false);

  return inviteData.length ? (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        height:
          router.pathname === '/canva'
            ? '100vh'
            : windowWidth > 900
            ? 'calc(100vh - 175px)'
            : 'calc(100vh - 210px)',
        position: 'relative',
        overflow: 'hidden',
        maxHeight: windowHeight ? `100vh` : 'auto',
      }}
      // style={{
      //   display: 'flex',
      //   flexDirection: 'column',
      //   width: '100vw',
      //   height: '100vh',
      //   maxHeight: viewPortHeight ? `${viewPortHeight}px` : 'auto',
      // }}
    >
      <ToastContainer></ToastContainer>

      <HeaderLayout propertyName={propertyName} />
      {openPreview && <PreviewModal onClose={() => setOpenPreview(false)} />}
      <div
        className='mediaquery1'
        style={{
          display: 'flex',
          flexDirection: 'row',
          flex: 'auto',
          overflow: 'auto',
          background: '#EBECF0',
        }}
      >
        <div
          ref={leftSidebarRef}
          style={{
            display: 'flex',
            background: 'white',
          }}
        >
          <Sidebar
            openPreview={openPreview}
            setOpenPreview={setOpenPreview}
            propertyName={propertyName}
            setPropertyName={setPropertyName}
            inviteDataId={inviteDataId}
          />
        </div>
        <div
          style={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto',
          }}
        >
          <AppLayerSettings />
          <div
            style={{
              flexGrow: 1,
              overflow: 'auto',
              display: 'flex',
              flexDirection: 'column',
            }}
            className='mediaquery9'
          >
            {/* {inviteData.length && <EditorContent data={inviteData} />} */}
            {inviteData.length && <DesignFrame data={inviteData} />}
          </div>
          <div
            className='mediaquery2'
            style={{
              height: 40,
              background: '#fff',
              borderTop: '1px solid rgba(57,76,96,.15)',
              display: 'grid',
              alignItems: 'center',
              flexShrink: 0,
            }}
          >
            <PageControl />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <>loading...</>
  );
};

export default Test;
