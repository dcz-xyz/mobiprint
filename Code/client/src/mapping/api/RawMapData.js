export var RawMapLayerType;
(function (RawMapLayerType) {
    RawMapLayerType["Floor"] = "floor";
    RawMapLayerType["Segment"] = "segment";
    RawMapLayerType["Wall"] = "wall";
})(RawMapLayerType || (RawMapLayerType = {}));
export var RawMapEntityType;
(function (RawMapEntityType) {
    RawMapEntityType["ChargerLocation"] = "charger_location";
    RawMapEntityType["RobotPosition"] = "robot_position";
    RawMapEntityType["GoToTarget"] = "go_to_target";
    RawMapEntityType["Path"] = "path";
    RawMapEntityType["PredictedPath"] = "predicted_path";
    RawMapEntityType["VirtualWall"] = "virtual_wall";
    RawMapEntityType["NoGoArea"] = "no_go_area";
    RawMapEntityType["NoMopArea"] = "no_mop_area";
    RawMapEntityType["ActiveZone"] = "active_zone";
})(RawMapEntityType || (RawMapEntityType = {}));