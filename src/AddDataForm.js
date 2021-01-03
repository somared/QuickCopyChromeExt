import React, {useState} from 'react';
const AddData = ({addItem}) =>{

    const[userTextInput, setUserTextInput] = useState('');
    const[userColorInput, setUserColorInput] = useState('#DBA4A4');

    const handleTextChange = (e) => {
        setUserTextInput(e.currentTarget.value)
    }

    const handleColorChange = (e) => {
        setUserColorInput(e.currentTarget.value)
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(userTextInput){
            addItem(userTextInput, userColorInput);
            setUserTextInput("");
            setUserColorInput("#DBA4A4");
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <div>
                <input type="text" value={userTextInput} onChange={handleTextChange} placeholder="Enter new data ..."/>
                <input type="color" value={userColorInput} onChange={handleColorChange} title="Choose your color"></input>
                <button>Add</button>
            </div>
        </form>
    );
}

export default AddData;