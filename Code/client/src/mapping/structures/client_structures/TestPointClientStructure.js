import ClientStructure from "./ClientStructure";
import testPintIconSVG from "../icons/testingPointMarker.svg";
const img = new Image();
img.src = testPintIconSVG;
class TestPointClientStructure extends ClientStructure {
    constructor(x0, y0) {
        super(x0, y0);
    }
    draw(ctxWrapper, transformationMatrixToScreenSpace, scaleFactor, pixelSize) {
        const ctx = ctxWrapper.getContext();
        const p0 = new DOMPoint(this.x0, this.y0).matrixTransform(transformationMatrixToScreenSpace);

        const outerRadius = 20; // Adjust as needed
        const innerRadius = 10; // Adjust as needed
        const pointSize = 2; // Adjust as needed

        // ////DRAWING CODE

        
        // ctxWrapper.save();

        // // Translate to the center of the canvas
        // ctx.translate(p0.x, p0.y);

        // // Draw outer circle outline
        ctx.strokeStyle = "rgba(0, 0, 0, 1)"; // Black outline
        ctx.beginPath();
        ctx.arc(p0.x, p0.y, outerRadius, 0, 2 * Math.PI);
        ctx.stroke();

        // Draw inner circle outline
        ctx.beginPath();
        ctx.arc(p0.x, p0.y, innerRadius, 0, 2 * Math.PI);
        ctx.stroke();

        // Draw point in the center
        ctx.fillStyle = "rgba(0, 0, 0, 1)"; // Black color
        ctx.fillRect(-pointSize / 2, -pointSize / 2, pointSize, pointSize);

        // ctxWrapper.restore();

        // Define the radius of the circle. Adjust as needed.
        const radius = 2; // Size of the circle radius

        ctx.beginPath();
        ctx.arc(p0.x, p0.y, radius, 0, 2 * Math.PI); // Draws a circle
        ctx.fillStyle = 'cyan'; // Change the fill color as needed
        ctx.fill();
        ctx.strokeStyle = 'white'; // Change the stroke color as needed
        ctx.stroke();


       /*
        ////COMMENTED OUT FOR NOW To try transparent circles

        ctxWrapper.save();

        // Draw outer circle
        ctx.beginPath();
        ctx.arc(p0.x, p0.y, outerRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Draw inner circle
        ctx.beginPath();
        ctx.arc(p0.x, p0.y, innerRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Draw center point
        ctx.fillStyle = "#000"; // Black color for point
        ctx.beginPath();
        ctx.arc(p0.x, p0.y, pointSize / 2, 0, Math.PI * 2);
        ctx.fill();

        ctxWrapper.restore();
        */
    }
    getType() {
        return TestPointClientStructure.TYPE;
    }
}
TestPointClientStructure.TYPE = "TestPointClientStructure";
export default TestPointClientStructure;
