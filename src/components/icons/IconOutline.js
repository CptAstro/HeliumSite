import icons from "./Icons"

export default function IconOutline (props) {

    const iconPath = (() => {
        return icons.outline[props.iconName];
    })

    return (
        <>
        <svg xmlns="http://www.w3.org/2000/svg" 
            fill="none"
            stroke={props.iconColor}
            width={props.width}
            height={props.height} 
            viewBox={props.viewBox} 
            aria-labelledby={props.iconText}>
        <title id={props.iconText} lang="en">{props.iconText}</title>
        <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={props.strokeWidth} 
            d={iconPath}/>
        </svg>
    </> 
    )
}