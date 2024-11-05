import { TouchHandlerEvent } from "./TouchHandlerEvent";
export class PinchStartTouchHandlerEvent extends TouchHandlerEvent {
    constructor(x0, y0, distance, scale) {
        super(PinchStartTouchHandlerEvent.TYPE);
        this.x0 = x0;
        this.y0 = y0;
        this.distance = distance;
        this.scale = scale;
    }
}
PinchStartTouchHandlerEvent.TYPE = "pinch_start";
