import UserData from "./UserData";

const UserDataList = ({dataList, removeItem}) => {
    return(
        <table className="table table-hover table-sm" style={{width:300, margin:10}}>
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