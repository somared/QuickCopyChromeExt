import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import UserData from "./UserData";

const UserDataList = ({dataList, removeItem, showMessage}) => {
    return(
        <div style={{width:"350px"}}>
            {
                (dataList.length > 0) ?
                    <List dense="true" >
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