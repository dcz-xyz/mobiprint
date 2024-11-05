import LineClientStructure from "./LineClientStructure";
class VirtualWallClientStructure extends LineClientStructure {
    constructor(x0, y0, x1, y1, active) {
        super(x0, y0, x1, y1, active ?? false);
    }
    setLineStyle(ctx) {
        ctx.shadowColor = "rgba(0,0,0, 1)";
        ctx.shadowBlur = 2;
        ctx.strokeStyle = "rgb(255, 0, 0)";
        ctx.lineWidth = 5;
        ctx.lineCap = "round";
        if (this.active) {
            ctx.setLineDash([15, 5]);
        }
    }
    getType() {
        return VirtualWallClientStructure.TYPE;
    }
}
VirtualWallClientStructure.TYPE = "VirtualWallClientStructure";
export default VirtualWallClientStructure;
