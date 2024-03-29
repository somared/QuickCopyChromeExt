import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { TwitterPicker } from 'react-color';

const AddData = ({addItem}) =>{

    const[userTextInput, setUserTextInput] = useState('');
    const[userColorInput, setUserColorInput] = useState('#FFFFFF');
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
            setUserColorInput("#FFFFFF");
        }
    }

    const handleSwatchClick = () => {
        setShowColorPicker(!showColorPicker);
    };

    const handleClose = () => {
        setShowColorPicker(false);
    };

    const paletteColors = ['#FB8C00', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#F06292', '#F78DA7', '#BA68C8'];

    const useStyles = makeStyles({
        color: {
            width: '30px',
            height: '24px',
            borderRadius: '2px',
            background: `${userColorInput}`,
            borderWidth: '1px',
            borderStyle: 'solid'
          },
          swatch: {
            padding: '4px',
            background: '#fff',
            borderRadius: '1px',
            boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
            display: 'inline-block',
            cursor: 'pointer',
            margin: '0px 7px 0px 7px'
            
          },
          popover: {
            position: 'absolute',
            zIndex: '1',
            display:'block'
          },
          cover: {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
          }
      });

    const myStyle = useStyles();
      
    return(
        
        <form onSubmit={handleSubmit}>
            <List dense="true" style={{width:"350px"}}>
                <ListItem>
                    <TextField size="small" value={userTextInput} onChange={handleTextChange} placeholder="Enter new data ..."/>
                    <div className={ myStyle.swatch } onClick={handleSwatchClick}>
                        <div className={ myStyle.color } />
                    </div>
                    <Button color="primary" variant="contained" onClick={handleSubmit} >Add</Button>
                    { 
                        showColorPicker? 
                            <div className={ myStyle.popover }>
                                <div className={ myStyle.cover } onClick={ handleClose }/>
                                <TwitterPicker color={userColorInput} colors={paletteColors} onChange={handleColorChange} triangle="hide" /> 
                            </div>
                            : null 
                    }
                </ListItem>
            </List>
        </form>
    );
}

export default AddData;