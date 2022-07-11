import config from '../config/config.js'
import axios from 'axios'

/**
 * Get the current HNT price and other stats.
 * @returns {Promise} - Object containing HNT data.
 */
export async function getHntStats(){
    try{
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/helium');
        if(response.status === 200){
            return response.data;
        }
        else{
            throw new Error(`${response.status} - ${response.statusText}`);
        }
    }
    catch(err){
        console.log(`Error calling getHntStats: ${err}`);
    }
    
}

/**
 * Get a summary of a particular account 
 * @returns {Promise} - Object containing the account summary 
 */
export async function getAccount(){
    try{
        const response = await axios.get(`https://api.helium.io/v1/accounts/${config.accountId}`);
        if(response.status === 200){
            return response.data;
        }
        else{
            throw new Error(`${response.status} - ${response.statusText}`);
        }
    }
    catch(err){
        console.log(`Error calling getAccount: ${err}`);
    }

    /*
    * Helium Api response to get account
    {
        "data": {
            "address": "1122ZQigQfeeyfSmH2i4KM4XMQHouBqK4LsTp33ppP3W2Knqh8gY",
            "balance": 0,
            "block": 311833,
            "dc_balance": 100000000000000,
            "dc_nonce": 0,
            "nonce": 0,
            "sec_balance": 0,
            "sec_nonce": 0,
            "speculative_nonce": 0
        }
    }
    */
}

