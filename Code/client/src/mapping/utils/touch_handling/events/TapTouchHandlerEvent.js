import { TouchHandlerEvent } from "./TouchHandlerEvent";
export class TapTouchHandlerEvent extends TouchHandlerEvent {
    constructor(x0, y0, duration) {
        super(TapTouchHandlerEvent.TYPE);
        this.x0 = x0;
        this.y0 = y0;
        this.duration = duration;
    }
}
TapTouchHandlerEvent.TYPE = "tap";
TapTouchHandlerEvent.LONG_PRESS_DURATION = 150;
