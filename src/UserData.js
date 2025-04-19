import ListItem from '@mui/material/ListItem';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

// Styled TextField with pointer cursor
const PointerTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    cursor: 'pointer',
  },
  '& .MuiInputBase-input': {
    cursor: 'pointer',
  },
  '&:hover': {
    cursor: 'pointer',
  },
});

const UserData = ({data, deleteItem, showMessage}) =>{

    const handleRemoveItem = (e) =>{
        deleteItem(e);
        showMessage('Deleted');
    }

    const handleCopyItem = (e) =>{
        e.target.select();
        document.execCommand('copy');
        showMessage('Copied');
    }

    return(
        <div>
            <ListItem>
                <PointerTextField 
                    style={{
                        backgroundColor: `${data.bgcolor}`
                    }} 
                    fullWidth 
                    variant="outlined" 
                    size="small" 
                    value={data.text} 
                    onClick={handleCopyItem}
                    inputProps={{
                        style: { cursor: 'pointer' }
                    }}
                />
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={()=>handleRemoveItem(data.id)}>
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        </div>
    );
}

export default UserData;