export function isInsideBox(point, box) {
    return (point.x >= box.topLeftBound.x &&
        point.x <= box.bottomRightBound.x &&
        point.y >= box.topLeftBound.y &&
        point.y <= box.bottomRightBound.y);
}
export function calculateBoxAroundPoint(point, boxPadding) {
    return {
        topLeftBound: {
            x: point.x - boxPadding,
            y: point.y - boxPadding
        },
        bottomRightBound: {
            x: point.x + boxPadding,
            y: point.y + boxPadding
        }
    };
}