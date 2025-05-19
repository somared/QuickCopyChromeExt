import React from 'react';
import { IS_DEV_MODE } from './services/storageService';

const DevModeIndicator = () => {
  if (!IS_DEV_MODE) return null;
  
  return (
    <div style={{ 
      background: '#ff6b6b', 
      color: 'white', 
      padding: '3px 8px', 
      fontSize: '10px',
      fontWeight: 'bold',
      textAlign: 'center'
    }}>
      DEVELOPMENT MODE
    </div>
  );
};

export default DevModeIndicator;
