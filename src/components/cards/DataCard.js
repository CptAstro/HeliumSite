import BaseCard from "./BaseCard"
import "./cards.css"

import { useState, useEffect } from 'react';
import LoadingIndicator from "../loading/LoadingIndicator";

export default function DataCard (props) {

    const [status, setStatus] = useState("");
    const loading = props.loading;

    useEffect(() => {
        setStatus(props.status);
    }, [])
    
    function HandleStatus () {
        if (status === "Balance") {
            if (loading) {
                return (
                    <>
                        <LoadingIndicator />
                        <span>{props.loadingMessage}</span>
                    </>
                )
            }
            else {
                return (
                <>
                    <div style={{fontSize:"2rem", marginBottom:"20px"}}>
                        <label>HNT:</label> {Number(props.hntBalance).toFixed(2)}
                    </div>
                    <div style={{fontSize: "1.5rem", fontWeight: "600"}}>
                        ${Number(props.usdBalance).toFixed(2)}
                    </div>
                </>
            )
            }
        }
        else if (status === "Hotspots") {
            if (loading) {
                return (
                    <>
                        <LoadingIndicator />
                        <span>{props.loadingMessage}</span>
                    </>
                )
            }
            else {
                return (
                    <>
                        <div style={{fontSize:"2rem", fontWeight:"600"}}>
                            {props.hotspots.length}
                        </div>
                    </>
                )
            }
        }
        else {
            <h1>Something went wrong</h1>
        }
    }

    return (
        <BaseCard>
        <div className="data_card">
            <div className="data_card__title">
                {props.cardTitle}
            </div>
            <div className="data_card__content">
                <HandleStatus />
            </div>
        </div>
        </BaseCard>
    )
}