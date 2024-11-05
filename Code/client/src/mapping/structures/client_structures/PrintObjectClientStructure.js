import ClientStructure from "./ClientStructure";
import testPrintIconSVG from "../icons/printicon-1.svg";
import { calculateBoxAroundPoint, isInsideBox } from "../../utils/helpers";


const img = new Image();
img.src = testPrintIconSVG;
const buttonHitboxPadding = 30.5;

class PrintObjectClientStructure extends ClientStructure {
    constructor(x0, y0, printAngle, printScale) {
        super(x0, y0);
        this.printAngle = printAngle;
        this.active = false;
        this.printScale = printScale;
    }

  
    draw(ctxWrapper, transformationMatrixToScreenSpace, scaleFactor, pixelSize) {
        const ctx = ctxWrapper.getContext();
        const p0 = new DOMPoint(this.x0, this.y0).matrixTransform(transformationMatrixToScreenSpace);

        const squareSize = 30 * this.printScale; // Adjust size based on printScale
        const crossSize = 10 * this.printScale; // Adjust size based on printScale

        ctxWrapper.save();

        // Rotate the canvas
        ctx.translate(p0.x, p0.y);
        ctx.rotate(this.printAngle * Math.PI / 180);

        // Draw semi-transparent bounding box
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)"; // Semi-transparent black
        ctx.fillRect(-squareSize / 2, -squareSize / 2, squareSize, squareSize);

        // Draw square outline
        ctx.strokeStyle = this.active ? "#00FF00" : "#000"; // Green if active, else black
        ctx.beginPath();
        ctx.rect(-squareSize / 2, -squareSize / 2, squareSize, squareSize);
        ctx.stroke();

        // Draw cross
        ctx.beginPath();
        ctx.moveTo(-crossSize / 2, 0);
        ctx.lineTo(crossSize / 2, 0);
        ctx.moveTo(0, -crossSize / 2);
        ctx.lineTo(0, crossSize / 2);
        ctx.stroke();

        ctxWrapper.restore();
    }


    tap(tappedPoint, transformationMatrixToScreenSpace) {
        const p0 = new DOMPoint(this.x0, this.y0).matrixTransform(transformationMatrixToScreenSpace);
        const iconHitbox = calculateBoxAroundPoint({ x: p0.x, y: p0.y }, buttonHitboxPadding);
        // if (this.active && isInsideBox(tappedPoint, deleteButtonHitbox)) {
        //     return {
        //         deleteMe: true,
        //         stopPropagation: true
        //     };
        // }
        // else
         if (isInsideBox(tappedPoint, iconHitbox)) {
            this.active = true;
            return {
                stopPropagation: true,
                requestDraw: true

            };
        }
        // else if (this.active) {
        //     this.active = false;
        //     return {
        //         stopPropagation: false,
        //         requestDraw: true
        //     };
        // }
        else {
            return {
                stopPropagation: false
            };
        }
    }


    translate(startCoordinates, lastCoordinates, currentCoordinates, transformationMatrixToScreenSpace, pixelSize) {
        const p0 = new DOMPoint(this.x0, this.y0).matrixTransform(transformationMatrixToScreenSpace);
        // const p1 = new DOMPoint(this.x1, this.y1).matrixTransform(transformationMatrixToScreenSpace);
        const iconHitbox = calculateBoxAroundPoint(p0, buttonHitboxPadding);
        // if (!this.isResizing && isInsideBox(lastCoordinates, resizeButtonHitbox)) {
        //     this.isResizing = true;
        // }
        const { dx, dy, currentInMapSpace } = ClientStructure.calculateTranslateDelta(lastCoordinates, currentCoordinates, transformationMatrixToScreenSpace);
        // if (this.isResizing) {
        //     if (currentInMapSpace.x > this.x0 + pixelSize && this.x1 + dx > this.x0 + pixelSize) {
        //         this.x1 += dx;
        //     }
        //     if (currentInMapSpace.y > this.y0 + pixelSize && this.y1 + dy > this.y0 + pixelSize) {
        //         this.y1 += dy;
        //     }
        //     return {
        //         stopPropagation: true
        //     };
        // }
        // else if (isInsideBox(lastCoordinates, { topLeftBound: p0, bottomRightBound: p1 })) {
        if (isInsideBox(lastCoordinates, iconHitbox)) {
            this.x0 += dx;
            this.y0 += dy;
            // this.x1 += dx;
            // this.y1 += dy;
            return {
                stopPropagation: true
            };
        }
        else {
            return {
                stopPropagation: false
            }
            // this.active = false;
        }
    }

    getType() {
        return PrintObjectClientStructure.TYPE;
    }
}
PrintObjectClientStructure.TYPE = "PrintObjectClientStructure";
export default PrintObjectClientStructure;
