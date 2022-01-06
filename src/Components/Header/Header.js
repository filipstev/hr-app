import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import axiosInstance from '../../helpers/axiosInstance';

const pages = ['Page One', 'Page Two', 'Page Three'];

const ResponsiveAppBar = (props) => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [logo, setLogo] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const navigatePage = (page) => {
        handleCloseNavMenu();
    };

    useEffect(() => {
        axiosInstance
            .get('/companies/2?populate=*')
            .then((data) => {
                console.log(
                    'https://internship-hr-app.herokuapp.com' +
                        data.data.data.attributes.logo.data.attributes.url
                );
                setLogo(
                    'https://internship-hr-app.herokuapp.com' +
                        data.data.data.attributes.logo.data.attributes.url
                );
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <AppBar
            sx={{ bgcolor: '#E5E5E5', position: 'absolute', top: 0, left: 0 }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, flexGrow: 1, color: 'black' }}
                    >
                        <img
                            style={{
                                height: '45px',
                                width: '45px',
                            }}
                            src={logo}
                            alt="Logo"
                        />
                    </Typography>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' },
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end',
                            flexDirection: 'column',
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                        >
                            <MenuIcon style={{ color: 'black' }} />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'flex', md: 'none' },
                                flexDirection: 'column',
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    key={page}
                                    onClick={() => navigatePage(page)}
                                >
                                    <Link
                                        to={`/${page
                                            .toLowerCase()
                                            .replace(' ', '')}`}
                                        onClick={handleCloseNavMenu}
                                        style={{
                                            color: 'black',
                                            textDecoration: 'none',
                                            padding: '5px 12px',
                                        }}
                                    >
                                        {page}
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Box
                        sx={{
                            flexGrow: 0,
                            display: { xs: 'none', md: 'flex' },
                        }}
                    >
                        {pages.map((page) => (
                            <Link
                                to={`/${page.toLowerCase().replace(' ', '')}`}
                                style={{
                                    textDecoration: 'none',
                                    color: 'black',
                                    marginRight: '32px',
                                }}
                            >
                                {page}
                            </Link>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;
