import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import { setState } from 'react';
import { useOutletContext } from 'react-router-dom';

export default function Connect() {


    // const [printerStatus, setPrinterStatus] = React.useState('');
    // const [robotStatus, setRobotStatus] = React.useState('');

    const [printerIP, setPrinterIP] = useOutletContext();
    

    const handleSubmitPrinter = (event) => {
        event.preventDefault();
        // setPrinterIP(event.target.printerIP.value);
        const newPrinterIP = event.target.printerIP.value;
        console.log(printerIP);

        fetch(`${printerIP}/rr_status?type=8`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            console.log(response)
            if (response.status === 200) {
                //on success, set printerIP in App.js
                setPrinterIP(newPrinterIP);
                // setPrinterStatus(true);
                console.log("Printer Responded");
            } else {
                //handle load failure
                console.log("Printer Failed to Respond");
                // setPrinterStatus(false);
            }

        } 
      );
      };

    const handleSubmitRobot = (event) => {
        event.preventDefault();
        // setRobotIP(event.target.robotIP.value);
        const robotIP = event.target.robotIP.value;
        fetch(`${robotIP}/api/v2/robot/capabilities/SpeakerTestCapability`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                action: "play_test_sound"
            })
        }).then((response) => {
            if (response.status === 200) {
                console.log("Robot Responded");
                // setRobotStatus(true);
            } else {
                console.log("Robot Failed to Respond");
                // setRobotStatus(false);
            }
        }
        );

      };

    return (
        <Container component="main" maxWidth="lg" sx={{display: 'inline-flex'}}   >
            <Box
                sx={{
                margin: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <ViewInArIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                3D Printer IP Address
                </Typography>
                <Box component="form" onSubmit={handleSubmitPrinter} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="printerIP"
                    label="Enter Printer IP Address"
                    type='url'
                    name="printerIP"
                    autoComplete=""
                />
                
                {/* <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                /> */}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Connect
                </Button>
                {/* <Grid container>
                    <Grid item xs>
                    <Link href="#" variant="body2">
                        Forgot password?
                    </Link>
                    </Grid>
                    <Grid item>
                    <Link href="#" variant="body2">
                        {"Don't have an account? Sign Up"}
                    </Link>
                    </Grid>
                </Grid> */}
                </Box>
            </Box>
            <Box
                sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <DonutSmallIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Robot IP Address
                </Typography>
                <Box component="form" onSubmit={handleSubmitRobot} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="robotIP"
                    label="Enter Robot IP Address"
                    type='url'
                    name="robotIP"
                    autoComplete=""
                />
                
                {/* <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                /> */}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Connect
                </Button>
                {/* <Grid container>
                    <Grid item xs>
                    <Link href="#" variant="body2">
                        Forgot password?
                    </Link>
                    </Grid>
                    <Grid item>
                    <Link href="#" variant="body2">
                        {"Don't have an account? Sign Up"}
                    </Link>
                    </Grid>
                </Grid> */}
                </Box>
            </Box>
        </Container>

  )
}

// export default Connect


