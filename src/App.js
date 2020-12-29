import React, {useState} from 'react';
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
      text: item,
      order:1,
      bgcolor:backgroundColor
    };

    let newUserList = [...userList]; 
    newUserList.push(newData);
    setUserList(newUserList);
  }

  return (
    <div>
      <UserDataList dataList={userList} />
      <AddData addItem={insertData}/>
    </div>
  );
}

export default App;
