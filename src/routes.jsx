import { SignIn } from "./pages/login/LoginComponent"
import { SignUp } from "./pages/login/SignUpComponent"
import { CenteredTextComponent } from "./pages/components/CenteredTextComponent"
import { BaseForHomePage } from "./pages/homePage/BaseForHomePage"
import { BaseForAccountPage } from "./pages/account/BaseComponent"

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
    path: "discover",
    element: <CenteredTextComponent text="Discover" /> ,
  },
  {
    path: "post",
    element: <CenteredTextComponent text="Post" /> ,
  },
  {
    path: "notifications",
    element: <CenteredTextComponent text="Notifications" /> ,
  },
  {
    path: "account",
    element: <BaseForAccountPage /> ,
  },
]
