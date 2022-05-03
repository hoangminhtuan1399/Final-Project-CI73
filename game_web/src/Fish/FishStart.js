import './style.css';
import { useContext, useEffect, useState } from 'react';
import Fish from './Fish';
import Dust from './Dust';
import UserContext from '../Context/UserContext';
const FishStart = () => {
    const userContext = useContext(UserContext);

    const [isPlaying, setIsPlaying] = useState(false);
    const [isGameOver, setIsGameOver] = useState(true);
    const [SCORE, setSCORE] = useState(0);
    const [HIGHSCORE, setHIGHSCORE] = useState(userContext.currentUser.highscore.fish);
    const [SPEED, setSPEED] = useState(30);
    const [FISH_DOT, setFISH_DOT] = useState(
        [

        ]
    )

    const [DUST_DOT, setDUST_DOT] = useState(
        [
            [5, 6, 2, 1], [15, 8, 1, 1], [25, 10, 2, 1], [35, 8, 3, 1],
            [45, 4, 2, 1], [55, 6, 2, 1], [65, 8, 1, 1], [75, 6, 2, 1],
            [85, 8, 2, 1], [95, 10, 2, 1], [105, 6, 2, 1], [115, 4, 2, 1]
        ]
    )

    useEffect(() => {
        const handleStartGame = (e) => {
            if (e.code==='Space') setIsPlaying(!isPlaying);
        };
        
        document.addEventListener('keypress', handleStartGame);
        
        return () => {
            document.removeEventListener('keypress', handleStartGame);
        }
    },[isPlaying])

    useEffect(() => {
        if (isPlaying) {
            const moveDust = () => {
                setDUST_DOT(DUST_DOT.map((item) => {
                    item[0] = item[0] - 1;
                    if (item[0] < 0) item[0] = 120;
                    return item;
                }));
            };
            const moveDustInterval = setInterval(moveDust, SPEED);
            return () => {
                clearInterval(moveDustInterval);
            }
        }
    }, [isPlaying])
    return (
        <div className="fish__screen">
            {!isPlaying && <span>Press Space to start</span>}
            <div className='fish__sky'>
                <Fish FISH_DOT={FISH_DOT} />
                <span className='fish__score'>Score: {SCORE}</span>
                <span className='fish__highscore'>HighScore: {HIGHSCORE}</span>
            </div>
            <div className='fish__ground'>
                <Dust DUST_DOT={DUST_DOT} />
            </div>
        </div>
    )
}

export default FishStart;