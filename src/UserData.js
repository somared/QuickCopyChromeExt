
const UserData = ({data}) =>{
    return(
        <div style={{backgroundColor:data.bgcolor, width:200}}>
            {data.text}
        </div>
    );
}

export default UserData;