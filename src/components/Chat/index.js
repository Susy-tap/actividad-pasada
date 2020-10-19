import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'; 

const useStyles = makeStyles((theme) => ({
    text: {
      padding: theme.spacing(2, 2, 0),
    },
    paper: {
      paddingBottom: 50,
    },
    list: {
      marginBottom: theme.spacing(2),
    },
}));

const Chat = () => {
    const classes = useStyles();
    const [messages, setMessages] = useState([]);
    const addMessage = (message) => {
        messages.push(message);
        setMessages([...messages])
    }


    useEffect(()=>{
        const chatRef = firebase.database().ref('/chat');

        chatRef.on( 
            'child_added',
            snapshot => {
                //nuevo mensaje
                const messageItem = snapshot.val();
                //leeer os datos del usuario
                firebase.database().ref(`/users/${messageItem.user}`)
                .once('value')
                .then(userResp =>{
                    messageItem.user = userResp.val();
                    addMessage(messageItem);
                })
            },
            error => {
                console.log(error);
            }

            )
    }, []);

    return(
        <Container>
        <Paper square className={classes.paper}>
        <Typography className={classes.text} variant="h5" gutterBottom>
         Chat
        </Typography>
        <List className={classes.list}>
          {messages.map(({ date, user, message }) => (
              <ListItem button>
                <ListItemAvatar>
                  <Avatar alt={user.name} src={user.avatar} />
                </ListItemAvatar>
                <ListItemText primary={user ? user.name :'anonymous'} secondary={message} />
              </ListItem>
          ))}
        </List>
      </Paper>
      Nuevo mensaje
      </Container>
    );
}

export default Chat;