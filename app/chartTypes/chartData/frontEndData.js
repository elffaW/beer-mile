
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
        var runner = new Runner(
            data[i]["name"],
            data[i]["button"],
            (data[i]["timelog"][8].timestamp.getTime() - data[i]["timelog"][0].timestamp.getTime())/1000,
            (data[i]["timelog"][2].timestamp.getTime() - data[i]["timelog"][1].timestamp.getTime())/1000,
            (data[i]["timelog"][4].timestamp.getTime() - data[i]["timelog"][3].timestamp.getTime())/1000,
            (data[i]["timelog"][6].timestamp.getTime() - data[i]["timelog"][5].timestamp.getTime())/1000,
            (data[i]["timelog"][8].timestamp.getTime() - data[i]["timelog"][7].timestamp.getTime())/1000,
            (data[i]["timelog"][1].timestamp.getTime() - data[i]["timelog"][0].timestamp.getTime())/1000,
            (data[i]["timelog"][3].timestamp.getTime() - data[i]["timelog"][2].timestamp.getTime())/1000,
            (data[i]["timelog"][5].timestamp.getTime() - data[i]["timelog"][4].timestamp.getTime())/1000,
            (data[i]["timelog"][7].timestamp.getTime() - data[i]["timelog"][6].timestamp.getTime())/1000,
            
            (data[i]["timelog"][2].timestamp.getTime() - data[i]["timelog"][1].timestamp.getTime())/1000 +
            (data[i]["timelog"][4].timestamp.getTime() - data[i]["timelog"][3].timestamp.getTime())/1000 +
            (data[i]["timelog"][6].timestamp.getTime() - data[i]["timelog"][5].timestamp.getTime())/1000 +
            (data[i]["timelog"][8].timestamp.getTime() - data[i]["timelog"][7].timestamp.getTime())/1000,
            
            (data[i]["timelog"][1].timestamp.getTime() - data[i]["timelog"][0].timestamp.getTime())/1000 +
            (data[i]["timelog"][3].timestamp.getTime() - data[i]["timelog"][2].timestamp.getTime())/1000 +
            (data[i]["timelog"][5].timestamp.getTime() - data[i]["timelog"][4].timestamp.getTime())/1000 +
            (data[i]["timelog"][7].timestamp.getTime() - data[i]["timelog"][6].timestamp.getTime())/1000
            );
            
        runnersClean.push(runner);   
    }
    
    return runnersClean;
}
