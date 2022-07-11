/**
 * Generate an array of week start and week end 
 * dates (Sun - Sat) over the date range specified
 * @param {Date} startDate - Date to start generating weeks for
 * @param {Date} endDate - Date to end generating weeks for
 * @returns {Object[]} - Array of week start and end dates  
 */
 export function generateWeekStartEndDates(startDate, endDate){
    let weeks = [];

    //Get the first day of the week the startDate falls in.
    let weekStart = new Date(new Date().setTime(startDate.getTime() - ((startDate.getDay() + 1) * 86400000)));
    let weekEnd;

    do{
        //let past7days = 
        weekEnd = new Date(weekStart.getTime() + (86400000 * 6));
        weeks.push({
            start:weekStart,
            end:weekEnd
        });

        weekStart = new Date(new Date().setTime(weekEnd.getTime() + 86400000));
    }
    while(weekStart < endDate);

    

    return weeks;
}