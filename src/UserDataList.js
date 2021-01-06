import List from '@material-ui/core/List';
import UserData from "./UserData";

const UserDataList = ({dataList, removeItem}) => {
    return(
        <div>
            <List dense="true" style={{width:"350px"}}>
                {
                    dataList.map(d => {
                        return(<UserData data={d} deleteItem={removeItem} key={d.id}/>)
                    })
                }
            </List>
        </div>
    );    
}

export default UserDataList;