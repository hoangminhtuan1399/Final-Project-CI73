const Fish = ({ FISH_DOT }) => {
    return (
        FISH_DOT.map((item, i) => {
            return (
                <div key={i} className="dot"
                    style={{ left: `${item[0]}vh`, top: `${item[1]}vh`, backgroundColor: `${item[2]}`}}>
                </div>
            )
        })
    )
}

export default Fish;