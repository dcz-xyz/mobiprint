import { TouchHandlerEvent } from "./TouchHandlerEvent";
export class PinchEndTouchHandlerEvent extends TouchHandlerEvent {
    constructor(x0, y0, pointerId) {
        super(PinchEndTouchHandlerEvent.TYPE);
        this.x0 = x0;
        this.y0 = y0;
        this.pointerId = pointerId;
    }
}
PinchEndTouchHandlerEvent.TYPE = "pinch_end";
