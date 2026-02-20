import React, { useRef, useState } from 'react';
import SidebarTab from '../tabs/TabList';
import LayoutIcon from '@duyank/icons/regular/Layout';
import TextTIcon from '@duyank/icons/regular/TextT';
import SquareIcon from '@duyank/icons/regular/Square';
import ImageIcon from '@duyank/icons/regular/Image';
import TextContent from './sidebar/TextContent';
import ShapeContent from './sidebar/ShapeContent';
import UploadContent from './sidebar/UploadContent';
import TemplateContent from './sidebar/TemplateContent';
import FrameCornersIcon from '@duyank/icons/regular/FrameCorners';
import FrameContent from './sidebar/FrameContent';
import { useEditor } from '@adojs/editor';
import Properties from './sidebar/Properties';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Elements from './sidebar/Elements';
import TimelineIcon from '@mui/icons-material/Timeline';
import RSVPContent from './sidebar/RSVPContent';

const tabs = [
  {
    name: 'Template',
    icon: <LayoutIcon />,
  },
  {
    name: 'Text',
    icon: <TextTIcon />,
  },
  // {
  //   name: 'RSVP',
  //   icon: <TextTIcon />,
  // },
  {
    name: 'Images',
    icon: <ImageIcon />,
  },
  {
    name: 'Elements',
    icon: <TimelineIcon />,
  },
  // {
  //   name: 'Graphics',
  //   icon: <GifBoxIcon />,
  // },
  // {
  //   name: 'Stickers',
  //   icon: <EmojiEmotionsIcon />,
  // },
  // {
  //   name: 'Grid Frames',
  //   icon: <CropFreeIcon />,
  // },
  {
    name: 'Shape',
    icon: <SquareIcon />,
  },
  {
    name: 'Frame',
    icon: <FrameCornersIcon />,
  },
  {
    name: 'Events',
    icon: <FormatListBulletedIcon />,
  },
];
const Sidebar = ({
  openPreview,
  setOpenPreview,
  propertyName,
  setPropertyName,
  inviteDataId,
}) => {
  const allLayers = useRef(['ROOT']);

  const [events, setevents] = useState([]);

  const { actions } = useEditor();
  const [tab, setTab] = useState(null);
  return (
    <div
      style={{
        display: 'flex',
        zIndex: 2,
        position: 'relative',
        backgroundColor: '#ffffff',
        borderRight: '1px solid rgba(217, 219, 228, 0.6)',
      }}
    >
      <div
        style={{
          display: 'flex',
        }}
        className='mediaquery10'
      >
        <SidebarTab
          openPreview={openPreview}
          setOpenPreview={setOpenPreview}
          propertyName={propertyName}
          inviteDataId={inviteDataId}
          tabs={tabs}
          active={tab}
          onChange={(_, tab) => {
            actions.setSidebar();
            setTab(tab);
          }}
        />
        {tab && (
          <div
            className='mediaquery5'
            style={{
              width: 360,
              '@media (max-width: 900px)': {
                width: '100%',
                position: 'fixed',
                bottom: 0,
                left: 0,
                top: 0,
                background: '#fff',
              },
            }}
          >
            {tab === 'Template' && (
              <TemplateContent
                onClose={() => {
                  setTab(null);
                  actions.setSidebar();
                }}
              />
            )}
            {tab === 'Text' && (
              <TextContent
                onClose={() => {
                  setTab(null);
                  actions.setSidebar();
                }}
              />
            )}
            {tab === 'RSVP' && (
              <RSVPContent
                onClose={() => {
                  setTab(null);
                  actions.setSidebar();
                }}
              />
            )}
            {tab === 'Events' && (
              <Properties
                propertyName={propertyName}
                setPropertyName={setPropertyName}
                onClose={() => {
                  setTab(null);
                  actions.setSidebar();
                }}
                allLayers={allLayers}
              />
            )}
            {tab === 'Frame' && (
              <FrameContent
                onClose={() => {
                  setTab(null);
                  actions.setSidebar();
                }}
              />
            )}
            {tab === 'Shape' && (
              <ShapeContent
                onClose={() => {
                  setTab(null);
                  actions.setSidebar();
                }}
              />
            )}
            <UploadContent
              visibility={tab === 'Images'}
              onClose={() => {
                setTab(null);
                actions.setSidebar();
              }}
            />
            {/* <Sticker
              visibility={tab === 'Stickers'}
              onClose={() => {
                setTab(null);
                actions.setSidebar();
              }}
            />

            <Graphics
              visibility={tab === 'Graphics'}
              onClose={() => {
                setTab(null);
                actions.setSidebar();
              }}
            />
            <GridFrames
              visibility={tab === 'Grid Frames'}
              onClose={() => {
                setTab(null);
                actions.setSidebar();
              }}
            /> */}
            <Elements
              visibility={tab === 'Elements'}
              onClose={() => {
                setTab(null);
                actions.setSidebar();
              }}
            />
          </div>
        )}
      </div>
      <div
        style={{
          width: 360,
          position: 'absolute',
          overflow: 'hidden',
          top: 0,
          left: 73,
          height: '100%',
          pointerEvents: 'none',
        }}
        id={'settings'}
      />
    </div>
  );
};

export default Sidebar;
