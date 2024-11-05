import React from "react";
import { Route } from "react-router";
import { BrowserRouter as Router, Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import Button from '@mui/material/Button';

//NOT BEING USED NEED TO TROUBLESHOOT

export default function LinkRouter() {
  return (
    <Router>
      <div>
        <Link component={RouterLink} to="/">
          Link to Home
        </Link>
        <br />
        <Link component={RouterLink} to="/inner">
          Link to inner page
        </Link>
        <br />
        <Button
          variant="contained"
          color="primary"
          component={RouterLink}
          to="/inner"
        >
          Button to inner page
        </Button>
        <Route path="/" exact>
          <div>Here's Home</div>
        </Route>
        <Route path="/inner">
          <div>Here's the inner page</div>
        </Route>
      </div>
    </Router>
  );
}