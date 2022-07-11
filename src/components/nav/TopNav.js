import "./nav.css"
import logo from "../../helium-logo.svg"
import menu from "../../icons8-menu.svg"

export default function TopNav(props) {

    let hntValue = props.hnt;

    return (
        <nav className="navbar topnav">
            <div className="topnav_group">
                <img src={logo} className="nav-item"/>
                <img src={menu} className="nav-item"/>
                <span className="company_id">DAVIS CRYPTO ENTERPRISES</span>
            </div>
            <div className="topnav_group" style={{paddingRight: "20px"}}>
                    <span style={{marginRight: "10px"}}>
                        HNT Value (USD):
                    </span>
                    <span>
                        ${hntValue.toFixed(2)}
                    </span>
                </div>
        </nav>
    )
}