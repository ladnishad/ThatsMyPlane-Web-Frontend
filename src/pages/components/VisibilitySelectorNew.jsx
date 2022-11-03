import React, { useEffect, useState } from 'react';
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import PublicIcon from "@mui/icons-material/Public";
import GroupIcon from "@mui/icons-material/Group";
import LockIcon from "@mui/icons-material/Lock";

export const VisibilitySelectorComponent = ({ visibility, setVisibility }) => {
  return (
    <Select
      defaultValue="Friends"
      onChange={(e) => setVisibility(e.target.value)}
      componentsProps={{
        listbox: {
          sx: {
            "--List-decorator-size": "44px"
          }
        }
      }}
      sx={{
        "--List-decorator-size": "44px",
        minWidth: "30%"
      }}
    >
      <Option value="Friends">
        <ListItemDecorator>
          <GroupIcon size="sm" />
        </ListItemDecorator>
        Friends
      </Option>
      <Option value="Public">
        <ListItemDecorator>
          <PublicIcon size="sm" />
        </ListItemDecorator>
        Public
      </Option>
      <Option value="Private">
        <ListItemDecorator>
          <LockIcon size="sm" />
        </ListItemDecorator>
        Private
      </Option>
    </Select>
  );
}
