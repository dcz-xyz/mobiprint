import { ActionButton } from "../../Styled";
import { useGoToMutation, useRobotStatusQuery } from "../../api";
import React from "react";
import { CircularProgress, Grid, Typography } from "@mui/material";
// import { IntegrationHelpDialog } from "../../components/IntegrationHelpDialog";
import { useLongPress } from "use-long-press";
import { floorObject } from "../../api/utils";

//Actions for Testing mode

const TestingActions = (props) => {
    const {testingGrids, testPoint, convertPixelCoordinatesToCMSpace, onClear, onMakeGrid, generateTestPoint, onReachedLocation, onRunTestSequence} = props;
    // const [integrationHelpDialogOpen, setIntegrationHelpDialogOpen] = React.useState(false);
    // const [integrationHelpDialogPayload, setIntegrationHelpDialogPayload] = React.useState("");
    const [statusChanges, setStatusChanges] = React.useState(0);
    const [previousStatus, setPreviousStatus] = React.useState("");
    
    const { data: status } = useRobotStatusQuery((state) => {
        if (previousStatus !== state.value) {
            setPreviousStatus(state.value);
            setStatusChanges(statusChanges + 1);
        } 
        if ( previousStatus !== state.value && statusChanges > 1 && state.value === "idle") {
            console.log("Destination Reached");
            onReachedLocation();
        }
        return state.value;
    });

    const { mutate: goTo, isLoading: goToIsExecuting } = useGoToMutation({
        // onSuccess: onClear,
    });
    const canGo = status === "idle" || status === "docked" || status === "paused" || status === "returning" || status === "error";

    const handleClick = React.useCallback(() => {
        if (!canGo || !testPoint) {
            // "Cannot go to point while the robot is busy or no test point is generated"
            return;
        }
        goTo(convertPixelCoordinatesToCMSpace({ x: testPoint.x0, y: testPoint.y0 }));
    }, [canGo, testPoint, goTo, convertPixelCoordinatesToCMSpace]);
    const handleLongClick = React.useCallback(() => {
        if (!testPoint) {
            return;
        }
        // setIntegrationHelpDialogPayload(JSON.stringify({
        //     action: "goto",
        //     coordinates: floorObject(convertPixelCoordinatesToCMSpace({ x: testPoint.x0, y: testPoint.y0 })),
        // }, null, 2));
        // setIntegrationHelpDialogOpen(true);
    }, [testPoint, convertPixelCoordinatesToCMSpace]);
    const setupClickHandlers = useLongPress(handleLongClick, {
        onCancel: (event) => {
            handleClick();
        },
        threshold: 500,
        captureEvent: true,
        cancelOnMovement: true,
    });
   return (<>
            <Grid container spacing={1} direction="row-reverse" flexWrap="wrap-reverse">
                <Grid item>
                <ActionButton color="inherit" size="medium" variant="extended" onClick={onClear}>
                        Clear Grid
                    </ActionButton>
                </Grid>
                <Grid item>
                    <ActionButton color="inherit" size="medium" variant="extended" onClick={onMakeGrid}>
                        Make Grid
                    </ActionButton>
                </Grid>
                <Grid item>
                    <ActionButton disabled={testingGrids.length === 0} color="inherit" size="medium" variant="extended" onClick={generateTestPoint}>
                        Generate Test Point
                    </ActionButton>
                </Grid>
                <Grid item>
                    <ActionButton disabled={goToIsExecuting || !canGo || !testPoint} color="inherit" size="medium" variant="extended" {...setupClickHandlers()}>
                        Run Test Sequence
                        {goToIsExecuting && (<CircularProgress color="inherit" size={18} style={{ marginLeft: 10 }}/>)}
                    </ActionButton>
                </Grid>

            </Grid>
            </>
    );
};

export default TestingActions;