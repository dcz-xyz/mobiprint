import { Gesture } from "./Gesture";
export class NoGesture extends Gesture {
    handleOngoingEvent(rawEvt, evts) {
        /* intentional */
    }
}
