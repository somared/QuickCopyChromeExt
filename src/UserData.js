import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

const UserData = ({data, deleteItem}) =>{

    const sanitizeText = (text) => {
        if(text.length > 40){
            return (text.substring(0,37) + '...')
        }
        return text;
    }

    const handleRemoveItem = (e) =>{
        deleteItem(e);
    }

    const handleCopyItem = (e) =>{
        alert(e)
    }

    return(
        <div>
            <ListItem button>
                <ListItemText primary={sanitizeText(data.text)} onClick={()=>handleCopyItem(data.text)} />
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="comments" onClick={()=>handleRemoveItem(data.id)} >
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        </div>
    );
}

export default UserData; 