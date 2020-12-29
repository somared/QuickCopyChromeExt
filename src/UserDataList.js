import UserData from "./UserData";

const UserDataList = ({dataList}) => {
    return(
        <div>
            {
                dataList.map(d => {
                    return(<UserData data ={d}/>)
                })
            }
        </div>
    );    
}

export default UserDataList;