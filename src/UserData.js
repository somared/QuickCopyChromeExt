

const UserData = ({data, deleteItem}) =>{

    const sanitizeText = (text) => {
        if(text.length > 40){
            return (text.substring(0,37) + '...')
        }
        return text;
    }

    const handleRemoveItem = (e) =>{
        e.preventDefault();
        deleteItem(e.target.dataset.id);
    }

    const handleCopyItem = (e) =>{
        alert(e.target.dataset.text);
    }

    return(
        <tr style={{backgroundColor:data.bgcolor}}>
            <td>{sanitizeText(data.text)}</td>
            <td><a href="#" data-text={data.text} onClick={handleCopyItem}>copy</a></td>
            <td><a href="#" data-id={data.id} onClick={handleRemoveItem}>delete</a></td>
        </tr>
    );
}

export default UserData; 