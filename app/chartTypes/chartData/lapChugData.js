function Rate (lap, rate) {
        this.lap = lap;
        this.rate = rate;
}

export function rateDataforIndividual (name, data) {
  var rateData = [];
  
  for (var i = 0 ; i < data.length ; i++) {
    if (name === data[i].name){

      rateData.push(new Rate(1,12*60/data[i].lap1drinkTime));
      rateData.push(new Rate(2,12*60/data[i].lap2drinkTime));
      rateData.push(new Rate(3,12*60/data[i].lap3drinkTime));
      rateData.push(new Rate(4,12*60/data[i].lap4drinkTime));
      break;
    }
  }
  
  return rateData;
}
