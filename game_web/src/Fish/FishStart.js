import './style.css';
import { useContext, useEffect, useRef, useState } from 'react';
import Fish from './Fish';
import UserContext from '../Context/UserContext';
const FishStart = () => {
    const userContext = useContext(UserContext);
    const articleRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [isGameOver, setIsGameOver] = useState(true);
    const [SCORE, setSCORE] = useState(0);
    const [HIGHSCORE, setHIGHSCORE] = useState(userContext.currentUser.highscore.fish);
    const [SPEED, setSPEED] = useState(30);
    const [FISH_DOT, setFISH_DOT] = useState(
        [

        ]
    )

    useEffect(() => {
        const handleStartGame = (e) => {
            if (e.code === 'Space') setIsPlaying(!isPlaying);
        };

        document.addEventListener('keypress', handleStartGame);

        return () => {
            document.removeEventListener('keypress', handleStartGame);
        }
    }, [isPlaying])

    useEffect(() => {
        if (isPlaying) {
            articleRef.current.style.animationPlayState = "running";
        } else {
            articleRef.current.style.animationPlayState = "paused";
        }
    }, [isPlaying])
    return (
        <div className="fish__screen">
            {!isPlaying && <span>Press Space to start</span>}
            <div className='fish__sea'>
                <img src={require("../img/wave.gif")} alt="" />
                <span className='fish__score'>Score: {SCORE}</span>
                <span className='fish__highscore'>HighScore: {HIGHSCORE}</span>
            </div>
            <div className='fish__ground'>
                <article ref={articleRef}
                    style={{
                        animation: `bannermove ${0.12*SPEED}s linear 0s infinite normal none`,
                    }}>
                    <img alt='' src={require("../img/sand.png")} />
                    <img alt='' src={require("../img/sand.png")} />
                </article>
            </div>
        </div>
    )
}

export default FishStart;