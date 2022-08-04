export interface ThemeContextData {
    theme : boolean,
    switchTheme : () => void
}

export interface DialogContextData {
    dialog : boolean,
    setDialog : React.Dispatch<React.SetStateAction<boolean>>,
    toggleDialog : () => void
}

export interface SearchContextData {
    search: string
    setSearch : React.Dispatch<React.SetStateAction<string>>,
}