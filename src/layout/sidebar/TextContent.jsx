import XIcon from '@duyank/icons/regular/X';
import RSVPside from 'components/RSVPside.js';
import TextSide from 'components/TextSide.js';
import { useState } from 'react';
const TextContent = ({ onClose }) => {
  const [currState, setCurrState] = useState('Texts');
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '15px',
          fontWeight: '600',
          color: 'gray',
          padding: '10px',
        }}
      >
        <span
          onClick={() => {
            setCurrState('Texts');
          }}
          style={{
            width: '50%',
            display: 'flex',
            justifyContent: 'center',
            color: currState === 'Texts' && '#c53244',
          }}
        >
          Texts
        </span>
        <span
          onClick={() => {
            setCurrState('RSVPs');
          }}
          style={{
            width: '50%',
            display: 'flex',
            justifyContent: 'center',
            color: currState !== 'Texts' && '#c53244',
          }}
        >
          RSVPs
        </span>
      </div>
      {currState === 'Texts' ? <TextSide></TextSide> : <RSVPside></RSVPside>}
    </div>
  );
};

export default TextContent;
