import React, { useState, useEffect } from 'react';
import Grid from "@mui/material/Grid";

import { AttachImagesButton } from "./AttachImagesButtonComponent"
import { UploadImagesButton } from "./UploadImagesButtonComponent"
import { ImagesListComponent } from "./ImagesListComponent"

export const AttachAndImagesListComponent = () => {
  const [selectedImages, setSelectedImages] = useState([])

  return (
    <Grid container spacing={2} xs={12} direction="column">
      <Grid item xs={12} sx={{ width: "100%", height: 60 }}>
        <AttachImagesButton selectedImages={selectedImages} setSelectedImages={setSelectedImages} />
      </Grid>

      <Grid item xs={12} sx={{ width: "100%" }}>
        <ImagesListComponent selectedImages={selectedImages} />
      </Grid>

      {
        selectedImages.length > 0 && (
          <Grid item xs={12} sx={{ width: "100%", height: 60 }}>
            <UploadImagesButton />
          </Grid>
        )
      }

    </Grid>
  )
}
