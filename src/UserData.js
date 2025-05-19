// filepath: c:\MyRepos\QuickCopyChromeExt\src\UserData.js
import ListItem from '@mui/material/ListItem';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Box from '@mui/material/Box';

// Styled TextField with pointer cursor
const PointerTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    cursor: "pointer",
  },
  "& .MuiInputBase-input": {
    cursor: "pointer",
  },
  "&:hover": {
    cursor: "pointer",
  },
});

// Styled drag handle
const DragHandle = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginRight: "8px",
  cursor: "grab",
  color: theme.palette.text.secondary,
  "&:hover": {
    color: theme.palette.text.primary,
  },
}));

const UserData = ({ data, deleteItem, showMessage, id, isDragging }) => {
    // Set up sortable attributes for this component
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging: isSortableDragging,
    } = useSortable({ id: id || data.id });
    
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging || isSortableDragging ? 0.5 : 1,
        position: "relative",
        zIndex: isDragging ? 999 : "auto",
    };

    const handleRemoveItem = (e) => {
        deleteItem(e);
        showMessage("Deleted");
    };

    const handleCopyItem = (e) => {
        e.target.select();
        document.execCommand("copy");
        showMessage("Copied");
    };
    
    return (
        <div ref={setNodeRef} style={style}>
            <ListItem>
                <DragHandle {...attributes} {...listeners}>
                    <DragIndicatorIcon />
                </DragHandle>
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
                        style: { cursor: "pointer" }
                    }}
                />
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveItem(data.id)}>
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        </div>
    );
};

export default UserData;
