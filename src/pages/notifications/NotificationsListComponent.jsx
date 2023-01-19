import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListDivider from "@mui/joy/ListDivider";
import ListItemContent from "@mui/joy/ListItemContent";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListItemButton from "@mui/joy/ListItemButton";
import Avatar from "@mui/joy/Avatar";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import Typography from "@mui/joy/Typography";

dayjs.extend(relativeTime);

export const NotificationsList = ({ userId, notifications }) => {
  return (
    <List>
      {notifications.map(({ actorUserId, action, entity, timestamp }) => {
        const notification = `${
          actorUserId === userId ? "You" : "Your friend"
        } ${action} a ${entity}`;
        const timeSinceNotification = dayjs(timestamp).fromNow();

        return (
          <>
            <ListItem variant="soft" color="primary">
              <ListItemDecorator
                sx={{ alignSelf: "flex-start", marginRight: "20px" }}
              >
                <Avatar />
              </ListItemDecorator>
              <ListItemContent>
                <Typography level="body1" align="left">
                  {notification}
                </Typography>
                <Typography level="body4" noWrap align="left">
                  {timeSinceNotification}
                </Typography>
              </ListItemContent>
            </ListItem>
            <ListDivider inset="gutter" />
          </>
        );
      })}
    </List>
  );
};
