import GitHubIcon from '@mui/icons-material/GitHub';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';

const Footer = () => {
    
    const StyledDiv = styled('div')({
        padding: '0px 16px 0px 16px',
    });

    return (
        <StyledDiv>
            <Box display="flex" flexDirection="row-reverse" >
                <IconButton href="https://github.com/somared/QuickCopyChromeExt" size="small" color="primary" edge="end" target="_blank" >
                    <GitHubIcon sx={{ color: 'black' }} fontSize="small"/>
                </IconButton>
                <Box sx={{ alignContent: 'center'}}>
                    v1.0.0
                </Box>
            </Box>
            
        </StyledDiv>
    );
}
export default Footer;