// import MapStructure from "./MapStructure";
// import goToTargetIconSVG from "../icons/marker_active.svg";
// const img = new Image();
// img.src = goToTargetIconSVG;
// class GoToTargetMapStructure extends MapStructure {
//     constructor(x0, y0) {
//         super(x0, y0);
//     }
//     draw(ctxWrapper, transformationMatrixToScreenSpace, scaleFactor) {
//         const ctx = ctxWrapper.getContext();
//         const p0 = new DOMPoint(this.x0, this.y0).matrixTransform(transformationMatrixToScreenSpace);
//         const scaledSize = {
//             width: Math.max(img.width / (7 / scaleFactor), img.width),
//             height: Math.max(img.height / (7 / scaleFactor), img.height)
//         };
//         ctx.drawImage(img, p0.x - scaledSize.width / 2, p0.y - scaledSize.height, scaledSize.width, scaledSize.height);
//     }
//     getType() {
//         return GoToTargetMapStructure.TYPE;
//     }
// }
// GoToTargetMapStructure.TYPE = "GoToTargetMapStructure";
// export default GoToTargetMapStructure;




// TEST TO DRAW ONLY A SMALL POINT ISNTEAD OF THE TARGET SVG
import MapStructure from "./MapStructure";

class GoToTargetMapStructure extends MapStructure {
    constructor(x0, y0) {
        super(x0, y0);
    }

    draw(ctxWrapper, transformationMatrixToScreenSpace, scaleFactor) {
        const ctx = ctxWrapper.getContext();
        const p0 = new DOMPoint(this.x0, this.y0).matrixTransform(transformationMatrixToScreenSpace);

        // Define the radius of the circle. Adjust as needed.
        const radius = 5; // Size of the circle radius

        ctx.beginPath();
        ctx.arc(p0.x, p0.y, radius, 0, 2 * Math.PI); // Draws a circle
        ctx.fillStyle = 'red'; // Change the fill color as needed
        ctx.fill();
        ctx.strokeStyle = 'black'; // Change the stroke color as needed
        ctx.stroke();
    }

    getType() {
        return GoToTargetMapStructure.TYPE;
    }
}

GoToTargetMapStructure.TYPE = "GoToTargetMapStructure";
export default GoToTargetMapStructure;
