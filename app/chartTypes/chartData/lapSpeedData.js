function Speed (lap, speed) {
        this.lap = lap;
        this.speed = speed;
}

export function speedDataforIndividual (name, data) {
  var speedData = [];
  // console.log('speedDataforIndividual: ' + name + ', ' + JSON.stringify(data));
  for (var i = 0 ; i < data.length ; i++) {
    if (name === data[i].name){

      speedData.push(new Speed(1,.25*3600/data[i].lap1Time));
      speedData.push(new Speed(2,.25*3600/data[i].lap2Time));
      speedData.push(new Speed(3,.25*3600/data[i].lap3Time));
      speedData.push(new Speed(4,.25*3600/data[i].lap4Time));
      break;
    }
  }
  
  return speedData;
}

