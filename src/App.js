import React, {useState} from 'react';
import UserDataList from "./UserDataList" ;
import data from "./data.json";

function App() {
  //const[userList, setUserList] = useState(data);
  
  return (
    <div>
      <UserDataList dataList={data} />
    </div>
  );
}

export default App;
