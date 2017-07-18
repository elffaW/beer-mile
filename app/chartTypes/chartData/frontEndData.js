
function Runner(
    name, 
    button, 
    overallTime, 
    lap1Time,
    lap2Time,
    lap3Time,
    lap4Time
    ) {
        this.name = name;
        this.button = button;
        this.overallTime = overallTime;
        this.lap1Time = lap1Time;
        this.lap2Time = lap2Time;
        this.lap3Time = lap3Time;
        this.lap4Time = lap4Time;
}


export function cleanData(data) {
	var runnersClean = [];
    
    for(var i = 0 ; i < data.length; i++) {
    	var date0 = data[i]["timelog"][0];
    	var date1 = data[i]["timelog"][1];
		var date2 = data[i]["timelog"][2];
		var date3 = data[i]["timelog"][3];
		var date4 = data[i]["timelog"][4];

		var overallTime = 0;
		var lap1Time = 0;
		var lap2Time = 0;
		var lap3Time = 0;
		var lap4Time = 0;

		//this is so stupid
		if(date0) {
	    	date0 = new Date(date0.timestamp).getTime();
	    	overallTime = 0;
	    	
	    	if(date1) {
		    	date1 = new Date(date1.timestamp).getTime();
		    	overallTime = (date1 - date0)/1000;
		    	lap1Time = (date1 - date0)/1000;
		        
		        if(date2) {
			    	date2 = new Date(date2.timestamp).getTime();
			    	overallTime = (date2 - date0)/1000;
			    	lap2Time = (date2 - date1)/1000;
			    	
			    	if(date3) {
				    	date3 = new Date(date3.timestamp).getTime();
				    	overallTime = (date3 - date0)/1000;
				    	lap3Time = (date3 - date2)/1000;
				    	
				    	if(date4) {
					    	date4 = new Date(date4.timestamp).getTime();
					    	overallTime = (date4 - date0)/1000;
					        lap4Time = (date4 - date3)/1000;
					    	
					    }
					}
				}
			}
		}

		var runner = new Runner(
            data[i]["name"],
            data[i]["button"],
            overallTime,
            lap1Time,
			lap2Time,
			lap3Time,
			lap4Time
        );

        runnersClean.push(runner);   
    }
    
    return runnersClean;
}
