import { Gesture } from "./Gesture";
import { PanStartTouchHandlerEvent } from "../events/PanStartTouchHandlerEvent";
import { PanMoveTouchHandlerEvent } from "../events/PanMoveTouchHandlerEvent";
import { PanEndTouchHandlerEvent } from "../events/PanEndTouchHandlerEvent";
export class OngoingPanGesture extends Gesture {
    constructor(event) {
        super();
        this.initialEvent = event;
        this.lastEvent = event;
        this.pointerId = event.pointerId;
        this.initialPosition = {
            x: event.x,
            y: event.y
        };
        this.lastPosition = {
            x: event.x,
            y: event.y
        };
    }
    handleStartEvent(rawEvt, evts) {
        return new PanStartTouchHandlerEvent(this.initialPosition.x, this.initialPosition.y);
    }
    handleOngoingEvent(rawEvt, evts) {
        const event = evts[0];
        this.lastEvent = event;
        this.lastPosition.x = event.x;
        this.lastPosition.y = event.y;
        return new PanMoveTouchHandlerEvent(this.initialPosition.x, this.initialPosition.y, this.lastPosition.x, this.lastPosition.y);
    }
    handleEndEvent(rawEvt, evts) {
        const event = evts[0];
        if (event.pointerId === this.pointerId) {
            this.lastPosition.x = event.x;
            this.lastPosition.y = event.y;
            return new PanEndTouchHandlerEvent(this.initialPosition.x, this.initialPosition.y, this.lastPosition.x, this.lastPosition.y);
        }
    }
    getInitialEvent() {
        return this.initialEvent;
    }
    getLastEvent() {
        return this.lastEvent;
    }
}
