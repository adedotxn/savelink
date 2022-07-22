import React, { createContext, useContext, useEffect, useState } from "react";

export interface DialogContextData {
  dialog : boolean,
  setDialog : React.Dispatch<React.SetStateAction<boolean>>,
  toggleDialog : () => void
}
   
export const dialogContextDefaultValue: DialogContextData = {
  dialog : false,
  setDialog : () => null,
  toggleDialog : () => null,
}

export interface ThemeContextData {
  theme : boolean,
  switchTheme : () => void
}

export const themeContextDefaultValue: ThemeContextData = {
  theme : false,
  switchTheme : () => null
}
   


export const DialogContext = createContext<DialogContextData>(dialogContextDefaultValue);
export const ThemeContext = createContext<ThemeContextData>(themeContextDefaultValue)

export const useDialog = () => {
  return useContext(DialogContext)
}

export const useTheme = () => {
  return useContext(ThemeContext)
}


export const DialogProvider = ({children}:{children : React.ReactNode})  => {
  const [dialog, setDialog] = useState<boolean>(false);

  const toggleDialog =() => {
    setDialog(!dialog)
  }

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


  return (
    <ThemeContext.Provider value = {{theme, switchTheme}}>
      <DialogContext.Provider value = {{dialog, setDialog, toggleDialog}}>
        {children}
      </DialogContext.Provider>
    </ThemeContext.Provider>
  )
}
