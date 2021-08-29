import React, {useEffect, useState} from "react";

import  Config from "../../Svg";


export interface PropsButton{
    action?: () => void
    title?: string
    view: string
    disabled?: boolean
    svg?: any
}

const Button = (props: PropsButton) => {
    const [svg, setSvg] = useState<any>("")
useEffect(() => {
    switch (props.svg){
        case 'back':{
            setSvg(Config.arrowBack)
            break;
        }
        case 'forward':{
            setSvg(Config.arrowForward)
            break
        }
        case 'home':{
            setSvg(Config.home)
            break
        }
        default: {
            break
        }
    }
},[])



    return (
       <div>
           <button className={props.disabled ? `${props.view} disabled` : props.view } disabled={props.disabled} onClick={props.action}>{svg} {props.title}</button>
       </div>
    );
}

export default Button;