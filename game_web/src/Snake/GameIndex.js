import './style.css';
import SnakeStart from "./SnakeStart";
import SnakeIndex from './SnakeIndex';
import SnakeOver from './SnakeOver';
import { useState } from 'react';

const GameIndex = () => {
    const [gameData, setGameData] = useState(
        {
            isPlaying: false,
            isGameOver: false,
            speed: 60,
            boxMode: true,
        }
    )

    const updateGameData = (newGameData) => {
        setGameData(newGameData);
    }
    return (
        <div className='index'>
            {gameData.isPlaying === false && gameData.isGameOver === false && <SnakeIndex gameData={gameData} updateGameData={updateGameData} />}
            {gameData.isPlaying === true && gameData.isGameOver === false && <SnakeStart gameData={gameData} updateGameData={updateGameData} />}
            {gameData.isPlaying === false && gameData.isGameOver === true && <SnakeOver gameData={gameData} updateGameData={updateGameData} />}
        </div>
    )
}

export default GameIndex;