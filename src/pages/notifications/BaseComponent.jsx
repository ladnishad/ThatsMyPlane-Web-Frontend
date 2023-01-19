import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import { NotificationsList } from "./NotificationsListComponent";
import { CenteredTextComponent } from "../components/CenteredTextComponent";

export const BaseForNotificationsPage = () => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const [notificationsForUser, setNotificationsForUser] = useState({
    isLoading: true,
    data: [],
  });

  useEffect(() => {
    const getUserNotifications = async () => {
      setNotificationsForUser({
        isLoading: true,
        data: [],
      });

      try {
        const reqBody = {
          userId: auth?.userId,
        };

        const userNotifications = await axiosPrivate({
          url: "/notifications",
          method: "post",
          data: reqBody,
        });

        setNotificationsForUser({
          isLoading: false,
          data: userNotifications.data,
        });
      } catch (e) {
        console.log(e);
        setNotificationsForUser({
          isLoading: false,
          data: [],
        });
      }
    };

    getUserNotifications();
  }, [auth]);

  useEffect(() => {
    console.log(notificationsForUser.data);
  }, [notificationsForUser]);

  return (
    <Container maxWidth="lg">
      <NotificationsList
        userId={auth?.userId}
        notificationsForUser={notificationsForUser}
      />
    </Container>
  );
};
