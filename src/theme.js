import { extendTheme } from "@mui/material/styles";

const APP_BAR_HEIGHT = '58px';
const BOARD_BAR_HEIGHT = '60px';
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`;
const COLUMN_HEADER_HEIGHT = '50px';
const COLUMN_FOOTER_HEIGHT = '56px'

const theme = extendTheme({
    trello: {
        appBarHeight: APP_BAR_HEIGHT,
        boardBarHeight: BOARD_BAR_HEIGHT,
        boardContentHeight: BOARD_CONTENT_HEIGHT,
        columnHeaderHeight: COLUMN_HEADER_HEIGHT,
        columnFooterHeight: COLUMN_FOOTER_HEIGHT
    },
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: '#90caf9', // Lighter blue to contrast against dark background
                    light: '#e3f2fd',
                    dark: '#42a5f5'
                },
                secondary: {
                    main: '#ce93d8',
                    light: '#f3e5f5',
                    dark: '#ab47bc'
                },
                background: {
                    default: '#1262b8', // Dark Blue
                    paper: '#ffffff'    // Slightly lighter Dark Blue for cards
                },
                text: {
                    primary: '#414141', // White text
                    secondary: '#90caf9' // Light grey for secondary text
                }
            },
        },
        dark: {
            palette: {
                primary: {
                    main: '#579dff',
                    light: '#37566e',
                    dark: '#ffffff'
                },
                secondary: {
                    main: '#ce93d8',
                    light: '#f3e5f5',
                    dark: '#ab47bc'
                },
                background: {
                    default: 'rgb(35, 52, 77)', // Modern "Deep Slate"
                    paper: '#29323f'
                },
                text: {
                    primary: '#b6c2cf',
                    secondary: '#579dff'
                }
            },
        }
    },
    components: {
        MuiCssBaseline: {
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
                        '&.MuiTypography-body1': { fontSize: '0.875rem' }
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