import GitHubIcon from '@material-ui/icons/GitHub';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const Footer = () => {

    const useStyles = makeStyles({
        divStyle: {
            padding: '0px 16px 0px 16px',
          }
      });
    
    const myStyle = useStyles();

    return (
        <div className={myStyle.divStyle}>
            <Box display="flex" flexDirection="row-reverse" >
                <Button href="https://github.com/somared/QuickCopyChromeExt" size="small" color="primary" startIcon={<GitHubIcon />} target="_blank" >Source</Button>
            </Box>
        </div>
    );
}

export default Footer;