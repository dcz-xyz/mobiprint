export class Gesture {
    /*
     * Returns an event if the gesture is ongoing
     * May also return false if the gesture doesn't apply anymore
     * Also, may return void if the gesture still applies but there's no event yet
     */
    handleStartEvent(rawEvt, evts) {
        return;
    }
    /*
     * Returns an event if the gesture is done
     * May also return false if the gesture doesn't apply anymore
     * Also, may return void if the gesture still applies but there's no event just yet
     */
    handleEndEvent(rawEvt, evts) {
        return;
    }
}
