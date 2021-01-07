import React, {useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import Divider from '@material-ui/core/Divider'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import UserDataList from "./UserDataList" ;
import AddData from "./AddDataForm"
import data from "./data.json";

function App() {
  const[userList, setUserList] = useState(data);
  // const[userList, setUserList] = useState([]);
  
  // //window.chrome.storage.sync.get return empty obj and not null so to check if storage is empty we have to do as below
  // window.chrome.storage.sync.getBytesInUse(null, function(tBytes) {
  //   console.log("Total Bytes:" + tBytes);
  //   if(tBytes > 0){
  //       window.chrome.storage.sync.get(['userData'], function(result) {
  //         setUserList(result.userData);
  //       });
  //   }
  // });

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

    // window.chrome.storage.sync.set({'userData': newUserList}, function() {
    //   console.log('item added');
    // });
  }

  const removeData = (itemId) =>{
    let newUserList = userList.filter(item => item.id != itemId);
    setUserList(newUserList);

    // window.chrome.storage.sync.set({'userData': newUserList}, function() {
    //   console.log('item deleted');
    // });
  }

  const overrideTheme = createMuiTheme({
    overrides: {
    MuiOutlinedInput : {
        inputMarginDense: {
          cursor: 'pointer'
        },
      },
    },
});

  return (
    <div>
      <ThemeProvider theme={overrideTheme}>
        <UserDataList dataList={userList} removeItem={removeData} />
        <Divider/>
        <AddData addItem={insertData}/>
      </ThemeProvider>
    </div>
  );
}

export default App;
