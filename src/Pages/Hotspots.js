import HotspotCard from "../components/cards/HotspotCard"
import { useState, useEffect } from "react";

import { getRewardDetail, getRewardTotal } from "../data/heliumApi";

import "./hotspot.css"

export default function Hotspots(props) {
    let hotspot = props.hotspot
    let hntValue = props.hnt;

    return (
        <div className="hotspot-container">
            <HotspotCard 
                hotspot={hotspot} 
                hnt={hntValue}
            />
        </div>
    )
}