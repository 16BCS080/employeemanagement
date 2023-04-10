import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useGetDetailsQuery } from '../../reduxstore/services/authService';
import { logout, setCredentials } from '../../reduxstore/authSlice';
import '../../styles/header.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Tooltip from '@mui/material/Tooltip';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth)
  const dispatch = useDispatch() 

  const { data, isFetching } = useGetDetailsQuery('userDetails', {
    pollingInterval: 900000, // 15mins
  })

  useEffect(() => {
    if (data) dispatch(setCredentials(data))
  }, [data, dispatch])

  return (
    <>
      <Box sx={{ flexGrow: 1 }}> 
        <AppBar position="static">
          <Toolbar className="navmenu-items">
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              EMPLOYEE MANAGEMENT
            </Typography>
            <Box sx={{ display: { xs: 'none', md: 'flex', marginLeft: '30px' } }} className="leftmenu-items">

              
              {
                isFetching
                  ? ``
                  : userInfo !== null
                  ? 
                  <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                      <NavLink to='/books'>
                        <MailIcon />
                      </NavLink>
                    </Badge>
                  </IconButton>
                  : ``
              }  
              {userInfo ? 
                    (  
                      <>
                        <IconButton size="large" aria-label="show 4 new mails" color="inherit"> 
                            <Tooltip title="profile">              
                              <NavLink to='/user-profile'>
                                <AccountCircle /> 
                              </NavLink>  
                            </Tooltip>                   
                        </IconButton>
                        <IconButton size="large" aria-label="show 4 new mails" color="inherit" onClick={() => dispatch(logout())}>
                          <Tooltip title="logout">
                            <NavLink className='button' to='/login'>
                              <LogoutIcon /> 
                            </NavLink>   
                          </Tooltip>                   
                        </IconButton>
                        { userInfo.role === "admin" &&
                          <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                            <Tooltip title="register">
                              <NavLink to='/register'>
                                <PersonAddAltIcon /> 
                              </NavLink>   
                            </Tooltip>                  
                          </IconButton> 
                        }
                      </>                     
                    ) : (                  
                      <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                          <Tooltip title="login">
                              <NavLink className='button' to='/login'> 
                                    <LoginIcon />   
                              </NavLink>
                            </Tooltip> 
                      </IconButton> 
                    )
                } 
              
            </Box>
          </Toolbar>
        </AppBar>
      </Box>  
    </>
  )
}

export default Header
/*       
<div>
  <span>
    {isFetching
      ? `Fetching your profile...`
      : userInfo !== null
      ? `Logged in as ${userInfo.email}`
      : "You're not logged in"}
  </span>          
</div>
<nav className='container navigation'>
  <NavLink to='/'>Home</NavLink>
  {
    isFetching
      ? ``
      : userInfo !== null
      ? <NavLink to='/books'>books</NavLink>
      : 
      <>
        <NavLink to='/login'>Login</NavLink>
        <NavLink to='/register'>Register</NavLink>
      </>
  }
  <NavLink to='/user-profile'>Profile</NavLink>
  <div>
    {userInfo ? 
      (
        <button className='button' onClick={() => dispatch(logout())}>
          Logout
        </button>
      ) : (
        <NavLink className='button' to='/login'>
          Login
        </NavLink>
      )
    }
  </div>
</nav> 
*/
