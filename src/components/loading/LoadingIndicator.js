//import "./loading.css"
import loadingAnim from "../../Pacman.svg"

export default function LoadingIndicator(props) {
    return (
    <>
        <img src={loadingAnim} />
    </>
    )
}


/*<div className="spinner_container">
<div className="orbit_spinner">
    <div className="orbitOne"></div>
    <div className="orbitTwo"></div>
    <div className="orbitThree"></div>
</div>
<div>
    {props.message}
</div>
</div>*/