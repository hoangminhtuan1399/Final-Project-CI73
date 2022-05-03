import { useContext } from 'react';
import GameContext from '../Context/GameContext';
import UserContext from '../Context/UserContext';

const GameItem = ({game, name, highscore}) => {
    const userContext = useContext(UserContext);
    const gameContext = useContext(GameContext);
    const handlePlayGame = (game) => { 
        Object.keys(gameContext).forEach((key) => {
            gameContext[key].setPlaying(false);
        });
        gameContext[game].setPlaying(true);
    };
    return (
        <div className="game__item" onClick={() => {handlePlayGame(game)}}>
            <div className="game__name">
                {name}
            </div>
            <div className="game__icon">
                <img alt='' src={require('../img/background_1.jpg')} />
            </div>
            <div className="game_highscore">
                Highscore: {highscore}
            </div>
        </div>
    )
}

export default GameItem;