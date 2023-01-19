import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListDivider from "@mui/joy/ListDivider";
import ListItemContent from "@mui/joy/ListItemContent";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListItemButton from "@mui/joy/ListItemButton";
import Skeleton from "@mui/material/Skeleton";
import Avatar from "@mui/joy/Avatar";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import Typography from "@mui/joy/Typography";

dayjs.extend(relativeTime);

export const NotificationsList = ({ userId, notificationsForUser }) => {
  if (notificationsForUser?.isLoading) {
    return (
      <List>
        {[1, 2, 3, 4, 5].map((loadNotification) => (
          <>
            <ListItem>
              <ListItemDecorator
                sx={{ alignSelf: "flex-start", marginRight: "20px" }}
              >
                <Skeleton variant="circular" width={40} height={40} />
              </ListItemDecorator>
              <ListItemContent>
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              </ListItemContent>
            </ListItem>
            <ListDivider inset="gutter" />
          </>
        ))}
      </List>
    );
  }
  return (
    <List>
      {notificationsForUser.data.map(
        ({ actorUserId, action, entity, actor, timestamp }) => {
          const notification = `${
            actorUserId === userId
              ? "You"
              : `${actor?.firstName} ${actor?.lastName}`
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
        }
      )}
    </List>
  );
};
