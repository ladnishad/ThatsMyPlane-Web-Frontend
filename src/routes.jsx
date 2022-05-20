import { SignIn } from "./pages/login/LoginComponent"
import { SignUp } from "./pages/login/SignUpComponent"
import { CenteredTextComponent } from "./pages/components/CenteredTextComponent"
import { BaseForHomePage } from "./pages/homePage/BaseForHomePage"

export const PublicRoutes = [
  {
    path: "/login",
    element: <SignIn /> ,
  },
  {
    path: "/signup",
    element: <SignUp /> ,
  },
]

export const PrivateRoutes = [
  {
    path: "/home",
    element: <BaseForHomePage /> ,
  },
  {
    path: "/discover",
    element: <CenteredTextComponent text="Discover" /> ,
  },
  {
    path: "/account",
    element: <CenteredTextComponent text="Account" /> ,
  },
]
