class Structure {
    constructor(x0, y0) {
        this.isResizing = false;
        this.x0 = x0;
        this.y0 = y0;
        this.type = this.getType();
    }
    /**
     * Handler for intercepting tap events on the canvas
     *
     * @param {PointCoordinates} tappedPoint - The tapped point in screen coordinates
     * @param {DOMMatrix} transformationMatrixToScreenSpace - The transformation for transforming map-space coordinates into screen-space.
     * This is the transform applied by the vacuum-map canvas.
     */
    tap(tappedPoint, transformationMatrixToScreenSpace) {
        return {
            stopPropagation: false
        };
    }
    /**
     * This is handler is called on each endTranslate.
     * It allows us to do post-processing such as snapping
     */
    //eslint-disable-next-line @typescript-eslint/no-empty-function
    postProcess() {
        //intentional
    }
}
Structure.TYPE = "Structure";
export default Structure;