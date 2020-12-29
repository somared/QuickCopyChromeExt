import React, {useState} from 'react';
const AddData = ({addItem}) =>{

    const[userTextInput, setUserTextInput] = useState('');
    const[userColorInput, setUserColorInput] = useState('#FFFFFF');

    const handleTextChange = (e) => {
        setUserTextInput(e.currentTarget.value)
    }

    const handleColorChange = (e) => {
        setUserColorInput(e.currentTarget.value)
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        addItem(userTextInput, userColorInput);
        setUserTextInput("");
        setUserColorInput("#FFFFFF");
    }

    return(
        <form onSubmit={handleSubmit}>
            <input type="text" value={userTextInput} onChange={handleTextChange} placeholder="Enter new data ..."/>
            <input type="text" value={userColorInput} onChange={handleColorChange} placeholder="Enter color hex code ..."/>
            <button>Add</button>
        </form>
    );
}

export default AddData;