import UserData from "./UserData";

const UserDataList = ({dataList}) => {
    return(
        <table style={{width:300}}>
            {
                dataList.map(d => {
                    return(<UserData data ={d}/>)
                })
            }
        </table>
    );    
}

export default UserDataList;