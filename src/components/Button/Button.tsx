import React from "react";
import style from "../../../styles/Button.module.sass"

export interface PropsButton{
    action?: () => void
    title: string
    view: string
    disabled?: boolean
}

const Button = (props: PropsButton) => {
    return (
       <div>
           <button className={props.disabled ? `${props.view} disabled` : props.view } disabled={props.disabled} onClick={props.action}>{props.title}</button>
       </div>
    );
}

export default Button;