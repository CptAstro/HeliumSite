
import DataCard from "../components/cards/DataCard"

import { getAccount, getRewardDetailByWeek, getHntStats, getHotspots } from '../data/heliumApi.js'
import { generateWeekStartEndDates } from '../utils/dateUtils.js'

import { useState, useEffect } from 'react';

import "./dashboard.css"

export default function Dashboard (props) {
    const [accountHntBalance, setAccountHntBalance] = useState(0);
    const [accountUsdBalance, setAccountUsdBalance] = useState(0);
    const [loading, setLoading] = useState(true);

    //const [hntValue, setHntValue] = useState(0);
    //const [hotspots, setHotspots] = useState([]);

    console.log(props.hnt);
    console.log(props.hotspots);

    let hntValue = props.hnt;
    let hotspots = props.hotspots;

    async function getAccountData(){
        try{
            const accountResponse = await getAccount();
            setAccountHntBalance(accountResponse.data.balance / 100000000)
            setAccountUsdBalance(hntValue * (accountResponse.data.balance / 100000000));
        }
        catch(err){
                console.log(err);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        getAccountData();
    }, [hntValue, hotspots])

    //hotspots={hotspots}

    return (
        <>
            <div className="dashboard_container">
                <DataCard 
                    cardTitle="Account Balance"
                    loading={loading} 
                    loadingMessage="Loading Balance..."
                    hntBalance={accountHntBalance}
                    usdBalance={accountUsdBalance}
                    status="Balance"
                />
                    
                <DataCard 
                    cardTitle="Active Hotspots" 
                    loading={loading}
                    loadingMessage="Loading Hotspots..."
                    status="Hotspots"
                    hotspots={hotspots}
                />
            </div>

        </>
    )
}