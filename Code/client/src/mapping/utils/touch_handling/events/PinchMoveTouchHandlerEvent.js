import { TouchHandlerEvent } from "./TouchHandlerEvent";
export class PinchMoveTouchHandlerEvent extends TouchHandlerEvent {
    constructor(x0, y0, distance, scale) {
        super(PinchMoveTouchHandlerEvent.TYPE);
        this.x0 = x0;
        this.y0 = y0;
        this.distance = distance;
        this.scale = scale;
    }
}
PinchMoveTouchHandlerEvent.TYPE = "pinch_move";
