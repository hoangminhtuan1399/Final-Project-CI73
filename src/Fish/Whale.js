const Whale = ({ INITIAL_X, INITIAL_Y }) => {
    const createWhale = () => {
        const result = [];

        //row y-14
        result.push(...[[INITIAL_X + 28, INITIAL_Y - 14, "darkblue"], [INITIAL_X + 38, INITIAL_Y - 14, "darkblue"]]);

        //row y-12
        for (let col = INITIAL_X + 28; col <= INITIAL_X + 38; col += 2) {
            if (col === INITIAL_X + 32 || col === INITIAL_X + 34) continue;
            result.push([col, INITIAL_Y - 12, "darkblue"]);
        }

        //row y-10
        for (let col = INITIAL_X + 28; col <= INITIAL_X + 38; col += 2) {
            result.push([col, INITIAL_Y - 10, "darkblue"]);
        }

        //row y-8
        result.push(...[[INITIAL_X + 32, INITIAL_Y - 8, "darkblue"], [INITIAL_X + 34, INITIAL_Y - 8, "darkblue"]]);

        //row y-6
        result.push(...[[INITIAL_X + 32, INITIAL_Y - 6, "darkblue"], [INITIAL_X + 34, INITIAL_Y - 6, "darkblue"]]);

        //row y-4
        for (let col = INITIAL_X + 4; col <= INITIAL_X + 34; col += 2) {
            if (col >= INITIAL_X + 20 && col <= INITIAL_X + 30) continue;
            result.push([col, INITIAL_Y - 4, "darkblue"]);
        }

        //row y-2
        for (let col = INITIAL_X + 2; col <= INITIAL_X + 34; col += 2) {
            if (col >= INITIAL_X + 22 && col <= INITIAL_X + 28) continue;
            result.push([col, INITIAL_Y - 2, "darkblue"]);
        }

        //row y
        for (let col = INITIAL_X; col <= INITIAL_X + 32; col += 2) {
            if (col === INITIAL_X + 24 || col === INITIAL_X + 26) continue;
            result.push([col, INITIAL_Y, "darkblue"]);
        }

        //row y+2
        for (let col = INITIAL_X; col <= INITIAL_X + 32; col += 2) {
            result.push([col, INITIAL_Y + 2, "darkblue"]);
        }

        //row y+4
        for (let col = INITIAL_X; col <= INITIAL_X + 30; col += 2) {
            result.push([col, INITIAL_Y + 4, "darkblue"]);
        }

        //row y+6
        for (let col = INITIAL_X; col <= INITIAL_X + 28; col += 2) {
            if (col === INITIAL_X + 6) { result.push([col, INITIAL_Y + 6, "black"]); continue; };
            result.push([col, INITIAL_Y + 6, "darkblue"]);
        }

        //row y+8
        for (let col = INITIAL_X; col <= INITIAL_X + 28; col += 2) {
            result.push([col, INITIAL_Y + 8, "darkblue"]);
        }

        //row y+10
        for (let col = INITIAL_X; col <= INITIAL_X + 26; col += 2) {
            result.push([col, INITIAL_Y + 10, "darkblue"]);
        }

        //row y+12
        for (let col = INITIAL_X + 4; col <= INITIAL_X + 24; col += 2) {
            result.push([col, INITIAL_Y + 12, "darkblue"]);
        }

        return [result, 40];
    }

    return createWhale();
}

export default Whale;