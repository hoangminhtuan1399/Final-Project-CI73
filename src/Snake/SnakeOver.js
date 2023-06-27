const SnakeOver = ({ gameData, updateGameData }) => {
    return (
        <div className='game__over--screen'>
            <h1>Game Over</h1>
            <h2 onClick={() => {
                updateGameData({
                    ...gameData,
                    isPlaying: false,
                    isGameOver: false,
                })
            }}>-Play Again?-</h2>
        </div>
    )
}

export default SnakeOver;