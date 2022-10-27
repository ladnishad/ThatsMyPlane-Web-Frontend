import React, { forwardRef } from "react";
import { startCase } from "lodash";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SlideTransition = (props) => <Slide {...props} direction="up" />

export const AlertFeedbackComponent = ({ alert, setAlert }) => {
  console.log(alert);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({
      message: "",
      type: "",
      open: false,
    });
  };

  return (
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={alert.open}
        autoHideDuration={5500}
        sx={{ marginBottom: "80px"}}
        TransitionComponent={SlideTransition}
        onClose={handleClose}
      >
        <Alert
          variant="filled"
          onClose={handleClose}
          severity={alert.type.toLowerCase()}
        >
          {alert.message}
        </Alert>
      </Snackbar>
  );
};
