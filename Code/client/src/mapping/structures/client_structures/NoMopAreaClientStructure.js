import RestrictedZoneClientStructure from "./RestrictedZoneClientStructure";
class NoMopAreaClientStructure extends RestrictedZoneClientStructure {
    constructor() {
        super(...arguments);
        this.activeStyle = {
            stroke: "rgb(200, 0, 255)",
            fill: "rgba(255, 0, 255, 0)"
        };
        this.style = {
            stroke: "rgb(200, 0, 255)",
            fill: "rgba(200, 0, 255, 0.4)"
        };
    }
    getType() {
        return NoMopAreaClientStructure.TYPE;
    }
}
NoMopAreaClientStructure.TYPE = "NoMopAreaClientStructure";
export default NoMopAreaClientStructure;
