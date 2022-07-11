import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom'

import Dashboard from './Pages/Dashboard';
//import Hotspot1 from './Pages/Hotspot1';
//import Hotspot2 from './Pages/Hotspot2';
import Hotspots from './Pages/Hotspots';

import SideNav from './components/nav/SideNav';
import TopNav from './components/nav/TopNav';

import { getAccount, getRewardDetailByWeek, getHntStats, getHotspots } from './data/heliumApi.js'
import { generateWeekStartEndDates } from './utils/dateUtils.js'

import { useState, useEffect } from 'react';

function App() {

  const [hntValue, setHntValue] = useState(0);
  const [hotspots, setHotspots] = useState([]);

  useEffect(() => {
    async function initialize() {
        try {
        let hntResponse;
        let hotspotsResponse;

        [hntResponse, hotspotsResponse] = await Promise.all([getHntStats(), getHotspots()]);

        //setHntStats(hntResponse);
        setHntValue(hntResponse.market_data.current_price.usd);
        setHotspots(hotspotsResponse.data);

    }
    catch (err) {
        console.log(err);
    }
    }

    initialize();
}, [])

function ProcessRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard hnt={hntValue} hotspots={hotspots}/>}/>
      {hotspots.map(hotspot => {
        return (
          <Route path={`/hotspots/${hotspot.name}`} element={<Hotspots hnt={hntValue} hotspot={hotspot}/>}></Route> 
                )
      })}
    </Routes>
  )}

  return (
    <div className="App">
      <SideNav hotspots={hotspots}/>
      <TopNav hnt={hntValue}/>
      <ProcessRoutes />
    </div>
  );
}

export default App;
