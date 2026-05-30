import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Block from '@uiw/react-color-block';

const AddData = ({addItem}) =>{

    const[userTextInput, setUserTextInput] = useState('');
    const[userColorInput, setUserColorInput] = useState('#8ED1FC');
    const[showColorPicker, setShowColorPicker] = useState(false);

    const handleTextChange = (e) => {
        setUserTextInput(e.currentTarget.value)
    }

    const handleColorChange = (color) => {
        setUserColorInput(color.hex);
        setShowColorPicker(false);
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(userTextInput){
            addItem(userTextInput, userColorInput);
            setUserTextInput("");
            setUserColorInput("#8ED1FC");
        }
    }

    const handleSwatchClick = () => {
        setShowColorPicker(!showColorPicker);
    };

    const handleClose = () => {
        setShowColorPicker(false);
    };

    const paletteColors = ['#FB8C00', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#F06292', '#F78DA7', '#BA68C8'];

    const ColorSwatch = styled('div')(({ theme }) => ({
        width: '30px',
        height: '24px',
        borderRadius: '2px',
        background: `${userColorInput}`,
        borderWidth: '1px',
        borderStyle: 'solid'
    }));

    const SwatchWrapper = styled('div')(({ theme }) => ({
        padding: '4px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
        margin: '0px 7px 0px 7px'
    }));

    const Popover = styled('div')(({ theme }) => ({
        position: 'absolute',
        zIndex: '1',
        display: 'block'
    }));

    const Cover = styled('div')(({ theme }) => ({
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
    }));
      
    return(
        
        <form onSubmit={handleSubmit}>
            <List dense style={{width:"400px"}}>
                <ListItem>
                    <TextField size="small" value={userTextInput} onChange={handleTextChange} placeholder="Enter new data ..."/>
                    <SwatchWrapper onClick={handleSwatchClick}>
                        <ColorSwatch />
                    </SwatchWrapper>
                    <Button color="primary" variant="contained" onClick={handleSubmit} >Add</Button>
                    { 
                        showColorPicker ? 
                            <Popover>
                                <Cover onClick={handleClose}/>
                                <Block color={userColorInput} colors={paletteColors} onChange={handleColorChange} showTriangle={false} />
                            </Popover>
                            : null 
                    }
                </ListItem>
            </List>
        </form>
    );
}

export default AddData;