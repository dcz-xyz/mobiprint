import { Gesture } from "./Gesture";
import { TapTouchHandlerEvent } from "../events/TapTouchHandlerEvent";
import { distance2d } from "../TouchHandlingUtils";
export class PossibleTapGesture extends Gesture {
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
        //Ignore every mouse button that isn't just a regular click
        if (rawEvt instanceof MouseEvent && rawEvt.type === "mousedown" && rawEvt.button !== 0) {
            return false;
        }
    }
    handleOngoingEvent(rawEvt, evts) {
        const event = evts[0];
        this.lastEvent = event;
        this.lastPosition.x = event.x;
        this.lastPosition.y = event.y;
        const distance = distance2d(this.initialPosition.x, this.initialPosition.y, this.lastPosition.x, this.lastPosition.y);
        //If the pointer moved too much, it's not a tap anymore
        if (distance > 5) {
            return false;
        }
    }
    handleEndEvent(rawEvt, evts) {
        const event = evts[0];
        if (event.pointerId === this.pointerId) {
            return new TapTouchHandlerEvent(this.initialPosition.x, this.initialPosition.y, event.timestamp - this.initialEvent.timestamp);
        }
        else {
            return;
        }
    }
    getInitialEvent() {
        return this.initialEvent;
    }
    getLastEvent() {
        return this.lastEvent;
    }
}
