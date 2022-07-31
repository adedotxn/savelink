import React, { createContext, useContext, useEffect, useState } from "react";

interface DialogContextData {
  dialog : boolean,
  setDialog : React.Dispatch<React.SetStateAction<boolean>>,
  toggleDialog : () => void
}
const dialogContextDefaultValue: DialogContextData = {
  dialog : false,
  setDialog : () => null,
  toggleDialog : () => null,
}

interface ThemeContextData {
  theme : boolean,
  switchTheme : () => void
}
const themeContextDefaultValue: ThemeContextData = {
  theme : false,
  switchTheme : () => null
}

interface SearchContextData {
  search: string
  setSearch : React.Dispatch<React.SetStateAction<string>>,

}
const searchContextDefaultValue: SearchContextData = {
  search : '',
  setSearch : () => null,
}
   

//Contexts
export const DialogContext = createContext<DialogContextData>(dialogContextDefaultValue);
export const ThemeContext = createContext<ThemeContextData>(themeContextDefaultValue)
export const SearchContext = createContext<SearchContextData>(searchContextDefaultValue)

//Custom hooks
export const useDialog = () => {
  return useContext(DialogContext)
}

export const useTheme = () => {
  return useContext(ThemeContext)
}

export const useSearch = () => {
  return useContext(SearchContext)
}

//(daddy) Context Provider 
export const UtilityProvider = ({children}:{children : React.ReactNode})  => {
  //dialog logic
  const [dialog, setDialog] = useState<boolean>(false);
  const toggleDialog =() => {
    setDialog(!dialog)
  }

  //theme logic
  const [theme, setTheme] = useState(false)
  function getCurrentTheme() {
    let theme:string = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark' : 'light';
    localStorage.getItem('savelink-theme') 
    ? theme = `${localStorage.getItem('savelink-theme')}` : null;

    return theme;
  }

  function loadTheme(theme : string) {
    const root = document.querySelector(':root');
    root?.setAttribute('color-scheme', `${theme}`)
  }

  useEffect(() => {
    loadTheme(getCurrentTheme())
  })

  const switchTheme = () => {
    let theme = getCurrentTheme()
    theme === 'dark' ? theme = 'light' : theme = 'dark';
    localStorage.setItem('savelink-theme', `${theme}`)
    loadTheme(theme)  
    const root = document.querySelector(':root');

    root?.getAttribute('color-scheme') === 'dark' ? setTheme(true) : setTheme(false)
  }

  //search logic
  const [search, setSearch] = useState<string>("")

  return (
    <ThemeContext.Provider value = {{theme, switchTheme}}>
      <DialogContext.Provider value = {{dialog, setDialog, toggleDialog}}>
        <SearchContext.Provider value = {{search, setSearch}}>
          {children}
        </SearchContext.Provider>
      </DialogContext.Provider>
    </ThemeContext.Provider>
  )
}