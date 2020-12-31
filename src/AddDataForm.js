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
        addItem(userTextInput, userColorInput);
        setUserTextInput("");
        setUserColorInput("#DBA4A4");
    }

    return(
        <form onSubmit={handleSubmit}>
            <div>
                <input type="text" class="form-control form-control-sm" value={userTextInput} onChange={handleTextChange} placeholder="Enter new data ..."/>
                <input type="color" class="form-control form-control-color form-control-sm" value={userColorInput} onChange={handleColorChange} title="Choose your color"></input>
                <button>Add</button>
            </div>
        </form>
    );
}

export default AddData;