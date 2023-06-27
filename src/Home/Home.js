import './style.css';
import GamePage from './GamePage';
import { useContext, } from 'react';
import UserContext from '../Context/UserContext';
import LogIn from './LogIn';

const Home = () => {
    const userContext = useContext(UserContext);

    return (
        <div className='homepage'>
            <div className='welcome__text'>
                <h1>Welcome</h1>
                <h3> to Net's Web Game </h3>
            </div>
            {userContext.currentUser.isLogIn ?
                <GamePage /> :
                <LogIn />
            }
        </div>
    )
}

export default Home;