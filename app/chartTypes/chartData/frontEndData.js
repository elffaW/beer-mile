const runners = [
	{
		id: 11,
		name: "Matt",
		button: {name:"poopbags"},
		timelogs: [
			{timestamp:new Date("2017-07-21 18:30:12")},
			{timestamp:new Date("2017-07-21 18:30:39")},
			{timestamp:new Date("2017-07-21 18:33:34")},
			{timestamp:new Date("2017-07-21 18:34:04")},
			{timestamp:new Date("2017-07-21 18:37:09")},
			{timestamp:new Date("2017-07-21 18:37:43")},
			{timestamp:new Date("2017-07-21 18:39:53")},
			{timestamp:new Date("2017-07-21 18:40:23")},
			{timestamp:new Date("2017-07-21 18:43:34")}
		]
	}, {
		id: 22,
		name: "Mike",
		button: {name:"dang"},
		timelogs: [
			{timestamp:new Date("2017-07-21 18:30:32")},
			{timestamp:new Date("2017-07-21 18:30:46")},
			{timestamp:new Date("2017-07-21 18:32:50")},
			{timestamp:new Date("2017-07-21 18:33:09")},
			{timestamp:new Date("2017-07-21 18:36:39")},
			{timestamp:new Date("2017-07-21 18:36:55")},
			{timestamp:new Date("2017-07-21 18:39:05")},
			{timestamp:new Date("2017-07-21 18:39:32")},
			{timestamp:new Date("2017-07-21 18:42:43")}
		]
	}, {
		id: 3,
		name: "Caroline",
		button: {name:"banana"},
		timelogs: [
			{timestamp:new Date("2017-07-21 18:30:30")},
			{timestamp:new Date("2017-07-21 18:30:47")},
			{timestamp:new Date("2017-07-21 18:33:07")},
			{timestamp:new Date("2017-07-21 18:33:41")},
			{timestamp:new Date("2017-07-21 18:35:53")},
			{timestamp:new Date("2017-07-21 18:36:15")},
			{timestamp:new Date("2017-07-21 18:39:19")},
			{timestamp:new Date("2017-07-21 18:39:52")},
			{timestamp:new Date("2017-07-21 18:43:55")}
		]
	},{
		id: 23,
		name: "Meghan",
		button: {name:"angel soft"},
		timelogs: [
			{timestamp:new Date("2017-07-21 18:30:28")},
			{timestamp:new Date("2017-07-21 18:31:00")},
			{timestamp:new Date("2017-07-21 18:32:43")},
			{timestamp:new Date("2017-07-21 18:33:08")},
			{timestamp:new Date("2017-07-21 18:36:27")},
			{timestamp:new Date("2017-07-21 18:37:03")},
			{timestamp:new Date("2017-07-21 18:39:17")},
			{timestamp:new Date("2017-07-21 18:39:56")},
			{timestamp:new Date("2017-07-21 18:43:32")}
		]
	},{
		id: 16,
		name: "JR",
		button: {name:"perky jerky"},
		timelogs: [
			{timestamp:new Date("2017-07-21 18:30:16")},
			{timestamp:new Date("2017-07-21 18:30:31")},
			{timestamp:new Date("2017-07-21 18:33:16")},
			{timestamp:new Date("2017-07-21 18:33:50")},
			{timestamp:new Date("2017-07-21 18:36:20")},
			{timestamp:new Date("2017-07-21 18:36:45")},
			{timestamp:new Date("2017-07-21 18:39:20")},
			{timestamp:new Date("2017-07-21 18:39:58")},
			{timestamp:new Date("2017-07-21 18:42:58")}
		]
	},{
		id: 8,
		name: "Jay",
		button: {name:"burts bees"},
		timelogs: [
			{timestamp:new Date("2017-07-21 18:30:55")},
			{timestamp:new Date("2017-07-21 18:31:24")},
			{timestamp:new Date("2017-07-21 18:34:16")},
			{timestamp:new Date("2017-07-21 18:34:31")},
			{timestamp:new Date("2017-07-21 18:37:52")},
			{timestamp:new Date("2017-07-21 18:38:27")},
			{timestamp:new Date("2017-07-21 18:41:59")},
			{timestamp:new Date("2017-07-21 18:42:19")},
			{timestamp:new Date("2017-07-21 18:46:10")}
		]
	},{
		id: 14,
		name: "Andy",
		button: {name:"basics"},
		timelogs: [
			{timestamp:new Date("2017-07-21 18:30:41")},
			{timestamp:new Date("2017-07-21 18:31:05")},
			{timestamp:new Date("2017-07-21 18:34:10")},
			{timestamp:new Date("2017-07-21 18:34:38")},
			{timestamp:new Date("2017-07-21 18:37:43")},
			{timestamp:new Date("2017-07-21 18:38:19")},
			{timestamp:new Date("2017-07-21 18:40:35")},
			{timestamp:new Date("2017-07-21 18:41:03")},
			{timestamp:new Date("2017-07-21 18:44:11")}
		]
	},{
		id: 82,
		name: "Liz",
		button: {name:"poof"},
		timelogs: [
			{timestamp:new Date("2017-07-21 18:30:01")},
			{timestamp:new Date("2017-07-21 18:31:15")},
			{timestamp:new Date("2017-07-21 18:32:02")},
			{timestamp:new Date("2017-07-21 18:33:28")},
			{timestamp:new Date("2017-07-21 18:36:03")},
			{timestamp:new Date("2017-07-21 18:37:30")},
			{timestamp:new Date("2017-07-21 18:39:10")},
			{timestamp:new Date("2017-07-21 18:39:40")},
			{timestamp:new Date("2017-07-21 18:43:45")}
		]
	},{
		id: 7,
		name: "TC",
		button: {name:"stupid"},
		timelogs: [
			{timestamp:new Date("2017-07-21 18:30:22")},
			{timestamp:new Date("2017-07-21 18:30:42")},
			{timestamp:new Date("2017-07-21 18:32:56")},
			{timestamp:new Date("2017-07-21 18:33:17")},
			{timestamp:new Date("2017-07-21 18:36:07")},
			{timestamp:new Date("2017-07-21 18:36:35")},
			{timestamp:new Date("2017-07-21 18:38:51")},
			{timestamp:new Date("2017-07-21 18:39:29")},
			{timestamp:new Date("2017-07-21 18:43:12")}
		]
	}
];


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


