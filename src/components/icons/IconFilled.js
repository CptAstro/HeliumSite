import icons from "./icons.js"

export default function IconFilled (props) {

    const iconPath = () => {
        return icons.solid[props.iconName];
    }

    const iconFill = () => {
        return icons.solid[props.iconFillName]
    }

    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg"
                fill={props.iconColor} 
                width={props.width} 
                height={props.height}
                viewBox={props.viewBox} 
                ariaLabelledby={props.iconText}>
            <title id={props.iconText} lang="en">
                {props.iconText}
            </title>
            <path d={iconPath} />
            <path fillRule="evenOdd"
                clipRule="evenodd"
                d={iconFill} >
            </path>
            </svg>
        </>
    )
}