
function Runner(
    name, 
    button, 
    overallTime, 
    lap1runTime,
    lap2runTime,
    lap3runTime,
    lap4runTime,
    lap1drinkTime,
    lap2drinkTime,
    lap3drinkTime,
    lap4drinkTime,
    totalRunTime,
    totalDrinkTime
    ) {
        this.name = name;
        this.button = button;
        this.overallTime = overallTime;
        this.lap1runTime = lap1runTime;
        this.lap2runTime = lap2runTime;
        this.lap3runTime = lap3runTime;
        this.lap4runTime = lap4runTime;
        this.lap1drinkTime = lap1drinkTime;
        this.lap2drinkTime = lap2drinkTime;
        this.lap3drinkTime = lap3drinkTime;
        this.lap4drinkTime = lap4drinkTime;
        this.totalRunTime = totalRunTime;
        this.totalDrinkTime = totalDrinkTime;
}


export function cleanData(data) {
	console.log('cleanData');
    var runnersClean = [];
    
    for(var i = 0 ; i < data.length ; i++){
    	var date0 = new Date(data[i]["timelog"][0].timestamp).getTime();
    	var date1 = new Date(data[i]["timelog"][1].timestamp).getTime();
    	var date2 = new Date(data[i]["timelog"][2].timestamp).getTime();
    	var date3 = new Date(data[i]["timelog"][3].timestamp).getTime();
    	var date4 = new Date(data[i]["timelog"][4].timestamp).getTime();
    	var date5 = new Date(data[i]["timelog"][5].timestamp).getTime();
    	var date6 = new Date(data[i]["timelog"][6].timestamp).getTime();
    	var date7 = new Date(data[i]["timelog"][7].timestamp).getTime();
    	var date8 = new Date(data[i]["timelog"][8].timestamp).getTime();

        var runner = new Runner(
            data[i]["name"],
            data[i]["button"],
            (date8 - date0)/1000,
            (date2 - date1)/1000,
            (date4 - date3)/1000,
            (date6 - date5)/1000,
            (date8 - date7)/1000,
            (date1 - date0)/1000,
            (date3 - date2)/1000,
            (date5 - date4)/1000,
            (date7 - date6)/1000,
            
            (date2 - date1)/1000 +
            (date4 - date3)/1000 +
            (date6 - date5)/1000 +
            (date8 - date7)/1000,
            
            (date1 - date0)/1000 +
            (date3 - date2)/1000 +
            (date5 - date4)/1000 +
            (date7 - date6)/1000
            );
            
        runnersClean.push(runner);   
    }
    
    return runnersClean;
}
