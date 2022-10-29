import React from "react";
import { makeStyles } from "@mui/styles";
import { styled } from '@mui/material/styles';
import Button from "@mui/material/Button";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    "&:hover": {
      backgroundColor: "green",
    },
  },
}));

export const UploadImagesButton = () => {
  const classes = useStyles();

  return (
    <label htmlFor="icon-button-file">
      <Button
        variant="outlined"
        size="large"
        className={classes.root}
        startIcon={<CloudUploadIcon fontSize="large" />}
      >
        Upload Images
      </Button>
    </label>
  );
};
