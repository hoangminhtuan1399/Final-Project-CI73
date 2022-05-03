const Food = ({FOOD_DOT}) => {
    return (
        FOOD_DOT.map(item => <div key={1} className="food__dot" style={{left: `${item[0]}%`, top: `${item[1]}%`}}></div>)
    )
}

export default Food;