import React, { useEffect, useState } from 'react';
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

const pages = ['Tesla', 'Ghetto', 'Page Three'];

const ResponsiveAppBar = (props) => {
    const [width, setWidth] = useState(window.innerWidth);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }

    const isMobile = width <= 900;
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

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        };
    }, []);
    const navigatePage = (page) => {
        handleCloseNavMenu();
    };

    const drawerList = [
        {
            text: 'Pending for approval',
            navigateTo: 'team/pending',
        },
        {
            text: 'Team',
            navigateTo: 'team',
        },
        {
            text: 'Questions',
            navigateTo: 'questions',
        },
        {
            text: 'Company Info',
            navigateTo: '',
        },
        {
            text: 'My Profile',
            navigateTo: 'my-profile',
        },
    ];

    useEffect(() => {
        axiosInstance
            .get('/companies/2?populate=*')
            .then((data) => {
                // console.log(
                //     'https://internship-hr-app.herokuapp.com' +
                //         data.data.data.attributes.logo.data.attributes.formats
                //             .small.url
                // );
                setLogo(
                    data.data.data.attributes.logo.data.attributes.formats
                        .thumbnail.url
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
                            {!isMobile
                                ? pages.map((page) => (
                                      <MenuItem
                                          key={page}
                                          onClick={() => navigatePage(page)}
                                      >
                                          <Link
                                              to={`/team/${page
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
                                  ))
                                : drawerList.map((item) => (
                                      <MenuItem
                                          key={item.navigateTo}
                                          onClick={() =>
                                              navigatePage(item.navigateTo)
                                          }
                                      >
                                          <Link
                                              to={`/${item.navigateTo
                                                  .toLowerCase()
                                                  .replace(' ', '')}`}
                                              onClick={handleCloseNavMenu}
                                              style={{
                                                  color: 'black',
                                                  textDecoration: 'none',
                                                  padding: '5px 12px',
                                              }}
                                          >
                                              {item.text}
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
                        {!isMobile
                            ? pages.map((page) => (
                                  <Link
                                      to={`/team/${page
                                          .toLowerCase()
                                          .replace(' ', '')}`}
                                      style={{
                                          textDecoration: 'none',
                                          color: 'black',
                                          marginRight: '32px',
                                      }}
                                  >
                                      {page}
                                  </Link>
                              ))
                            : drawerList.map((item) => (
                                  <Link
                                      to={`/team/${item.navigateTo
                                          .toLowerCase()
                                          .replace(' ', '')}`}
                                      style={{
                                          textDecoration: 'none',
                                          color: 'black',
                                          marginRight: '32px',
                                      }}
                                  >
                                      {item.text}
                                  </Link>
                              ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;
