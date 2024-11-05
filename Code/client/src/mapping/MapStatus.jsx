import React from "react";


import {
    Box,
    Button,
    CircularProgress,
    Grid,
    LinearProgress,
    linearProgressClasses,
    Paper,
    styled,
    Typography,
    Stack
} from "@mui/material";

import {
    useMapResetMutation,
    useRobotMapQuery,
    useStartMappingPassMutation,
} from "./api";

import {
    Save as PersistentMapControlIcon,
    Layers as MappingPassIcon,
    LayersClear as MapResetIcon,
    Dashboard as SegmentEditIcon,
    Dangerous as VirtualRestrictionsIcon,
    Crop as CleanupCoverageIcon,
    Download as ValetudoMapDownloadIcon,
} from "@mui/icons-material";


const  MapStatusContainer = styled(Box)(({ theme }) => {
    return {
        position: "absolute",
        // pointerEvents: "none",
        top: theme.spacing(2),
        left: theme.spacing(2),

        //add margin on the bottom
        // margin : theme.spacing(1),
        width: "300px",
        zIndex: 1,
    };
})
export const MappingPassButtonItem = () => {
    const {mutate: startMappingPass, isLoading: mappingPassStarting} = useStartMappingPassMutation();

    return (
        <Button
            variant="contained"
            aria-label="Start Mapping Pass"
            onClick={startMappingPass}
        > START MAPPING PASS
        </Button>
    );
};

export const ResetMapButtonItem = () => {
    const {mutate: resetMap, isLoading: mapResetting} = useMapResetMutation();

    return (
        <Button
            variant="contained"
            aria-label="Start Mapping Pass"
            onClick={resetMap}
        > Reset Map
        </Button>
    );
};

const MapStatus = () => {

    // list of possible print states
    const printStates = ["idle", "paused", "ready", "printing", "error"]
    const {mutate: startMappingPass, isLoading: mappingPassStarting} = useStartMappingPassMutation();
    const {mutate: resetMap, isLoading: mapResetting} = useMapResetMutation();


    
    return (
        <MapStatusContainer>
                <Stack spacing={2}>
                    <MappingPassButtonItem/>
                    <ResetMapButtonItem/>
                </Stack>
        </MapStatusContainer>
        ); 
}

export default MapStatus;