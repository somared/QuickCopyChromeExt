import React, {useState, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import UserDataList from "./UserDataList";
import AddData from "./AddDataForm";
import Footer from './Footer';
import DevModeIndicator from './DevModeIndicator';
import storageService, { IS_DEV_MODE } from './services/storageService';

function App() {
  const[snackBar, setSnackbar] = useState(false);
  const[snackBarMsg, setSnackBarMsg] = useState('');
  const[prevUserList, setPrevUserList] = useState([]);
  const[userList, setUserList] = useState([]);
  const[highestOrder, setHighestOrder] = useState(0);
  
  useEffect(() => {
    const loadUserData = async () => {
      try {
        // Check if there's any data in storage
        const bytesInUse = await storageService.getBytesInUse();
        const latestVersionNum = '1.1'; 

        if (bytesInUse > 0) {
          // Get version and userData
          const result = await storageService.getItems(['version', 'userData']);
          let version = result.version;
          
          // Cast version to float
          if (version !== undefined) {
            version = parseFloat(version);
          } else {
            version = 0.0;
          }
          console.log("Version:", version);

          if (version < 1.0 && result.userData !== undefined) {
            // Perform migration logic
            console.log("Migrating data to version {0}", latestVersionNum);
            
            // Add order property
            const migratedData = result.userData.map((item, index) => ({
              ...item,
              order: index + 1 // Start from 1 for the first item
            }));
            
            setHighestOrder(migratedData.length);
            setUserList(migratedData);

            // Save migrated data
            await storageService.saveData({ 
              'userData': migratedData, 
              'version': latestVersionNum 
            });
            console.log('Data migrated to version {0}', latestVersionNum);
          } else {
            console.log("No migration needed");
            
            // Get userData
            const userData = await storageService.getItems(['userData']);
            let sortedData = userData.userData.sort((a, b) => a.order - b.order);
            setUserList(sortedData);

            // Initialize the highest order from sorted data
            if (sortedData.length > 0) {
              setHighestOrder(sortedData[sortedData.length - 1].order);
            }

            await storageService.saveData({ 
              'version': latestVersionNum
            });
          }
        } else {
          // Handle empty storage case - this will use the test data in dev mode
          // or create empty data in production mode
          const data = await storageService.getData();
          if (data.userData) {
            const sortedData = data.userData.sort((a, b) => a.order - b.order);
            setUserList(sortedData);
            
            if (sortedData.length > 0) {
              setHighestOrder(sortedData[sortedData.length - 1].order);
            }
          }

          await storageService.saveData({ 
              'version': latestVersionNum,
          });
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };

    loadUserData();
  }, []);   // [] is needed to run useEffect only once. https://css-tricks.com/run-useeffect-only-once/
  
  const insertData = async (item, backgroundColor) => {
    const newOrder = highestOrder + 1;
    setHighestOrder(newOrder);
    
    const newData = {
      id: uuidv4(),
      text: item,
      order: newOrder,
      bgcolor: backgroundColor
    };

    const newUserList = [...userList, newData];
    setUserList(newUserList);

    // Save data using our storage service
    try {
      await storageService.saveData({ 'userData': newUserList });
      console.log('Item added');
    } catch (error) {
      console.error('Error saving new item:', error);
    }
  }

  const removeData = async (itemId) => {
    const oldUserList = [...userList];
    setPrevUserList(oldUserList);
    const newUserList = userList.filter(item => item.id !== itemId);
    setUserList(newUserList);

    // Save data using our storage service
    try {
      await storageService.saveData({ 'userData': newUserList });
      console.log('Item deleted');
    } catch (error) {
      console.error('Error removing item:', error);
    }
  }

  const reorderItems = async (items) => {
    const reorderedItems = items.map((item, index) => ({
      ...item,
      order: index + 1
    }));
    
    setUserList(reorderedItems);
    setHighestOrder(reorderedItems.length);
    
    // Save data using our storage service
    try {
      await storageService.saveData({ 'userData': reorderedItems });
      console.log('Items reordered');
    } catch (error) {
      console.error('Error saving reordered items:', error);
    }
  }

  const showSnackbar = (message) => {
    setSnackBarMsg(message);
    setSnackbar(true);
  }

  const handleCloseSnackbar = () => {
    setSnackbar(false);
  }

  const handleUndoDelete = async () => {
    setUserList(prevUserList);
    
    // Save data using our storage service
    try {
      await storageService.saveData({ 'userData': prevUserList });
      console.log('Item restored');
    } catch (error) {
      console.error('Error restoring item:', error);
    }
  }
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
        <UserDataList dataList={userList} removeItem={removeData} showMessage={showSnackbar} onReorder={reorderItems} />
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
