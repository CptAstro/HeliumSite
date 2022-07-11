import "./cards.css"

export default function BaseCard (props) {
    return (
        <div className="card">
            {props.children}
        </div>
    )
}