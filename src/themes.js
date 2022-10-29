import { deepmerge } from '@mui/utils';
import { experimental_extendTheme as extendMuiTheme } from '@mui/material/styles';
import { extendTheme as extendJoyTheme } from '@mui/joy/styles';
import { blue, grey } from "@mui/material/colors";

const muiTheme = extendMuiTheme();

const joyTheme = extendJoyTheme({
  // This is required to point to `var(--mui-*)` because we are using `CssVarsProvider` from Material UI.
  cssVarPrefix: 'mui',
  colorSchemes: {
    light: {
      palette: {
        primary: {
          ...blue,
          solidColor: 'var(--mui-palette-primary-contrastText)',
          solidBg: 'var(--mui-palette-primary-main)',
          solidHoverBg: 'var(--mui-palette-primary-dark)',
          plainColor: 'var(--mui-palette-primary-main)',
          plainHoverBg:
            'rgba(var(--mui-palette-primary-mainChannel) / var(--mui-palette-action-hoverOpacity))',
          plainActiveBg: 'rgba(var(--mui-palette-primary-mainChannel) / 0.3)',
          outlinedBorder: 'rgba(var(--mui-palette-primary-mainChannel) / 0.5)',
          outlinedColor: 'var(--mui-palette-primary-main)',
          outlinedHoverBg:
            'rgba(var(--mui-palette-primary-mainChannel) / var(--mui-palette-action-hoverOpacity))',
          outlinedHoverBorder: 'var(--mui-palette-primary-main)',
          outlinedActiveBg: 'rgba(var(--mui-palette-primary-mainChannel) / 0.3)',
        },
        neutral: {
          ...grey,
        },
        // Do the same for the `danger`, `info`, `success`, and `warning` palettes,
        divider: 'var(--mui-palette-divider)',
        text: {
          tertiary: 'rgba(0 0 0 / 0.56)',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          ...blue,
          solidColor: "var(--mui-palette-primary-contrastText)",
          solidBg: "var(--mui-palette-primary-main)",
          solidHoverBg: "var(--mui-palette-primary-dark)",
          plainColor: "var(--mui-palette-primary-main)",
          plainHoverBg:
            "rgba(var(--mui-palette-primary-mainChannel) / var(--mui-palette-action-hoverOpacity))",
          plainActiveBg: "rgba(var(--mui-palette-primary-mainChannel) / 0.3)",
          outlinedBorder: "rgba(var(--mui-palette-primary-mainChannel) / 0.5)",
          outlinedColor: "var(--mui-palette-primary-main)",
          outlinedHoverBg:
            "rgba(var(--mui-palette-primary-mainChannel) / var(--mui-palette-action-hoverOpacity))",
          outlinedHoverBorder: "var(--mui-palette-primary-main)",
          outlinedActiveBg: "rgba(var(--mui-palette-primary-mainChannel) / 0.3)"
        },
        neutral: {
          ...grey
        },
        divider: "var(--mui-palette-divider)",
        text: {
          tertiary: "rgba(255 255 255 / 0.5)"
        }
      }
    }
  },
  fontFamily: {
    body: '"Public Sans", var(--joy-fontFamily-fallback)',
    display: '"Public Sans", var(--joy-fontFamily-fallback)',
    code: 'Source Code Pro,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace',
    fallback:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
    xl2: '1.875rem',
    xl3: '2.25rem',
    xl4: '3rem',
    xl5: '3.75rem',
    xl6: '4.5rem',
  },
  fontWeight: {
    xs: 200,
    sm: 300,
    md: 500,
    lg: 700,
    xl: 800,
  },
  lineHeight: {
    sm: 1.25,
    md: 1.5,
    lg: 1.7,
  },
  letterSpacing: {
    sm: '-0.01em',
    md: '0.083em',
    lg: '0.125em',
  },
  radius: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
  },
  typography: {
    appname: {
      fontFamily: '"Pacifico", cursive',
      fontSize: 24
    }
  },
  shadow: {
    xs: `var(--mui-shadowRing), ${muiTheme.shadows[1]}`,
    sm: `var(--mui-shadowRing), ${muiTheme.shadows[2]}`,
    md: `var(--mui-shadowRing), ${muiTheme.shadows[4]}`,
    lg: `var(--mui-shadowRing), ${muiTheme.shadows[8]}`,
    xl: `var(--mui-shadowRing), ${muiTheme.shadows[12]}`,
  },
});

export const theme = deepmerge(joyTheme, muiTheme);
