import BaseCard from "./BaseCard";
import logo from "../../maker.svg"
import LoadingIndicator from "../loading/LoadingIndicator";

import { useEffect, useState } from "react";

import "./cards.css";
import { getRewardTotal } from "../../data/heliumApi"

import "../../App.css"

export default function HotspotCard(props) {
    let hotspot = props.hotspot;
    let address = hotspot.address;
    let hntValue = props.hnt;

    const [loading, isLoading] = useState(true);
    const [totalRewards, setTotalRewards] = useState(0);

    useEffect(() => {
        async function getHotspot(address) {
            const summaryResponse = await getRewardTotal(address, {
                minTime: hotspot.timestamp_added,
                maxTime: new Date().toISOString()
            });
            //console.log(`Summary response right after retrieval: ${JSON.stringify(summaryResponse)}`)
            //setRewardSummary(summaryResponse);
            return summaryResponse;
        }
        getHotspot(address).then((response) => {
            setTotalRewards(response.data.total.toFixed(2) * hntValue.toFixed(2));
            isLoading(false);
        });
    }, [hotspot])

    function HandleStatus() {
        if (!loading) {
            return (
                <>
                <div className="layout wrap">
                    <div className="layout_section_header">
                        <span className="layout_section_header__text">
                            Details
                        </span>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <label>Id:</label>{hotspot.address}
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <label>Reward Scale:</label>{hotspot.reward_scale}
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <label>Location:</label>{hotspot.geocode.short_city}, {hotspot.geocode.short_state}
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <label>Latitude / Longitude:</label>{hotspot.lat} / {hotspot.lng}
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <label>Date Installed:</label>{hotspot.timestamp_added}
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <label>Lifetime Rewards:</label>${totalRewards.toFixed(2)}
                    </div>
                </div>
                <div className="layout wrap">
                    <div className="layout_section_header">
                        <span className="layout_section_header__text">
                            Reward Summary
                        </span>
                    </div>
                </div>
                </>
            )
        }
        else {
            return (
                <>
                    <LoadingIndicator />
                    <p>Loading Hotspot Data...</p>
                </>
            )
        }
    }

    return (
        <BaseCard>
            <div className="hotspot_card">
                <div className="hotspot_card_header">
                    <img src={logo} width="24" height="24" style={{marginRight: "10px"}}/>
                    <span>{hotspot.name}</span>
                </div>
                <div className="hotspot_card_content">
                    <HandleStatus />
                </div>
            </div>
        </BaseCard>
    )
}