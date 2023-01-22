import { SignIn } from "./pages/login/LoginJoyUiComponent"
// import { SignIn } from "./pages/login/LoginComponent"
import { SignUp } from "./pages/login/SignUpJoyUiComponent"
// import { SignUp } from "./pages/login/SignUpComponent"
import { CenteredTextComponent } from "./pages/components/CenteredTextComponent"
import { BaseForHomePage } from "./pages/homePage/BaseForHomePage"
import { BaseForUserAircraftsComponent } from "./pages/userAircrafts/BaseForUserAircrafts"
import { BaseForPostPage } from "./pages/post/BaseForPostPage"

import { BaseForNotificationsPage } from "./pages/notifications/BaseComponent"
// import { BaseForAccountPage } from "./pages/account/BaseComponent"
import { BaseForAccountPage } from "./pages/account/BaseComponentNew"

export const PublicRoutes = [
  {
    path: "login",
    element: <SignIn /> ,
  },
  {
    path: "signup",
    element: <SignUp /> ,
  },
]

export const PrivateRoutes = [
  {
    path: "home",
    element: <BaseForHomePage /> ,
  },
  {
    path: "aircrafts",
    element: <BaseForUserAircraftsComponent /> ,
  },
  {
    path: "post",
    element: <BaseForPostPage /> ,
  },
  {
    path: "notifications",
    element: <BaseForNotificationsPage /> ,
  },
  {
    path: "account",
    element: <BaseForAccountPage /> ,
  },
]
