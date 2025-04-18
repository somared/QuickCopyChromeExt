import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import UserData from "./UserData";

const UserDataList = ({dataList, removeItem, showMessage}) => {
    return(
        <div style={{width:"350px"}}>
            {
                (dataList.length > 0) ?
                    <List dense >
                        {
                            dataList.map(d => {
                                return(<UserData data={d} deleteItem={removeItem} key={d.id} showMessage={showMessage}/>)
                            })
                        }
                    </List>
                    :
                    <Card>
                        <CardContent>No data is configured. Add text using below form</CardContent>
                    </Card>
            }
        </div>
    );    
}

export default UserDataList;