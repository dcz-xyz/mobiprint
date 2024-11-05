import RestrictedZoneClientStructure from "./RestrictedZoneClientStructure";
class NoGoAreaClientStructure extends RestrictedZoneClientStructure {
    constructor() {
        super(...arguments);
        this.activeStyle = {
            stroke: "rgb(255, 0, 0)",
            fill: "rgba(255, 0, 0, 0)"
        };
        this.style = {
            stroke: "rgb(255, 0, 0)",
            fill: "rgba(255, 0, 0, 0.4)"
        };
    }
    getType() {
        return NoGoAreaClientStructure.TYPE;
    }
}
NoGoAreaClientStructure.TYPE = "NoGoAreaClientStructure";
export default NoGoAreaClientStructure;
