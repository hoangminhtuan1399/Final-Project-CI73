const Sand = ({ SAND_DOT }) => {
    return (
        SAND_DOT.map((item, i) => {
            return (
                <div key={i}
                    className='sand__dot'
                    style={{ left: `${item[0]}vh`, top: `${item[1]}vh`, width: `${item[2]}vh`, height: `${item[3]}vh` }}
                ></div>
            )
        })
    )
}

export default Sand;