import MapStructure from "./MapStructure";
class VirtualWallMapStructure extends MapStructure {
    constructor(x0, y0, x1, y1) {
        super(x0, y0);
        this.x1 = x1;
        this.y1 = y1;
    }
    draw(ctxWrapper, transformationMatrixToScreenSpace, scaleFactor) {
        const ctx = ctxWrapper.getContext();
        const p0 = new DOMPoint(this.x0, this.y0).matrixTransform(transformationMatrixToScreenSpace);
        const p1 = new DOMPoint(this.x1, this.y1).matrixTransform(transformationMatrixToScreenSpace);
        ctxWrapper.save();
        ctx.strokeStyle = "rgb(255, 0, 0, 0.75)";
        ctx.lineWidth = 5;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.stroke();
        ctxWrapper.restore();
    }
    getType() {
        return VirtualWallMapStructure.TYPE;
    }
}
VirtualWallMapStructure.TYPE = "VirtualWallMapStructure";
export default VirtualWallMapStructure;
