import CloseSvg from "../svg/close"

export const Close = ({setDialog} : {setDialog  : React.Dispatch<React.SetStateAction<boolean>>}) => {
    return(
        <div onClick = {() => setDialog(false)}>
            <CloseSvg/>
        </div>
    )
}