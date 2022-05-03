import './App.css';
import UserContext from './Context/UserContext';
import GameContext from './Context/GameContext';
import Home from './Home/Home';
import { useEffect, useState, } from 'react';
import PlayPage from './Home/PlayPage';


function App() {

  //set InitialUser when no user is Logged In
  const initialUser = {
    username: '',
    password: '',
    isLogIn: false,
    highscore: {
      snake: 0,
      fish: 0,
    },
  };

  //create userlist and get userlist from localstorage
  const [userlist, setUserlist] = useState([]);

  useEffect(() => {
    const CHECK_USERLIST = localStorage.userlist;
    if (!CHECK_USERLIST) {
      localStorage.userlist = JSON.stringify(userlist);
    } else {
      setUserlist(JSON.parse(localStorage.userlist));
    };
  }, []);

  //create function to update localstorage when userlist changes
  const updateLocal = (userlist) => {
    localStorage.userlist = JSON.stringify(userlist);
  }

  //create current user and get data from logged in user from localstorage
  const [currentUser, setCurrentUser] = useState({ ...initialUser });

  const checkLogInUser = (userlist) => {
    const CHECK_LOGIN_USER = userlist.filter((item) => item.isLogIn === true)[0];
    return CHECK_LOGIN_USER ? { ...CHECK_LOGIN_USER } : { ...initialUser };
  }

  useEffect(() => {
    setCurrentUser(checkLogInUser(userlist));
  }, [userlist]);

  //create a "fake" game context
  const [playingSnake, setPlayingSnake] = useState(false);
  const snakeGame = {
    playing: playingSnake,
    setPlaying: setPlayingSnake,
  };
  const [playingFish, setPlayingFish] = useState(false);
  const fishGame = {
    playing: playingFish,
    setPlaying: setPlayingFish,
  };

  const gameContext = { snakeGame, fishGame };

  // create function to check if a game is playing
  const checkGamePlaying = () => {
    const keyArray = Object.keys(gameContext);
    for (let i = 0; i < keyArray.length; i++) {
      const key = keyArray[i];
      if (gameContext[key].playing === true) return true;
    }
    return false;
  }

  return (
    <UserContext.Provider value={
      {
        userlist: userlist,
        setUserlist: setUserlist,
        updateLocal: updateLocal,
        currentUser: currentUser,
        setCurrentUser: setCurrentUser,
        initialUser: initialUser,
      }
    }>
      <GameContext.Provider value={{ snakeGame, fishGame }}>
        <div className="App">
          {!checkGamePlaying() && <Home />}
          {checkGamePlaying() && <PlayPage />}
        </div>
      </GameContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
