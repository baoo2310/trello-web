import { cyan, deepOrange, orange, teal } from "@mui/material/colors";
import { extendTheme } from "@mui/material/styles";

const theme = extendTheme({
    trello: {
        appBarHeight: '58px',
        boardBarHeight: '60px',
    },
    colorSchemes: {
        light: {
            palette: {
                primary: teal,
                secondary: deepOrange,
            },
        },
        dark: {
            palette: {
                primary: cyan,
                secondary: orange
            },
        }
    },
    colorSchemeSelector: 'class'
})

export default theme;