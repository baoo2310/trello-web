import { extendTheme } from "@mui/material/styles";

const APP_BAR_HEIGHT = '58px';
const BOARD_BAR_HEIGHT = '60px';
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`;

const theme = extendTheme({
    trello: {
        appBarHeight: APP_BAR_HEIGHT,
        boardBarHeight: BOARD_BAR_HEIGHT,
        boardContentHeight: BOARD_CONTENT_HEIGHT
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
                    light: '#b3d9ff',
                    dark: '#5a9fd4'
                },
                secondary: {
                    main: '#ce93d8',
                    light: '#f3e5f5',
                    dark: '#ab47bc'
                },
                background: {
                    default: '#1a1d23',
                    paper: '#1a1a1a'
                },
                text: {
                    primary: '#1976d2',
                    secondary: '#b0b3b8'
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
        MuiTypography: {
            styleOverrides: {
                root: () => {
                    return {
                        '&.MuiTypography-body1': {fontSize: '0.875rem'}
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