import React, {useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import UserDataList from "./UserDataList" ;
import AddData from "./AddDataForm"
import data from "./data.json";

function App() {
  const[userList, setUserList] = useState(data);
  
  // window.chrome.storage.sync.getBytesInUse(null, function(tBytes) {
  //   console.log("Total Bytes:" + tBytes);
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
  }

  const removeData = (itemId) =>{
    let newUserList = userList.filter(item => item.id != itemId);
    setUserList(newUserList);
  }

  return (
    <div>
      <UserDataList dataList={userList} removeItem={removeData} />
      <AddData addItem={insertData}/>
    </div>
  );
}

export default App;
