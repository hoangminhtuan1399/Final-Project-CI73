import './style.css';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import Fish from './Fish';
import Enemy from './Enemy';
import UserContext from '../Context/UserContext';
import sand from "../img/sand.png";
import undersea from "../img/undersea.gif";
const FishStart = () => {
    const userContext = useContext(UserContext);
    const articleRef = useRef(null);

    //create game setting
    const [isPlaying, setIsPlaying] = useState(false);
    const [INITIAL_X, setINITIAL_X] = useState(120);
    const [INITIAL_Y, setINITIAL_Y] = useState(32);
    const [isGameOver, setIsGameOver] = useState(false);
    const [SCORE, setSCORE] = useState(0);
    const [SPEED, setSPEED] = useState(30);
    const [POSITION, setPOSITION] = useState(1);
    const [HIGHSCORE, setHIGHSCORE] = useState(userContext.currentUser.highscore.fish);


    //draw fish (turtle) 
    const createFishBody = useCallback(() => {
        let FISH_DOT_BODY = [];
        for (let row = 30; row <= 34; row += 2) {
            for (let col = 12; col <= 22; col += 2) {
                FISH_DOT_BODY.push([col, row, "green"]);
            };
        };
        for (let col = 14; col <= 20; col += 2) {
            FISH_DOT_BODY.push([col, 28, "green"]);
        };
        return [...FISH_DOT_BODY, [16, 26, "green"], [18, 26, "green"]];
    }, []);

    const createFishLeg = useCallback(() => {
        let FISH_DOT_LEG = [];
        for (let col = 12; col <= 22; col += 2) {
            FISH_DOT_LEG.push([col, 36, "greenyellow"]);
        };
        return [...FISH_DOT_LEG, [12, 38, "greenyellow"], [14, 38, "greenyellow"], [20, 38, "greenyellow"], [22, 38, "greenyellow"]];
    }, []);

    const createFishHead = useCallback(() => {
        let FISH_DOT_HEAD = [];
        for (let row = 28; row <= 34; row += 2) {
            for (let col = 24; col <= 26; col += 2) {
                FISH_DOT_HEAD.push([col, row, "greenyellow"]);
                if (row === 30 && col === 26) { FISH_DOT_HEAD.push([col, row, "black"]); continue };
            };
        };
        return [...FISH_DOT_HEAD, [28, 30, 'greenyellow'], [28, 32, 'greenyellow']];
    }, []);

    const INITIAL_FISH_DOT = [[10, 34, "greenyellow"], ...createFishBody(), ...createFishLeg(), ...createFishHead()];

    const [FISH_DOT, setFISH_DOT] = useState(
        [
            ...INITIAL_FISH_DOT
        ]
    )

    //function to move enemy
    const moveEnemy = useCallback(() => {
        setINITIAL_X(prev => prev - 4);
    }, []);

    //function to create random kind of enemy
    const createEnemy = useCallback(() => {
        setINITIAL_X(120);
        setEnemyId(randomId());
        setEnemyPosition(randomPosition());
    }, []);


    const randomId = useCallback(() => {
        return Math.floor(Math.random() * 3);
    }, []);
    const [enemyId, setEnemyId] = useState(randomId());

    //function to random enemy position
    const randomPosition = useCallback(() => {
        return Math.floor(Math.random() * 3);
    }, []);
    const [enemyPostion, setEnemyPosition] = useState(randomPosition());

    useEffect(() => {
        switch (enemyPostion) {
            case 0:
                setINITIAL_Y(14);
                break;
            case 1:
                break;
            case 2:
                setINITIAL_Y(50);
                break;
            default:
                break;
        }
    }, [enemyPostion]);

    //function to get enemy's length and check if enemy out 
    const [enemyLength, setEnemyLength] = useState(0);
    const getEnemyLength = useCallback((length) => {
        setEnemyLength(length);
    }, []);

    const checkEnemyOut = useCallback(() => {
        if (INITIAL_X < (- enemyLength)) {
            createEnemy();
            setSCORE(prev => {
                if ((prev + 100) > HIGHSCORE) setHIGHSCORE(prev + 100);
                setSPEED(SPEED * 0.9);
                return prev + 100;
            });
        }
    }, [INITIAL_X, enemyLength]);

    //function to check collision
    const [ENEMY_DOT, setENEMY_DOT] = useState([]);
    const getENEMY_DOT = useCallback((updated) => {
        setENEMY_DOT(updated);
    }, []);

    const checkCollision = useCallback(() => {
        for (let i = 0; i < FISH_DOT.length; i++) {
            const fishItem = FISH_DOT[i];
            for (let j = 0; j < ENEMY_DOT.length; j++) {
                const enemyItem = ENEMY_DOT[j];
                if (fishItem[0] === enemyItem[0] && fishItem[1] === enemyItem[1]) {
                    createEnemy();
                    setIsGameOver(true);
                };
            }
        };
    }, [FISH_DOT, ENEMY_DOT, isGameOver]);

    //useEffect to start the game
    useEffect(() => {
        if (!isGameOver) {
            const handleStartGame = (e) => {
                if (e.code === 'Space') {
                    setTimeout(() => {
                        setIsPlaying(true);
                    }, 500);
                }
            };

            document.addEventListener('keydown', handleStartGame);

            if (isPlaying) {
                articleRef.current.style.animationPlayState = "running";
            } else {
                articleRef.current.style.animationPlayState = "paused";
            }

            return () => {
                document.removeEventListener('keydown', handleStartGame);
            }
        }
    }, [isPlaying, isGameOver])

    useEffect(() => {
        if (isPlaying) {
            const intervalMoveEnemy = setInterval(() => {
                moveEnemy();
                checkCollision();
                checkEnemyOut();
            }, SPEED);

            return () => {
                clearInterval(intervalMoveEnemy);
            }
        }
    }, [isPlaying, SPEED, INITIAL_X, enemyLength]);

    //useEffect to end game
    useEffect(() => {
        if (isPlaying && isGameOver) {
                setIsPlaying(false);
                setSCORE(0);
                setSPEED(20);
                setPOSITION(1);
                setTimeout(() => setIsGameOver(false), 2000);
                const userIndex = userContext.userlist.findIndex((item) => item.isLogIn === true);
                userContext.userlist[userIndex].highscore.fish = HIGHSCORE;
                userContext.updateLocal(userContext.userlist);
        }
    }, [isGameOver, isPlaying]);

    //useEffect to changing position
    useEffect(() => {
        const handleChangePosition = (e) => {
            if (e.code === 'ArrowDown' && isPlaying) {
                setPOSITION((prev) => {
                    prev > 1 ? prev = 2 : prev += 1;
                    return prev;
                })
            }
            if (e.code === 'ArrowUp' && isPlaying) {
                setPOSITION((prev) => {
                    prev < 1 ? prev = 0 : prev -= 1;
                    return prev;
                })
            }
        }

        switch (POSITION) {
            case 0:
                setFISH_DOT(INITIAL_FISH_DOT.map((item) => {
                    item[1] = item[1] - 20;
                    return item;
                }));
                break;
            case 1:
                setFISH_DOT(INITIAL_FISH_DOT);
                break;
            case 2:
                setFISH_DOT(INITIAL_FISH_DOT.map((item) => {
                    item[1] = item[1] + 20;
                    return item;
                }));
                break;
            default:
                break;
        }
        document.addEventListener('keydown', handleChangePosition);

        return () => {
            document.removeEventListener('keydown', handleChangePosition);
        }
    }, [isPlaying, POSITION]);

    return (
        <div className="fish__screen">
            {!isPlaying && !isGameOver && <span>Press Space to start {"\n"} Up Down to move</span>}
            {!isPlaying && isGameOver && <span className='fish__gameover'>Game Over</span>}
            <div className='fish__sea'>
                <img className='undersea__gif' src={undersea} alt="" />
                <span className='fish__score'>Score: {SCORE}</span>
                <span className='fish__highscore'>HighScore: {HIGHSCORE}</span>
                {isPlaying && <Fish FISH_DOT={FISH_DOT} />}
                {isPlaying && <Enemy INITIAL_X={INITIAL_X} INITIAL_Y={INITIAL_Y} enemyId={enemyId} getEnemyLength={getEnemyLength} getENEMY_DOT={getENEMY_DOT} />}
            </div>
            <div className='fish__ground'>
                <article ref={articleRef}
                    style={{
                        animation: `bannermove 4s linear 0s infinite normal none`,
                    }}>
                    <img alt='' src={sand} />
                    <img alt='' src={sand} />
                </article>
            </div>
        </div>
    )
}

export default FishStart;