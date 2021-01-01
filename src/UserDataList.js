import List from '@material-ui/core/List';
import UserData from "./UserData";

const UserDataList = ({dataList, removeItem}) => {

    const handleRemoveItem = (e) =>{
        alert(e.target.dataset.id);
    }

    return(
        <List dense="true" style={{width:"350px"}}>
            {
                dataList.map(d => {
                    return(<UserData data={d} deleteItem={removeItem}/>)
                })
            }
        </List>
    );    
}

export default UserDataList;