import GitHubIcon from '@material-ui/icons/GitHub';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import { IconButton } from '@material-ui/core';

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
                <IconButton href="https://github.com/somared/QuickCopyChromeExt" size="small" color="primary" edge="end" target="_blank" >
                    <GitHubIcon htmlColor="black" fontSize="small"/>
                </IconButton>
            </Box>
        </div>
    );
}

export default Footer;