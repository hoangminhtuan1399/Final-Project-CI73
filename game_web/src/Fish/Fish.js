const Fish = ({ FISH_DOT }) => {
    return (
        FISH_DOT.map((item, i) => {
            return (
                <div key={i} className="fish__dot"
                    style={{ left: `${item[0]}vh`, bottom: `${item[1]}vh`, width: `${item[2]}vh`, height: `${item[3]}vh` }}>
                </div>
            )
        })
    )
}

export default Fish;