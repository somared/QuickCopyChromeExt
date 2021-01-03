import List from '@material-ui/core/List';
import UserData from "./UserData";

const UserDataList = ({dataList, removeItem}) => {
    return(
        <div>
            <List dense="true" style={{width:"350px"}}>
                {
                    dataList.map(d => {
                        return(<UserData data={d} deleteItem={removeItem}/>)
                    })
                }
            </List>
        </div>
    );    
}

export default UserDataList;