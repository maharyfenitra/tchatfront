import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LogoutIcon from '@mui/icons-material/Logout';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SendIcon from '@mui/icons-material/Send';
import { AppContext } from '../App';
import { useContext} from 'react';
import { useSearchParams } from "react-router-dom";
import TextField from '@mui/material/TextField';
import ListItem from '@mui/material/ListItem';
import axios from "axios"
import {url} from "../utils"
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import RemoveTwoToneIcon from '@mui/icons-material/RemoveTwoTone';
import Button from '@mui/material/Button';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import FaceIcon from '@mui/icons-material/Face';
import Input from '@mui/material/Input';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function DashboardContent() {
  const { users} = useContext(AppContext);
  
  const [message,setMessage] = useState("");
  const [isNewRoomFormActive,setIsNewRoomFormActive] = useState(true)
  const [newRoomName,setNewRoomName] = useState("")
  const [discussions, setDiscutions] =useState([])
  const [searchParams, setSearchParams] = useSearchParams();
  const recipient_id =searchParams.get("id")
  const [fu,setFu] = useState(0);
  React.useEffect(()=>{
    axios.post(url+"messages/getMessages",{_id_1:recipient_id,_id_2:sessionStorage.getItem("current_user_id")}).then((res)=>{ 
        setDiscutions(res.data.messages);
        //console.log(discussions);
    })
  },[fu])
  let ldc = <></>;
  const handleClickItem = (e)=>{
                axios.post(url+"messages/deleteMessage",{message_id:e})
            }
  if(discussions!=null){
        ldc=discussions.map((d)=>{
            let sender_name="Inconnue";

            if(users!=null&&users.users!=null){
                const suser = users.users.filter((u)=>{
                return u._id===d.sender_id
                })
                sender_name = suser[0].name;
            }
            
            return <div key={d._id}><ListItem alignItems="flex-start">
                            <ListItemAvatar>
                            <Avatar alt={sender_name} src="/static/images/avatar/1.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                            primary={<React.Fragment>{d.content} </React.Fragment>}
                            secondary={
                                <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    <ListItemButton value={d._id} onClick={()=>{handleClickItem(d._id)}}>Expéditaire: {sender_name}<RemoveTwoToneIcon/></ListItemButton>
                                    
                                </Typography>
                                </React.Fragment>
                            }
                            />
                            
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        </div>
                        
                        
        })
  }

  setInterval(()=>{
     setFu(fu+1)
  }, 1000);
  const handleTextChange = (e)=>{
        setMessage(e.target.value)
        console.log("change")
  }
  const handleClickSend = (e)=>{
        setMessage("")
        axios.post(url+"messages/newMessage",{ sender_id: sessionStorage.getItem("current_user_id"), recipient_id: recipient_id, content: message })
        .then((res)=>{
                //console.log(res)
                
        }).catch((error)=>{
            console.log(error)
        })
  }
    let il = <></>  
    if(users!=null){
      il = users.users.map((u)=>
        <ListItemButton key={u._id}>
          <ListItemIcon>
            <FaceIcon />
          </ListItemIcon>
          <Button  size="small" href={"Room?id="+u._id} >{u.name}</Button> 
        </ListItemButton>
      )
      const handleNewRoom = async ()=>{
          if(isNewRoomFormActive){
            
            if(newRoomName!==""){
              await axios.post(url+"rooms/newRoom",{name:newRoomName})
              setIsNewRoomFormActive(!isNewRoomFormActive);
              
            }else{
              alert("Vous devez donner un nom à votre nouveau Room")
            }
            
            
          }else{
            setIsNewRoomFormActive(!isNewRoomFormActive);
          }
          
          //alert(isNewRoomFormActive)
      }
      il.push(<><ListItemButton key="XEY">
          <ListItemIcon>
            <FiberNewIcon />
          </ListItemIcon>
          <Button variant="outlined" size="small" onClick={handleNewRoom}>{!isNewRoomFormActive?"Nouveau Room":"Enregistrer"}</Button>
        </ListItemButton>{isNewRoomFormActive&&
        <ListItemButton key="list_item_room_input">
          <Input placeholder="Nom du nouveau Room" inputProps={{ 'aria-label': 'description' }} onChange={(e)=>{setNewRoomName(e.target.value)}}/>
        </ListItemButton>
        }</>)
    }

  const [login,setLogin] = useState(true);
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  if(login){
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex'}}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
            {sessionStorage.getItem("current_user_name")}
            </Typography>
            <IconButton color="inherit" onClick={()=>{setLogin(false)}}>
                <LogoutIcon />
                  Déconnecter    
            </IconButton>    
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {il}
          </List>
        </Drawer>
        {/*** **/}
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                       
                        
                        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        {ldc}
                        <Divider variant="inset" component="li" />
                        <ListItemButton>
                            <TextField id="standard-basic" sx={{width:'80%'}} label="Message" value={message} onChange={handleTextChange} variant="standard" />
                            <ListItemIcon onClick={handleClickSend}>
                            <SendIcon />
                            </ListItemIcon>
                            <ListItemText primary="Envoyer" onClick={handleClickSend}/>
                        </ListItemButton>
                        </List>
                        
                </Paper>
              </Grid>
            </Grid>
            
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );}else{
      return <Navigate to="/login" />
  }
}

export default function Room() {
  return <DashboardContent />;
}