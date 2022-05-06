import GameIndex from '../Snake/GameIndex';
import { ImArrowLeft } from 'react-icons/im';
import './style.css';
import { useContext } from 'react';
import UserContext from '../Context/UserContext';
import GameContext from '../Context/GameContext';
import FishStart from '../Fish/FishStart';

const PlayPage = () => {
    const userContext = useContext(UserContext);
    const gameContext = useContext(GameContext);
    
    const handleLogOut = () => {
        const userIndex = userContext.userlist.findIndex(item => item.username === userContext.currentUser.username);
        userContext.userlist[userIndex].isLogIn = false;
        userContext.updateLocal(userContext.userlist);
        userContext.setCurrentUser(
            {
                ...userContext.initialUser,
                isLogIn: false,
            }
        );
        Object.keys(gameContext).forEach((key) => {
            gameContext[key].setPlaying(false);
        });
    };

    const handleBackToPage = () => {
        Object.keys(gameContext).forEach((key) => {
            gameContext[key].setPlaying(false);
        });
    };

    return (
        <div className='homepage'>
            <nav className='navigation'>
                <div className='nav--back' onClick={handleBackToPage}>
                    <ImArrowLeft />
                    <h5>Back to page</h5>
                </div>
                <h1>Net's Web Game</h1>
                <div className='nav--logout'>
                    <span className='player__name'>{userContext.currentUser.username} </span>
                    <span
                        onClick={handleLogOut}
                        className="logout"> 
                        | Log out
                    </span>
                </div>
            </nav>
            {gameContext.snakeGame.playing && <GameIndex />}
            {gameContext.fishGame.playing && <FishStart />}
        </div>
    )
}

export default PlayPage;