import { useEffect } from "react"

const SnakeIndex = ({ gameData, updateGameData }) => {
    const toggleBoxMode = () => {
        updateGameData({
            ...gameData,
            boxMode: !gameData.boxMode,
        })
    }

    const setGameSpeed = (speed) => {
        updateGameData({
            ...gameData,
            speed: speed,
        })
    }

    useEffect(() => {
        updateGameData({
            ...gameData,
            boxMode: true,
            speed: 60,
        })
    },[]);
    
    return (
        <div className='game__menu'>
            <div className='game__article'><h1>Snake Game</h1></div>
            <h2 onClick={() => {
                updateGameData(
                    {
                        ...gameData,
                        isPlaying: true,
                    }
                )
            }}>-Start-</h2>
            <div className='game__option'>
                <div className='game__option--select'>
                    <label className='container'>
                        <input onChange={() => { toggleBoxMode() }} type='radio' name='Game Mode' defaultChecked />
                        <span>Box Mode</span>
                    </label>
                    <label className='container'>
                        <input onChange={() => { toggleBoxMode() }} type='radio' name='Game Mode' />
                        <span >Free Mode</span>
                    </label>
                </div>
                <div className='game__option--select'>
                    <label className='container'>
                        <input onChange={() => { setGameSpeed(70) }} type='radio' name='Game Speed' />
                        <span>Easy</span>
                    </label>
                    <label className='container'>
                        <input onChange={() => { setGameSpeed(60) }} type='radio' name='Game Speed' defaultChecked />
                        <span>Normal</span>
                    </label>
                    <label className='container'>
                        <input onChange={() => { setGameSpeed(40) }} type='radio' name='Game Speed' />
                        <span>Hard</span>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default SnakeIndex;