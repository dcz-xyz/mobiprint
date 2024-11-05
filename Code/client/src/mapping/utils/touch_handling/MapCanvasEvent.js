export class MapCanvasEvent {
    constructor(x, y, pointerId) {
        this.x = x;
        this.y = y;
        this.pointerId = pointerId;
        this.timestamp = Date.now();
    }
    static CREATE_EVENTS_FROM_MOUSE_EVENT(evt) {
        return [
            new MapCanvasEvent(evt.clientX, evt.clientY, 0)
        ];
    }
    static CREATE_EVENTS_FROM_TOUCH_EVENT(evt) {
        const events = [];
        for (const touch of evt.changedTouches) {
            events.push(new MapCanvasEvent(touch.clientX, touch.clientY, touch.identifier));
        }
        return events;
    }
    static CREATE_EVENTS(evt) {
        if (evt instanceof MouseEvent) {
            return MapCanvasEvent.CREATE_EVENTS_FROM_MOUSE_EVENT(evt);
        }
        else if (evt instanceof TouchEvent) {
            return MapCanvasEvent.CREATE_EVENTS_FROM_TOUCH_EVENT(evt);
        }
        else {
            throw new Error("Unknown event type");
        }
    }
}
