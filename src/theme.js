import { extendTheme } from "@mui/material/styles";

const theme = extendTheme({
    trello: {
        appBarHeight: '58px',
        boardBarHeight: '60px',
    },
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: '#1976d2',
                    light: '#42a5f5',
                    dark: '#1565c0'
                },
                secondary: {
                    main: '#9c27b0',
                    light: '#ba68c8',
                    dark: '#7b1fa2'
                },
                background: {
                    default: '#f5f5f5',
                    paper: '#ffffff'
                },
                text: {
                    primary: '#1a1a1a',
                    secondary: '#666666'
                }
            },
        },
        dark: {
            palette: {
                primary: {
                    main: '#90caf9',
                    light: '#e3f2fd',
                    dark: '#42a5f5'
                },
                secondary: {
                    main: '#ce93d8',
                    light: '#f3e5f5',
                    dark: '#ab47bc'
                },
                background: {
                    default: '#121212',
                    paper: '#1e1e1e'
                },
                text: {
                    primary: '#ffffff',
                    secondary: '#b0b0b0'
                }
            },
        }
    },
    components: {
        MuiCssBaseline : {
            styleOverrides: {
                body: {
                    '*::-webkit-scrollbar': {
                        width: '8px',
                        height: '8px',
                    },
                    '*::-webkit-scrollbar-thumb': {
                        backgroundColor: '#bdc3c7',
                        borderRadius: '8px'
                    },
                    '*::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: '#95a5a6',
                    }
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none'
                }
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: ({ theme }) => {
                    return {
                        color: theme.palette.primary.main,
                        fontSize: '0.875rem'
                    }
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: ({ theme }) => {
                    return {
                        color: theme.palette.primary.main,
                        fontSize: '0.875rem',
                        '.MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.primary.light
                        },
                        '&:hover': {
                            '.MuiOutlinedInput-notchedOutline': {
                                borderColor: theme.palette.primary.main
                            },
                        },
                        '& fieldset': {
                            borderWidth: '1px !important'
                        }
                    }
                }
            }
        }
    },
    colorSchemeSelector: 'class'
})

export default theme;