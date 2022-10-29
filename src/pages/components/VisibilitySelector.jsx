import React, { useEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import PublicIcon from '@mui/icons-material/Public';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export const VisibilitySelectorComponent = ({ visibility, setVisibility }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="visibility-selector-button"
        aria-controls={open ? 'visibility-selector-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        startIcon={visibility === "Private" ? <PersonIcon /> : visibility === "Friends" ? <PeopleIcon /> : <PublicIcon />}
      >
        {visibility}
      </Button>
      <StyledMenu
        id="visibility-selector-menu"
        MenuListProps={{
          'aria-labelledby': 'visibility-selector-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={() => {
          setVisibility("Private")
          handleClose()
        }} disableRipple>
          <PersonIcon />
          Private
        </MenuItem>
        <MenuItem onClick={() => {
          setVisibility("Friends")
          handleClose()
        }} disableRipple>
          <PeopleIcon />
          Friends
        </MenuItem>
        <MenuItem onClick={() => {
          setVisibility("Public")
          handleClose()
        }} disableRipple>
          <PublicIcon />
          Public
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
