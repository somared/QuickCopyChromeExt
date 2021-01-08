import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';


const UserData = ({data, deleteItem, showMessage}) =>{

    const handleRemoveItem = (e) =>{
        deleteItem(e);
    }

    const handleCopyItem = (e) =>{
        e.target.select();
        document.execCommand('copy');
        showMessage('Copied');
    }

    return(
        <div>
            <ListItem>
                <TextField style={{backgroundColor:`${data.bgcolor}`}} fullWidth variant="outlined" size="small" value={data.text} onClick={handleCopyItem}/>
                <ListItemSecondaryAction>
                    <IconButton edge="end"  aria-label="comments" onClick={()=>handleRemoveItem(data.id)}  >
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        </div>
    );
}

export default UserData; 