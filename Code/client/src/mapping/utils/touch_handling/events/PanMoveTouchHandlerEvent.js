import { TouchHandlerEvent } from "./TouchHandlerEvent";
export class PanMoveTouchHandlerEvent extends TouchHandlerEvent {
    constructor(x0, y0, x1, y1) {
        super(PanMoveTouchHandlerEvent.TYPE);
        this.x0 = x0;
        this.y0 = y0;
        this.x1 = x1;
        this.y1 = y1;
    }
}
PanMoveTouchHandlerEvent.TYPE = "pan_move";
