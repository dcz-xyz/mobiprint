import { TouchHandlerEvent } from "./TouchHandlerEvent";
export class PanEndTouchHandlerEvent extends TouchHandlerEvent {
    constructor(x0, y0, x1, y1) {
        super(PanEndTouchHandlerEvent.TYPE);
        this.x0 = x0;
        this.y0 = y0;
        this.x1 = x1;
        this.y1 = y1;
    }
}
PanEndTouchHandlerEvent.TYPE = "pan_end";
