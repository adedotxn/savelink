import React, { createContext, useContext, useState } from "react";

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
   



export const DialogContext = createContext<DialogContextData>(dialogContextDefaultValue);

export const useDialog = () => {
  return useContext(DialogContext)
}


export const DialogProvider = ({children}:{children : React.ReactNode})  => {
    const [dialog, setDialog] = useState<boolean>(false);

    const toggleDialog =() => {
      setDialog(!dialog)
    }
    return (
      <DialogContext.Provider value = {{dialog, setDialog, toggleDialog}}>
        {children}
      </DialogContext.Provider>
    )
}
