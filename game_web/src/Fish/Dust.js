const Dust = ({ DUST_DOT }) => {
    return (
        DUST_DOT.map((item, i) => {
            return (
                <div key={i}
                    className='dust__dot'
                    style={{ left: `${item[0]}vh`, bottom: `${item[1]}vh`, width: `${item[2]}vh`, height: `${item[3]}vh` }}
                ></div>
            )
        })
    )
}

export default Dust;