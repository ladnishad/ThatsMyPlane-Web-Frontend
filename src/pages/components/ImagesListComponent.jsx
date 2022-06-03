import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export const ImagesListComponent = ({ selectedImages }) => {
  return (
    <ImageList sx={{ width: 500, height: 300 }} cols={3} rowHeight={164}>
      {selectedImages.map((item) => (
        <ImageListItem key={item.fileUrl}>
          <img
            src={`${item.fileUrl}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${item.fileUrl}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={item.fileName}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
