import React, { useEffect, useState } from 'react';
import Test from '../src/Test';
import axios from 'axios';
import { PROXY } from '../config';

const Invites = () => {
  useEffect(() => {
    const getData = async () => {
      const res = await axios.post(`${PROXY}/invite/getAdmin`, {
        id: JSON.parse(localStorage.getItem('wedcell'))?.data?._id,
      });
    };
    getData();
  }, []);
  const [propertyName, setPropertyName] = useState([]);
  return (
    <>
      <Test propertyName={propertyName} setPropertyName={setPropertyName} />
    </>
  );
};

export default Invites;
