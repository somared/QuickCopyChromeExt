

const UserData = ({data}) =>{
    return(
        <tr style={{backgroundColor:data.bgcolor}}>
            <td>{sanitizeText(data.text)}</td>
            <td><a href="#">copy</a></td>
        </tr>
    );
}

const sanitizeText = (text) => {
    if(text.length > 40){
        return (text.substring(0,37) + '...')
    }
    return text;
}

export default UserData; 