import { Box, emphasize, Fab, styled } from "@mui/material";

//create new floating button to print item
export const PrintButton = styled(Fab)(({ theme }) => {
    return {
        position: "absolute",
        zIndex: 2,
        color: "green",
        padding: theme.spacing(1),
    };
});



