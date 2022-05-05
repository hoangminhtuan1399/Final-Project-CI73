const Shark = ({ INITIAL_X, INITIAL_Y }) => {
    const createShark = () => {
        const result = [];

        //row y-8
        for (let col = INITIAL_X + 16; col <= INITIAL_X + 18; col += 2) {
            result.push([col, INITIAL_Y - 8, "black"]);
        };

        //row y-6
        result.push(...[[INITIAL_X + 14, INITIAL_Y - 6, "black"], [INITIAL_X + 16, INITIAL_Y - 6, "lightgray"], [INITIAL_X + 18, INITIAL_Y - 6, "black"]]);

        //row y-4
        for (let col = INITIAL_X + 6; col <= INITIAL_X + 24; col += 2) {
            if (col <= INITIAL_X + 12) result.push([col, INITIAL_Y - 4, "black"]);
            if (col > INITIAL_X + 12 && col <= INITIAL_X + 16) result.push([col, INITIAL_Y - 4, "lightgray"]);
            if (col > INITIAL_X + 16) result.push([col, INITIAL_Y - 4, "black"]);
        }
        result.push([INITIAL_X + 38, INITIAL_Y - 4, "black"]);

        //row y-2
        for (let col = INITIAL_X; col <= INITIAL_X + 38; col += 2) {
            if (col <= INITIAL_X + 4 || (col > INITIAL_X + 24 && col <= INITIAL_X + 32) || col === INITIAL_X + 36) result.push([col, INITIAL_Y - 2, "black"]);
            if (col > INITIAL_X + 4 && col <= INITIAL_X + 8) result.push([col, INITIAL_Y - 2, "white"]);
            if ((col > INITIAL_X + 8 && col <= INITIAL_X + 24) || col === INITIAL_X + 38) result.push([col, INITIAL_Y - 2, "lightgray"]);
            if (col === INITIAL_X + 34) continue;
        }

        //row y
        for (let col = INITIAL_X; col <= INITIAL_X + 36; col += 2) {
            if (col === INITIAL_X || col === INITIAL_X + 6 || col === INITIAL_X + 34) result.push([col, INITIAL_Y, "black"]);
            if (col === INITIAL_X + 2 || col === INITIAL_X + 4 || (col >= INITIAL_X + 10 && col <= INITIAL_X + 32) || col === INITIAL_X + 36) result.push([col, INITIAL_Y, "lightgray"]);
            if (col === INITIAL_X + 8) result.push([col, INITIAL_Y, "white"]);
        }

        //row y+2
        for (let col = INITIAL_X + 2; col <= INITIAL_X + 36; col += 2) {
            if (col === INITIAL_X + 2 || col === INITIAL_X + 34) result.push([col, INITIAL_Y + 2, "black"]);
            if ((col >= INITIAL_X + 4 && col <= INITIAL_X + 12) || (col >= INITIAL_X + 16 && col <= INITIAL_X + 30) || col === INITIAL_X + 36) result.push([col, INITIAL_Y + 2, "lightgray"]);
            if (col === INITIAL_X + 14 || col === INITIAL_X + 32) result.push([col, INITIAL_Y + 2, "white"]);
        }

        //row y+4
        for (let col = INITIAL_X + 4; col <= INITIAL_X + 38; col += 2) {
            if (col === INITIAL_X + 4 || col === INITIAL_X + 32 || col === INITIAL_X + 36) result.push([col, INITIAL_Y + 4, "black"]);
            if ((col >= INITIAL_X + 6 && col <= INITIAL_X + 12) || (col >= INITIAL_X + 20 && col <= INITIAL_X + 30)) result.push([col, INITIAL_Y + 4, "white"]);
            if ((col >= INITIAL_X + 14 && col <= INITIAL_X + 18) || col === INITIAL_X + 38) result.push([col, INITIAL_Y + 4, "lightgray"]);
        }

        //row y+6
        for (let col = INITIAL_X + 6; col <= INITIAL_X + 38; col += 2) {
            if (col === INITIAL_X + 6 || (col >= INITIAL_X + 22 && col <= INITIAL_X + 30) || col === INITIAL_X + 38) result.push([col, INITIAL_Y + 6, "black"]);
            if (col === INITIAL_X + 8 || col === INITIAL_X + 10) result.push([col, INITIAL_Y + 6, "white"]);
            if (col >= INITIAL_X + 12 && col <= INITIAL_X + 20) result.push([col, INITIAL_Y + 6, "lightgray"]);
        }

        //row y+8
        for (let col = INITIAL_X + 8; col <= INITIAL_X + 24; col += 2) {
            if ((col >= INITIAL_X + 8 && col <= INITIAL_X + 18) || col === INITIAL_X + 24) result.push([col, INITIAL_Y + 8, "black"]);
            if (col === INITIAL_X + 20 || col === INITIAL_X + 22) result.push([col, INITIAL_Y + 8, "lightgray"]);
        }

        //row y+10
        result.push(...[[INITIAL_X + 20, INITIAL_Y + 10, "black"], [INITIAL_X + 22, INITIAL_Y + 10, "black"]]);

        return [result, 40];
    }
    return createShark();
}

export default Shark;