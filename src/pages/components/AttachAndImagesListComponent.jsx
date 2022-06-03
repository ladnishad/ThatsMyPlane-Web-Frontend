import React, { useState, useEffect } from 'react';
import Grid from "@mui/material/Grid";

import { AttachImagesButton } from "./AttachImagesButtonComponent"
import { UploadImagesButton } from "./UploadImagesButtonComponent"
import { ImagesListComponent } from "./ImagesListComponent"

export const AttachAndImagesListComponent = () => {
  const [selectedImages, setSelectedImages] = useState([])

  return (
    <Grid container spacing={2} xs={12}>
      <Grid item xs={12} container spacing={1}>
        <Grid item xs sx={{ height: 60 }}>
          <AttachImagesButton selectedImages={selectedImages} setSelectedImages={setSelectedImages} />
        </Grid>
        <Grid item xs sx={{ height: 60 }}>
          <UploadImagesButton />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <ImagesListComponent selectedImages={selectedImages} />
      </Grid>
    </Grid>
  )
}
