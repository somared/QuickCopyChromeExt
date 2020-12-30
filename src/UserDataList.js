import UserData from "./UserData";

const UserDataList = ({dataList, removeItem}) => {
    return(
        <table style={{width:300}}>
            <tbody>
                {
                    dataList.map(d => {
                        return(<UserData data={d} deleteItem={removeItem}/>)
                    })
                }
            </tbody>
        </table>
    );    
}

export default UserDataList;