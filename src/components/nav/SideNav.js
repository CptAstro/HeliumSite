import { Link } from "react-router-dom"

import "./nav.css"

export default function SideNav(props) {

    let hotspots = props.hotspots;

    function ProcessHotspots() {
        return (
            hotspots.map(hotspot => {
                return (
                <div className="nav-side-item">
                    <Link to={`/hotspots/${hotspot.name}`} className="nav-side-item">
                        {hotspot.name}
                    </Link>
                </div>)
            })
        )
    }
    return (
        <aside className="vertical-nav"> 
                <div className="nav-side-section">
                    <span className="nav-side-item-header"> Account</span>
                    <div className="nav-side-item">
                        <Link to="/" className="nav-side-item">
                            Overview
                        </Link>
                    </div>
                </div>
                <div className="nav-side-section">
                    <span className="nav-side-item-header"> Hotspots</span>
                    <ProcessHotspots />
                </div>
                <div className="nav-side-section">
                    <span className="nav-side-item-header"> Tools</span>
                </div>
        </aside>
    )
}