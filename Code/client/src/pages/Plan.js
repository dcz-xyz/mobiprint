import React from 'react'
import ValetudoMap from '../mapping/ValetudoMap'
import Box from '@mui/material/Box'
import RobotStatus from '../mapping/RobotStatus'
import { useLocation } from 'react-router-dom';


function Plan() {

  const location = useLocation();
  const { selectedFiles } = location.state || {};

  // console.log("Selected Files: ", selectedFiles);
  return (
    <>
      <ValetudoMap />
    </>
  )
}

export default Plan