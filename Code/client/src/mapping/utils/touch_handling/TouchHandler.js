import { MapCanvasEvent } from "./MapCanvasEvent";
import { NoGesture } from "./gestures/NoGesture";
import { PossibleTapGesture } from "./gestures/PossibleTapGesture";
import { TouchHandlerEvent } from "./events/TouchHandlerEvent";
import { OngoingPanGesture } from "./gestures/OngoingPanGesture";
import { PinchEndTouchHandlerEvent } from "./events/PinchEndTouchHandlerEvent";
import { OngoingPinchGesture } from "./gestures/OngoingPinchGesture";
export class TouchHandler extends EventTarget {
    constructor(trackedElement) {
        super();
        this.currentGesture = new NoGesture();
        this.trackedElement = trackedElement;
        this.registerListeners();
    }
    registerListeners() {
        [
            "mousedown",
            "touchstart"
        ].forEach(evtType => {
            // @ts-ignore
            this.trackedElement.addEventListener(evtType, (evt) => {
                this.handleStartEvent(evt, MapCanvasEvent.CREATE_EVENTS(evt));
            });
        });
        [
            "mousemove",
            "touchmove"
        ].forEach(evtType => {
            // @ts-ignore
            this.trackedElement.addEventListener(evtType, (evt) => {
                this.handleOngoingEvent(evt, MapCanvasEvent.CREATE_EVENTS(evt));
            });
        });
        [
            "mouseup",
            "mouseleave",
            "mouseout",
            "touchcancel",
            "touchend"
        ].forEach(evtType => {
            // @ts-ignore
            this.trackedElement.addEventListener(evtType, (evt) => {
                this.handleEndEvent(evt, MapCanvasEvent.CREATE_EVENTS(evt));
            });
        });
    }
    handleStartEvent(rawEvt, mapCanvasEvents) {
        rawEvt.stopPropagation();
        rawEvt.preventDefault();
        if (this.currentGesture instanceof NoGesture) {
            this.currentGesture = new PossibleTapGesture(mapCanvasEvents[0]);
        }
        else if (this.currentGesture instanceof PossibleTapGesture || this.currentGesture instanceof OngoingPanGesture) { //upgrade to pinch
            this.currentGesture = new OngoingPinchGesture(this.currentGesture.getLastEvent(), mapCanvasEvents[0]);
        }
        const result = this.currentGesture.handleStartEvent(rawEvt, mapCanvasEvents);
        if (result === false) {
            this.currentGesture = new NoGesture();
        }
        else if (result instanceof TouchHandlerEvent) {
            this.dispatchEvent(result);
        }
    }
    handleOngoingEvent(rawEvt, mapCanvasEvents) {
        rawEvt.stopPropagation();
        rawEvt.preventDefault();
        const result = this.currentGesture.handleOngoingEvent(rawEvt, mapCanvasEvents);
        if (result === false) {
            if (this.currentGesture instanceof PossibleTapGesture) { //upgrade tap to pan
                this.currentGesture = new OngoingPanGesture(this.currentGesture.getLastEvent());
                const result2 = this.currentGesture.handleStartEvent(rawEvt, mapCanvasEvents);
                if (result2 instanceof TouchHandlerEvent) {
                    this.dispatchEvent(result2);
                }
            }
        }
        else if (result instanceof TouchHandlerEvent) {
            this.dispatchEvent(result);
        }
    }
    handleEndEvent(rawEvt, mapCanvasEvents) {
        rawEvt.stopPropagation();
        rawEvt.preventDefault();
        const result = this.currentGesture.handleEndEvent(rawEvt, mapCanvasEvents);
        if (result === false) {
            this.currentGesture = new NoGesture();
        }
        else if (result instanceof TouchHandlerEvent) {
            this.dispatchEvent(result);
            if (result instanceof PinchEndTouchHandlerEvent) {
                this.currentGesture = new OngoingPanGesture(new MapCanvasEvent(result.x0, result.y0, result.pointerId));
                const result2 = this.currentGesture.handleStartEvent(rawEvt, mapCanvasEvents);
                if (result2 instanceof TouchHandlerEvent) {
                    this.dispatchEvent(result2);
                }
            }
            else {
                this.currentGesture = new NoGesture();
            }
        }
    }
}
