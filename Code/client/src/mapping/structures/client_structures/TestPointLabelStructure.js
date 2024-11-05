import ClientStructure from "./ClientStructure";

class TestPointLabelClientStructure extends ClientStructure {
    constructor(x0, y0, gridX0, gridY0, gridX1, gridY1) {
        super(x0, y0);
        this.gridX0 = gridX0;
        this.gridY0 = gridY0;
        this.gridX1 = gridX1;
        this.gridY1 = gridY1;
    }

draw(ctxWrapper, transformationMatrixToScreenSpace, scaleFactor, pixelSize) {
    const ctx = ctxWrapper.getContext();
    const randomPoint = new DOMPoint(this.x0, this.y0).matrixTransform(transformationMatrixToScreenSpace);
    const randomPointDimensions = {
        x: ((Math.round(this.x0) - Math.round(this.gridX0)) * pixelSize) / 100,
        y: ((Math.round(this.y0) - Math.round(this.gridY0)) * pixelSize) / 100
    };

    const gridMaxXPoint = new DOMPoint(this.gridX1, this.gridY1).matrixTransform(transformationMatrixToScreenSpace);

    ctxWrapper.save();

    // Set text properties
    ctx.fillStyle = "#000"; // Black color for text
    ctx.font = Math.round(3 * scaleFactor).toString(10) + "px sans-serif";
    ctx.textAlign = "left"; // Align the text to the left

    // Draw x0 and y0 labels
    const xOffset = 10; // Adjust x offset as needed
    const yOffset = -100; // Adjust y offset as needed
    ctx.fillText(`X: ${randomPointDimensions.x.toFixed(2)}`, gridMaxXPoint.x + xOffset, gridMaxXPoint.y + yOffset);
    ctx.fillText(`Y: ${randomPointDimensions.y.toFixed(2)}`, gridMaxXPoint.x + xOffset, gridMaxXPoint.y + yOffset + 25); // Adjust vertical spacing if needed
       
    ctxWrapper.restore();
}

    getType() {
        return TestPointLabelClientStructure.TYPE;
    }
}

TestPointLabelClientStructure.TYPE = "TestPointLabelClientStructure";
export default TestPointLabelClientStructure;
