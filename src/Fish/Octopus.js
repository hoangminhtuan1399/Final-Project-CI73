const Octopus = ({ INITIAL_X, INITIAL_Y }) => {
    const createOctopus = () => {
        const result = [];

        //row y-12
        for (let col = INITIAL_X + 2; col <= INITIAL_X + 12; col += 2) {
            result.push([col, INITIAL_Y - 12, "#fe5e76"]);
        }

        //row y-10
        for (let col = INITIAL_X; col <= INITIAL_X + 14; col += 2) {
            result.push([col, INITIAL_Y - 10, "#fe5e76"]);
        }

        //row y-8
        for (let col = INITIAL_X; col <= INITIAL_X + 14; col += 2) {
            if (col === INITIAL_X || col === INITIAL_X + 6 || col === INITIAL_X + 8 || col === INITIAL_X + 14) result.push([col, INITIAL_Y - 8, "#fe5e76"]);
            if (col === INITIAL_X + 2 || col === INITIAL_X + 4 || col === INITIAL_X + 10 || col === INITIAL_X + 12) result.push([col, INITIAL_Y - 8, "white"]);
        }

        //row y-6
        for (let col = INITIAL_X; col <= INITIAL_X + 14; col += 2) {
            if (col === INITIAL_X || col === INITIAL_X + 6 || col === INITIAL_X + 8 || col === INITIAL_X + 14) result.push([col, INITIAL_Y - 6, "#fe5e76"]);
            if (col === INITIAL_X + 2 || col === INITIAL_X + 12) result.push([col, INITIAL_Y - 6, "white"]);
            if (col === INITIAL_X + 4 || col === INITIAL_X + 10) result.push([col, INITIAL_Y - 6, "black"]);
        }

        //row y-4
        for (let col = INITIAL_X; col <= INITIAL_X + 14; col += 2) {
            if (col === INITIAL_X || col === INITIAL_X + 6 || col === INITIAL_X + 8 || col === INITIAL_X + 14) result.push([col, INITIAL_Y - 4, "#fe5e76"]);
            if (col === INITIAL_X + 2 || col === INITIAL_X + 12) result.push([col, INITIAL_Y - 4, "white"]);
            if (col === INITIAL_X + 4 || col === INITIAL_X + 10) result.push([col, INITIAL_Y - 4, "black"]);
        }

        //row y-2
        for (let col = INITIAL_X - 2; col <= INITIAL_X + 16; col += 2) {
            result.push([col, INITIAL_Y - 2, "#fe5e76"]);
        }

        //row y
        for (let col = INITIAL_X; col <= INITIAL_X + 14; col += 2) {
            result.push([col, INITIAL_Y, "#fe5e76"]);
        }

        //row y+2
        for (let col = INITIAL_X; col <= INITIAL_X + 14; col += 2) {
            if (col === INITIAL_X || col === INITIAL_X + 2 || col === INITIAL_X + 6 || col === INITIAL_X + 12 || col === INITIAL_X + 14) result.push([col, INITIAL_Y + 2, "#fe5e76"]);
        }

        //row y+4 
        for (let col = INITIAL_X + 2; col <= INITIAL_X + 14; col += 2) {
            if (col === INITIAL_X + 2 || col === INITIAL_X + 6 || col === INITIAL_X + 8 || col === INITIAL_X + 14) result.push([col, INITIAL_Y + 4, "#fe5e76"]);
        }

        //row y+6 
        for (let col = INITIAL_X; col <= INITIAL_X + 14; col += 2) {
            if (col === INITIAL_X || col === INITIAL_X + 2 || col === INITIAL_X + 8 || col === INITIAL_X + 12 || col === INITIAL_X + 14) result.push([col, INITIAL_Y + 6, "#fe5e76"]);
        }

        //row y+8
        for (let col = INITIAL_X; col <= INITIAL_X + 14; col += 2) {
            if (col === INITIAL_X || col === INITIAL_X + 6 || col === INITIAL_X + 12 || col === INITIAL_X + 8) result.push([col, INITIAL_Y + 8, "#fe5e76"]);
        }

        //row y+10
        for (let col = INITIAL_X; col <= INITIAL_X + 14; col += 2) {
            if (col === INITIAL_X + 2 || col === INITIAL_X + 6 || col === INITIAL_X + 14) result.push([col, INITIAL_Y + 10, "#fe5e76"]);
        }

        return [result, 20];
    }
    return createOctopus();
}

export default Octopus;