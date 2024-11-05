import LineClientStructure from "./LineClientStructure";
class CuttingLineClientStructure extends LineClientStructure {
    constructor(x0, y0, x1, y1, active) {
        super(x0, y0, x1, y1, active ?? true);
    }
    setLineStyle(ctx) {
        ctx.strokeStyle = "rgb(255, 255, 255)";
        ctx.lineWidth = 5;
        ctx.lineCap = "round";
        if (this.active) {
            ctx.setLineDash([15, 5]);
        }
    }
    getType() {
        return CuttingLineClientStructure.TYPE;
    }
}
CuttingLineClientStructure.TYPE = "CuttingLineClientStructure";
export default CuttingLineClientStructure;
