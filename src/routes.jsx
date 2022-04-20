import { CenteredTextComponent } from "./pages/components/CenteredTextComponent"
import { BaseForHomePage } from "./pages/homePage/BaseForHomePage"

export const RoutesForApp = [
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
