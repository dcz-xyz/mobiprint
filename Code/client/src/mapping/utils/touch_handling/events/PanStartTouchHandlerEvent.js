import { TouchHandlerEvent } from "./TouchHandlerEvent";
export class PanStartTouchHandlerEvent extends TouchHandlerEvent {
    constructor(x0, y0) {
        super(PanStartTouchHandlerEvent.TYPE);
        this.x0 = x0;
        this.y0 = y0;
    }
}
PanStartTouchHandlerEvent.TYPE = "pan_start";
