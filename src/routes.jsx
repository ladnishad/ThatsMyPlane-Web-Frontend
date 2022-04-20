import { CenteredTextComponent } from "./pages/components/CenteredTextComponent"

export const RoutesForApp = [
  {
    path: "/home",
    element: <CenteredTextComponent text="Home" /> ,
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
