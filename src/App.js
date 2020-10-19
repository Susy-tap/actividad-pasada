import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './components/layout/Header';
import User from './components/User';
import Routes from './Routes'
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'; 

const firebaseConfig = {
  apiKey: "AIzaSyA60NCQxMSSjwu_OJ3O6gxexUktFmTX16c",
  authDomain: "chat-app-e0368.firebaseapp.com",
  databaseURL: "https://chat-app-e0368.firebaseio.com",
  projectId: "chat-app-e0368",
  storageBucket: "chat-app-e0368.appspot.com",
  messagingSenderId: "1048064752172",
  appId: "1:1048064752172:web:2fd2604252411260626f89",
  measurementId: "G-5512YVN1BL"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);



function App() {
  const [user, setUser] = useState(null);

    const onLogout = () => {
      setUser(null);
    };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(response => {
        if (response) {
          
          //leer datos del usuario
          firebase.database().ref(`/users/${response.uid}`)
          .once('value')
          .then(snapshot => {
            setUser(snapshot.val());
          });
        }
    });
  }, []);



    return (
      <Router>
        <CssBaseline />
        <Header>
        {user && <User user={user} onLogout={onLogout}/>}
        </Header>
        <Routes/>
      </Router>
    );
  }


export default App;
