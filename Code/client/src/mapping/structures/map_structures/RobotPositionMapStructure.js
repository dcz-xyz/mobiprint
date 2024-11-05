import MapStructure from "./MapStructure";
import robot from "../icons/robot.svg";
const img = new Image();
img.src = robot;
class RobotPositionMapStructure extends MapStructure {
    constructor(x0, y0, angle) {
        super(x0, y0);
        this.angle = angle;
    }
    draw(ctxWrapper, transformationMatrixToScreenSpace, scaleFactor) {
        const ctx = ctxWrapper.getContext();
        const p0 = new DOMPoint(this.x0, this.y0).matrixTransform(transformationMatrixToScreenSpace);
        const rotateRobot = (img, scaledSize, angle) => {
            const canvasimg = document.createElement("canvas");
            canvasimg.width = scaledSize.width;
            canvasimg.height = scaledSize.height;
            const ctximg = canvasimg.getContext("2d");
            if (ctximg !== null) {
                ctximg.clearRect(0, 0, scaledSize.width, scaledSize.height);
                ctximg.translate(scaledSize.width / 2, scaledSize.width / 2);
                ctximg.rotate(angle * Math.PI / 180);
                ctximg.translate(-scaledSize.width / 2, -scaledSize.width / 2);
                ctximg.drawImage(img, 0, 0, scaledSize.width, scaledSize.height);
            }
            return canvasimg;
        };
        const scaledSize = {
            width: Math.max(img.width / (4.5 / scaleFactor), img.width),
            height: Math.max(img.height / (4.5 / scaleFactor), img.height)
        };
        ctx.drawImage(rotateRobot(img, scaledSize, this.angle), p0.x - scaledSize.width / 2, p0.y - scaledSize.height / 2, scaledSize.width, scaledSize.height);
    }
    getType() {
        return RobotPositionMapStructure.TYPE;
    }
}
RobotPositionMapStructure.TYPE = "RobotPositionMapStructure";
export default RobotPositionMapStructure;
