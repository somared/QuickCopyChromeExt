import GitHubIcon from '@mui/icons-material/GitHub';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import { Help } from '@mui/icons-material';

const Footer = () => {
    
    const StyledDiv = styled('div')({
        padding: '0px 16px 0px 16px',
    });

    return (
        <StyledDiv>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <Box>
                    v2.0.0
                </Box>
                <IconButton href="https://somared.github.io/QuickCopyChromeExt" size="small" color="primary" target="_blank" >
                    <Help sx={{ color: 'black' }} fontSize="small"/>
                </IconButton>
                <IconButton href="https://github.com/somared/QuickCopyChromeExt" size="small" color="primary" edge="end" target="_blank" >
                    <GitHubIcon sx={{ color: 'black' }} fontSize="small"/>
                </IconButton>
            </Box>
        </StyledDiv>
    );
}
export default Footer;