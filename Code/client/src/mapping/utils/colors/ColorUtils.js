
export function create2DArray(xLength, yLength) {
    return [...new Array(xLength)].map(elem => {
        return [...new Array(yLength)];
    });
}