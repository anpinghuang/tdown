import React from 'react';
import { MoonLoader } from 'react-spinners';


const LoadingSpinner = ({ loading }) => {

  return (
    <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '100px'}}>
      <MoonLoader size={150} color={'white'} loading={loading} />
    </div>
  );
};

export default LoadingSpinner;