/**
 * Get a list of hotspots for a particular account address.
 * @returns {Promise} - data object containing an array of hotspots for the account 
 */
 export async function getHotspots(){
    try{
        const response = await axios.get(`https://api.helium.io/v1/accounts/${config.accountId}/hotspots`);
        if(response.status === 200){
            return response.data;
        }
        else{
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
    }
    catch(err){
        console.log(`Error calling getHotspots: ${config.accountId}`);
    }

    /*
    Helium api response to get hotspots
    {
        "data": [
            {
            "lng": -81.70707772367822,
            "lat": 41.480133219396784,
            "status": {
                "online": "online",
                "height": 435166,
                "gps": "good_fix"
            },
            "score_update_height": 435153,
            "score": 0.9222412109375,
            "owner": "13GCcF7oGb6waFBzYDMmydmXx4vNDUZGX4LE3QUh8eSBG53s5bx",
            "nonce": 1,
            "name": "sneaky-violet-penguin",
            "location": "8c2ab38f19a43ff",
            "geocode": {
                "short_street": "W 32nd St",
                "short_state": "OH",
                "short_country": "US",
                "short_city": "Cleveland",
                "long_street": "West 32nd Street",
                "long_state": "Ohio",
                "long_country": "United States",
                "long_city": "Cleveland",
                "city_id": "Y2xldmVsYW5kb2hpb3VuaXRlZCBzdGF0ZXM"
            },
            "block_added": 96087,
            "block": 435241,
            "address": "1182nyT3oXZPMztMSww4mzaaQXGXd5T7JwDfEth6obSCwwxxfsB"
            }
        ]
    }
    */
}

/**
 * Get all of the blockchain transactions for a particular
 * hotspot. 
 * @param {String} hotspotAddress - Hotspot id
 * @param {Object} queryParams - Optional query parameters to filter the results
 * @param {String} queryParams.cursor - Cursor for page of results to fetch
 * @param {String} queryParams.filter_types - Comma separated list of transaction types
 * @param {String} queryParams.min_time - First time to include data for (unix timestamp)
 * @param {String} queryParams.max_time - Last time to include data for (unix timestamp)
 * @param {String} queryParams.limit - Max number of items to return
 * @returns {Promise} - Array of data objects for each transaction
 */
export async function getActivity(hotspotAddress, queryParams){
    try{
        let apiAddress = `https://api.helium.io/v1/hotspots/${hotspotAddress}/activity`;
        if(queryParams){
            apiAddress = `${apiAddress}?`;
            Object.keys(queryParams).forEach((key) => {
                if(queryParams[key]){
                    apiAddress = `${apiAddress}${key}=${queryParams[key]}&`
                }
            });
        }
        else{
            //If there are no query parameters, return the activity for the
            //past 30 days.
            const endTime = Math.floor(Date.now() / 1000);
            const startTime = endTime - 2592000; 
            apiAddress = `${apiAddress}?min_time=${startTime}&max_time=${endTime}`; 
        }

        let response = await axios.get(apiAddress);
        
        if(response.status === 200){
            return response.data;
        }
        else{
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
    }
    catch(err){
        console.log(`Error calling getActivity for hotspot id: ${hotspotAddress}`);
    }
}

/**
 * Get reward details
 * @param {Object} queryParams - Required query parameters to filter the results
 * @param {String} queryParams.hotspotAddress - Id of the hotspot to get the rewards for 
 * @param {String} queryParams.minTime - First timestamp (YYYY-MM-DDTHH:MM) to include rewards for
 * @param {String} queryParams.maxTime - Last timestamp (YYYY-MM-DDTHH:MM) to include rewards for
 * @returns {Promise} - Array of results for the timeframe requested.
 */
export async function getRewardDetail(queryParams){
    try{
        let apiAddress = `https://api.helium.io/v1/hotspots/${queryParams.hotspotAddress}/rewards`;

        if(queryParams){
            apiAddress = `${apiAddress}?min_time=${queryParams.minTime}&max_time=${queryParams.maxTime}`;    
        }
        else{
            const defaultParams = getDefaultRewardQueryParams();
            apiAddress = `${apiAddress}?min_time=${defaultParams.minTime}&max_time=${defaultParams.maxTime}`;
        }

        let response;
        let jsonData;
        let results = [];
        let moreResults = false;
        let cursor = null;

        do{
            if(!cursor){
                response = await axios.get(apiAddress);
            }
            else{
                response = await axios.get(`${apiAddress}&cursor=${cursor}`);
            }
            
            if(response.status === 200){
                jsonData = response.data;
                results = [...results, ...jsonData.data];

                if(jsonData.cursor){
                    moreResults = true;
                    cursor = jsonData.cursor;
                }
                else{
                    moreResults = false;
                    cursor = null;
                }
            }
            else{
                throw new Error(response.statusText);
            }
        }
        while(moreResults);

        return results;
    }
    catch(err){
        console.log(`Error retrieving rewards for hotspot id: ${err}`);
    }
}


/**
 * Get rewards for a specified date range grouped by week
 * @param {Object} queryParams 
 * @param {String} queryParams.hotspotAddress
 * @param {String} queryParams.minTime - First timestamp (YYYY-MM-DDTHH:MM) to include rewards for
 * @param {String} queryParams.maxTime - Last timestamp (YYYY-MM-DDTHH:MM) to include rewards for
 * @param {Object[]} queryParams.weeks - Array of week start and end dates within the specified date range
 * @param {String} queryParams.weeks[].start - Week start timestamp
 * @param {String} queryParams.weeks[].end - Week end timestamp
 */
export async function getRewardDetailByWeek(queryParams){
    try{
        let rewards = await getRewardDetail({
            hotspotAddress:queryParams.hotspotAddress,
            minTime:queryParams.minTime,
            maxTime:queryParams.maxTime
        });

        let weekTotal, weekStart, weekEnd, rewardTime;
        queryParams.weeks.forEach((week) => {
            weekTotal = 0;
            weekStart = new Date(week.start).getTime();
            weekEnd = new Date(week.end).getTime();

            rewards.forEach((reward) => {
                rewardTime = new Date(reward.timestamp).getTime();
                if(rewardTime >= weekStart && rewardTime <= weekEnd){
                    weekTotal += reward.amount;
                }
            });

            week.weekTotal = weekTotal * 0.00000001;
        });


        return queryParams.weeks;
    }
    catch(err){
        console.log(`Error retrieving rewards for hotspot id: ${err}`);
    }
}

/**
 * Get summary total of rewards
 * @param {String} hotspotAddress - Id of the hotspot to get the reward total for 
 * @param {Object} queryParams - Required query parameters to filter the results
 * @param {String} queryParams.minTime - First timestamp (YYYY-MM-DDTHH:MM) to include rewards for
 * @param {String} queryParams.maxTime - Last timestamp (YYYY-MM-DDTHH:MM) to include rewards for
 */
export async function getRewardTotal(hotspotAddress, queryParams){
    try{
        let apiAddress = `https://api.helium.io/v1/hotspots/${hotspotAddress}/rewards/sum`;
        if(queryParams){
            apiAddress = `${apiAddress}?min_time=${queryParams.minTime}&max_time=${queryParams.maxTime}`;
        }
        else{
            const defaultParams = getDefaultRewardQueryParams();
            apiAddress = `${apiAddress}?min_time=${defaultParams.minTime}&max_time=${defaultParams.maxTime}`;
        }

        let response = await axios.get(apiAddress);
        
        if(response.status === 200){
            return response.data;
        }
        else{
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
    }
    catch(err){
        console.log(`Error retrieving reward total for hotspot id: ${hotspotAddress} - ${err}`);
    }
}

/**
 * If there are no query parameters provided to the result queries, 
 * return the start and end time for the past 30 days.
 */
function getDefaultRewardQueryParams(){
    const endTime = new Date().toISOString();
    const endMillis = Date.now();
    const startMillis = endMillis - 2592000000; //2592000000 - # of milliseconds in 30 days
    const startTime = new Date();
    startTime.setTime(startMillis);

    return {
        minTime:startTime.toISOString(),
        maxTime:endTime
    };
}