import Octopus from "./Octopus";
import Whale from './Whale';
import Shark from './Shark';
import { useEffect } from "react";

const Enemy = ({ INITIAL_X, INITIAL_Y, enemyId, getEnemyLength, getENEMY_DOT }) => {

    const createEnemy = () => {
        switch (enemyId) {
            case 0:
                return Shark({ INITIAL_X, INITIAL_Y });
            case 1:
                return Octopus({ INITIAL_X, INITIAL_Y });
            case 2:
                return Whale({ INITIAL_X, INITIAL_Y });
            default:
                return <></>;
        }
    }

    const ENEMY_DOT = createEnemy();

    useEffect(() => {
        getEnemyLength(ENEMY_DOT[1]);
        getENEMY_DOT(ENEMY_DOT[0]);
    }, [ENEMY_DOT])

    return (
        ENEMY_DOT[0].map((item, i) => {
            return (
                <div
                    key={i}
                    className="dot"
                    style={{ left: `${item[0]}vh`, top: `${item[1]}vh`, backgroundColor: `${item[2]}` }}>
                </div>
            )
        })
    )
}

export default Enemy;