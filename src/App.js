import React, {useState, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import UserDataList from "./UserDataList";
import AddData from "./AddDataForm";
import testData from "./testData.json";
import Footer from './Footer';

// Development mode detection helper
const isDevelopmentMode = () => {
  // Check if we're running in development environment
  if (process.env.NODE_ENV === 'development') {
    return true;
  }
  
  // Check if Chrome APIs are available
  try {
    return !window.chrome || !window.chrome.storage;
  } catch (e) {
    // If we get here, we're likely in development mode (browser without extension APIs)
    return true;
  }
}

// Use this flag throughout the application
const IS_DEV_MODE = isDevelopmentMode();

function App() {
  const[snackBar, setSnackbar] = useState(false);
  const[snackBarMsg, setSnackBarMsg] = useState('');
  const[prevUserList, setPrevUserList] = useState([]);

  // Use the development mode flag to determine initial state
  const[userList, setUserList] = useState(IS_DEV_MODE ? testData : []);
  
  useEffect(() => {
    // Only attempt to use Chrome storage in production mode
    if (!IS_DEV_MODE) {
      window.chrome.storage.sync.getBytesInUse(null, function(tBytes) {
        console.log("Total Bytes:" + tBytes);
        if(tBytes > 0){
            window.chrome.storage.sync.get(['userData'], function(result) {
              setUserList(result.userData);
            });
        }
      });
    }
  }, []);   // [] is needed to run useEffect only once. https://css-tricks.com/run-useeffect-only-once/
  

  const insertData = (item,backgroundColor) =>{
    let newData={
      id: uuidv4(),
      text: item,
      order:1,
      bgcolor:backgroundColor
    };

    let newUserList = [...userList];
    newUserList.push(newData);
    setUserList(newUserList);

    // Only attempt to use Chrome storage in production mode
    if (!IS_DEV_MODE) {
      window.chrome.storage.sync.set({'userData': newUserList}, function() {
        console.log('item added');
      });
    } else {
      console.log('[DEV MODE] Item added (not saved to Chrome storage)');
    }
  }

  const removeData = (itemId) =>{
    let oldUserList = [...userList];
    setPrevUserList(oldUserList);
    let newUserList = userList.filter(item => item.id !== itemId);
    setUserList(newUserList);

    // Only attempt to use Chrome storage in production mode
    if (!IS_DEV_MODE) {
      window.chrome.storage.sync.set({'userData': newUserList}, function() {
        console.log('item deleted');
      });
    } else {
      console.log('[DEV MODE] Item deleted (not saved to Chrome storage)');
    }
  }

  const showSnackbar = (message) =>{
    setSnackBarMsg(message);
    setSnackbar(true);
  }

  const handleCloseSnackbar = () => {
    setSnackbar(false);
  }

  const handleUndoDelete = () => {
    setUserList(prevUserList);
    
    // Only attempt to use Chrome storage in production mode
    if (!IS_DEV_MODE) {
      window.chrome.storage.sync.set({ 'userData': prevUserList }, function () {
        console.log('item restored');
      });
    } else {
      console.log('[DEV MODE] Item restored (not saved to Chrome storage)');
    }
  }

  // Display a development mode indicator
  const DevModeIndicator = () => {
    if (IS_DEV_MODE) {
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
    }
    return null;
  };

  const overrideTheme = createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          inputMarginDense: {
            cursor: 'pointer'
          }
        }
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            height: '30px'
          }
        }
      },
      MuiSnackbarContent: {
        styleOverrides: {
          root: {
            lineHeight: '0.1',
            minWidth: '100px'
          }
        }
      }
    }
  });

  return (
    <div>
      <ThemeProvider theme={overrideTheme}>
        <DevModeIndicator />
        <UserDataList dataList={userList} removeItem={removeData} showMessage={showSnackbar} />
        <Divider/>
        <AddData addItem={insertData}/>
        <Footer/>
        <Snackbar 
          autoHideDuration={snackBarMsg === 'Deleted' ? 3000 : 1000}
          open={snackBar}
          onClose={handleCloseSnackbar}
          message={snackBarMsg}
          key="snackbar1"
          action={
              snackBarMsg === 'Deleted' 
              ?
              <Button color="primary" size="small" onClick={handleUndoDelete}>UNDO</Button>
              : ''
          }
        />
      </ThemeProvider>
    </div>
  );
}

export default App;
