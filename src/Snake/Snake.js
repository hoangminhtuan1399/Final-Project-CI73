const Snake = ({SNAKE_DOT}) => {
    return (
        SNAKE_DOT.map((item, i) => {
            return <div key={i} className="snake__dot" style={{ left: `${item[0]}%`, top: `${item[1]}%` }}></div>
        })
    )
}

export default Snake;