function cleanData (data){
    var runnersClean = [];
    
    for(var i = 0 ; i < data.length ; i++){
        var runner = new Runner(
            data[i]["name"],
            data[i]["button"],
            (data[i]["timelogs"][8].timestamp.getTime() - data[i]["timelogs"][0].timestamp.getTime())/1000,
            (data[i]["timelogs"][2].timestamp.getTime() - data[i]["timelogs"][1].timestamp.getTime())/1000,
            (data[i]["timelogs"][4].timestamp.getTime() - data[i]["timelogs"][3].timestamp.getTime())/1000,
            (data[i]["timelogs"][6].timestamp.getTime() - data[i]["timelogs"][5].timestamp.getTime())/1000,
            (data[i]["timelogs"][8].timestamp.getTime() - data[i]["timelogs"][7].timestamp.getTime())/1000,
            (data[i]["timelogs"][1].timestamp.getTime() - data[i]["timelogs"][0].timestamp.getTime())/1000,
            (data[i]["timelogs"][3].timestamp.getTime() - data[i]["timelogs"][2].timestamp.getTime())/1000,
            (data[i]["timelogs"][5].timestamp.getTime() - data[i]["timelogs"][4].timestamp.getTime())/1000,
            (data[i]["timelogs"][7].timestamp.getTime() - data[i]["timelogs"][6].timestamp.getTime())/1000,
            
            (data[i]["timelogs"][2].timestamp.getTime() - data[i]["timelogs"][1].timestamp.getTime())/1000 +
            (data[i]["timelogs"][4].timestamp.getTime() - data[i]["timelogs"][3].timestamp.getTime())/1000 +
            (data[i]["timelogs"][6].timestamp.getTime() - data[i]["timelogs"][5].timestamp.getTime())/1000 +
            (data[i]["timelogs"][8].timestamp.getTime() - data[i]["timelogs"][7].timestamp.getTime())/1000,
            
            (data[i]["timelogs"][1].timestamp.getTime() - data[i]["timelogs"][0].timestamp.getTime())/1000 +
            (data[i]["timelogs"][3].timestamp.getTime() - data[i]["timelogs"][2].timestamp.getTime())/1000 +
            (data[i]["timelogs"][5].timestamp.getTime() - data[i]["timelogs"][4].timestamp.getTime())/1000 +
            (data[i]["timelogs"][7].timestamp.getTime() - data[i]["timelogs"][6].timestamp.getTime())/1000
            );
            
        runnersClean.push(runner);   
    }
    
    return runnersClean;
}

const testRunners = cleanData(runners);


		
export default testRunners;