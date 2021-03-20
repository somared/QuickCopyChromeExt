import React, {useState, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import Divider from '@material-ui/core/Divider'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import UserDataList from "./UserDataList" ;
import AddData from "./AddDataForm"
import testData from "./testData.json";

function App() {
  const[snackBar, setSnackbar] = useState(false);
  const[snackBarMsg, setSnackBarMsg] = useState('');

  //Uncomment below line & comment next line to test locally in browser window using testData
  //const[userList, setUserList] = useState(testData);   
  const[userList, setUserList] = useState([]);
  
  useEffect(() => {
    //window.chrome.storage.sync.get return empty obj and not null so to check if storage is empty we have to do as below
    //Comment below code to test locally in browser window using testData
    window.chrome.storage.sync.getBytesInUse(null, function(tBytes) {
      console.log("Total Bytes:" + tBytes);
      if(tBytes > 0){
          window.chrome.storage.sync.get(['userData'], function(result) {
            setUserList(result.userData);
          });
      }
    });
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

    //Comment below code to test locally in browser window using testData
    window.chrome.storage.sync.set({'userData': newUserList}, function() {
      console.log('item added');
    });
  }

  const removeData = (itemId) =>{
    let newUserList = userList.filter(item => item.id !== itemId);
    setUserList(newUserList);

    //Comment below code to test locally in browser window using testData
    window.chrome.storage.sync.set({'userData': newUserList}, function() {
      console.log('item deleted');
    });
  }

  const showSnackbar = (message) =>{
    setSnackBarMsg(message);
    setSnackbar(true);
  }

  const overrideTheme = createMuiTheme({
    overrides: {
    MuiOutlinedInput : {
        inputMarginDense: {
          cursor: 'pointer'
        },
      },
      MuiInputBase : {
        root: {
          height: '30px'
        },
      },
      MuiSnackbarContent : {
        root : {
          lineHeight: '0.1',
          minWidth: '100px'
        }
      }
    },
    
  });

  const handleCloseSnackbar = () => {
    setSnackbar(false);
  }

  return (
    <div>
      <ThemeProvider theme={overrideTheme}>
        <UserDataList dataList={userList} removeItem={removeData} showMessage={showSnackbar} />
        <Divider/>
        <AddData addItem={insertData}/>
        <Snackbar autoHideDuration="1000" open={snackBar} onClose={handleCloseSnackbar} message={snackBarMsg} key="snackbar1" />
      </ThemeProvider>
    </div>
  );
}

export default App;
