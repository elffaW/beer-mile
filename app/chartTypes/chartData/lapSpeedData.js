function Speed (lap, speed) {
        this.lap = lap;
        this.speed = speed;
}

export function speedDataforIndividual (name, data) {
  var speedData = [];
  // console.log('speedDataforIndividual: ' + name + ', ' + JSON.stringify(data));
  for (var i = 0 ; i < data.length ; i++) {
    if (name === data[i].name){
      var lap1Time = data[i].lap1Time;
      var lap2Time = data[i].lap2Time;
      var lap3Time = data[i].lap3Time;
      var lap4Time = data[i].lap4Time;

      var factor = .25*3600;
      var speed1 = lap1Time > 0 ? (factor / lap1Time) : 0;
      var speed2 = lap2Time > 0 ? (factor / lap2Time) : 0;
      var speed3 = lap3Time > 0 ? (factor / lap3Time) : 0;
      var speed4 = lap4Time > 0 ? (factor / lap4Time) : 0;

      speedData.push(new Speed(1,speed1));
      speedData.push(new Speed(2,speed2));
      speedData.push(new Speed(3,speed3));
      speedData.push(new Speed(4,speed4));
      break;
    }
  }
  
  return speedData;
}

