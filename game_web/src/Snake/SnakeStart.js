import React, { useContext, useEffect, useState } from 'react';
import Snake from './Snake';
import Food from './Food';
import UserContext from '../Context/UserContext';


const SnakeStart = ({ gameData, updateGameData }) => {
    const randomFood = (...SNAKE_DOT) => {
        const x = Math.floor(Math.random() * 25) * 2;
        const y = Math.floor(Math.random() * 25) * 2;
        SNAKE_DOT.forEach((item) => {
            if (item[0] === x && item[1] === y) randomFood(...SNAKE_DOT);
        })
        return [x, y];
    }
    
    const [SNAKE_DOT, setSNAKE_DOT] = useState([
        [0, 0],
        [2, 0],
        [4, 0],
        [6, 0],
    ]);

    const [FOOD_DOT, setFOOD_DOT] = useState([randomFood()]);

    const [DIRECTION, setDIRECTION] = useState('ArrowRight');

    const [SCORE, setSCORE] = useState(0);

    const [HIGH_SCORE, setHIGH_SCORE] = useState(0);

    //useEffect for getting player's highscore

    const userContext = useContext(UserContext);

    useEffect(() => {
        setHIGH_SCORE(userContext.currentUser.highscore.snake);
    }, []);


    //useEffect for changing the snake's moving direction

    useEffect(() => {
        const changeDirection = (e) => {
            if ((e.key !== 'ArrowRight') && (e.key !== 'ArrowLeft') && (e.key !== 'ArrowUp') && (e.key !== 'ArrowDown')) return;
            switch (DIRECTION) {
                case 'ArrowRight':
                    if (e.key === 'ArrowLeft') return;
                    else setDIRECTION(e.key);
                    break;
                case 'ArrowLeft':
                    if (e.key === 'ArrowRight') return;
                    setDIRECTION(e.key);
                    break;
                case 'ArrowUp':
                    if (e.key === 'ArrowDown') return;
                    setDIRECTION(e.key);
                    break;
                case 'ArrowDown':
                    if (e.key === 'ArrowUp') return;
                    setDIRECTION(e.key);
                    break;
                default:
                    return;
            }
        };
        document.addEventListener('keydown', changeDirection);
        return () => {
            document.removeEventListener('keydown', changeDirection);
        }
    }, [DIRECTION])

    //useEffect for moving the snake

    useEffect(() => {
        if (gameData.isPlaying) {
            const checkFoodEaten = () => {
                const HEAD_DOT = [...SNAKE_DOT[SNAKE_DOT.length - 1]];
                if (HEAD_DOT[0] === FOOD_DOT[0][0] && HEAD_DOT[1] === FOOD_DOT[0][1]) {
                    setFOOD_DOT([randomFood()]);
                    SNAKE_DOT.unshift([]);
                    setSNAKE_DOT([...SNAKE_DOT]);
                    setSCORE(SCORE + 100);
                    SCORE + 100 > HIGH_SCORE && setHIGH_SCORE(SCORE + 100);
                };
            }

            const checkSelfEaten = () => {
                const HEAD_DOT = [...SNAKE_DOT[SNAKE_DOT.length - 1]];
                SNAKE_DOT.pop();
                SNAKE_DOT.forEach((item) => {
                    if (HEAD_DOT[0] === item[0] && HEAD_DOT[1] === item[1]) gameOver();
                })
            }

            const checkCollapseBoxMode = () => {
                const HEAD_DOT = [...SNAKE_DOT[SNAKE_DOT.length - 1]];

                if (HEAD_DOT[0] > 98 || HEAD_DOT[0] < 0 || HEAD_DOT[1] > 98 || HEAD_DOT[1] < 0) gameOver();
            }

            const checkCollapseFreeMode = () => {
                const HEAD_DOT = [...SNAKE_DOT[SNAKE_DOT.length - 1]];

                if (HEAD_DOT[0] > 98) {
                    HEAD_DOT[0] = 0;
                    SNAKE_DOT.shift();
                    SNAKE_DOT.push(HEAD_DOT);
                    setSNAKE_DOT([...SNAKE_DOT]);
                };
                if (HEAD_DOT[0] < 0) {
                    HEAD_DOT[0] = 98;
                    SNAKE_DOT.shift();
                    SNAKE_DOT.push(HEAD_DOT);
                    setSNAKE_DOT([...SNAKE_DOT]);
                }
                if (HEAD_DOT[1] > 98) {
                    HEAD_DOT[1] = 0;
                    SNAKE_DOT.shift();
                    SNAKE_DOT.push(HEAD_DOT);
                    setSNAKE_DOT([...SNAKE_DOT]);
                }
                if (HEAD_DOT[1] < 0) {
                    HEAD_DOT[1] = 98;
                    SNAKE_DOT.shift();
                    SNAKE_DOT.push(HEAD_DOT);
                    setSNAKE_DOT([...SNAKE_DOT]);
                }
            }

            const moveSnake = () => {
                const HEAD_DOT = [...SNAKE_DOT[SNAKE_DOT.length - 1]];
                let NEW_HEAD_DOT = [];
                switch (DIRECTION) {
                    case 'ArrowRight':
                        NEW_HEAD_DOT = [HEAD_DOT[0] + 2, HEAD_DOT[1]];
                        break;
                    case 'ArrowLeft':
                        NEW_HEAD_DOT = [HEAD_DOT[0] - 2, HEAD_DOT[1]];
                        break;
                    case 'ArrowDown':
                        NEW_HEAD_DOT = [HEAD_DOT[0], HEAD_DOT[1] + 2];
                        break;
                    case 'ArrowUp':
                        NEW_HEAD_DOT = [HEAD_DOT[0], HEAD_DOT[1] - 2];
                        break;
                    default:
                        return;
                }
                SNAKE_DOT.shift();
                SNAKE_DOT.push(NEW_HEAD_DOT);
                setSNAKE_DOT([...SNAKE_DOT]);
                gameData.boxMode ? checkCollapseBoxMode() : checkCollapseFreeMode();
                checkFoodEaten();
                checkSelfEaten();
            }

            const gameOver = () => {
                setSNAKE_DOT([[0, 0], [2, 0], [4, 0], [6, 0]]);
                setDIRECTION('ArrowRight');
                updateGameData(
                    {
                        ...gameData,
                        isGameOver: true,
                        isPlaying: false,
                    }
                );
                const userIndex = userContext.userlist.findIndex((item) => item.isLogIn === true);
                userContext.userlist[userIndex].highscore.snake = HIGH_SCORE;
                userContext.updateLocal(userContext.userlist);
            }

            const moveInterval = setInterval(moveSnake, gameData.speed);

            console.log('running');

            return () => {
                clearInterval(moveInterval);
            }
        }
    }, [DIRECTION, SNAKE_DOT, HIGH_SCORE, SCORE])

    return (
        <div>
            <div className="game__screen">
                <h3 className='game__score'>Score: {SCORE}</h3>
                <h3 className='game__highscore'>HighScore: {HIGH_SCORE}</h3>
                <Snake SNAKE_DOT={SNAKE_DOT} />
                <Food FOOD_DOT={FOOD_DOT} />
            </div>
        </div>
    )
}

export default SnakeStart;