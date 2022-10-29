import React from "react";
import { makeStyles } from "@mui/styles";
import { styled } from '@mui/material/styles';
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    "&:hover": {
      backgroundColor: "green",
    },
  },
}));

export const AttachImagesButton = ({ selectedImages, setSelectedImages }) => {
  const classes = useStyles();

  return (
    <label htmlFor="select-image-button">
      <input accept="image/*" id="select-image-button" multiple type="file" style={{ display: 'none' }} onChange={e => {
        setSelectedImages([...selectedImages, ...Object.keys(e.target.files).map((key) => {
          const file = e.target.files[key]
          const { name, size, type } = file
          const fileUrl = URL.createObjectURL(file)

          return {
            fileName: name,
            fileSize: size,
            fileType: type,
            fileUrl
          }
        })])
      }} />
      <Button
        variant="outlined"
        size="large"
        className={classes.root}
        component="span"
        startIcon={<PhotoCameraIcon fontSize="large" />}
      >
        Choose Images
      </Button>
    </label>
  );
};
