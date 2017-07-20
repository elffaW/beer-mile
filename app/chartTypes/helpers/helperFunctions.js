export function getMax (data, yParam, factor) {
  var max = 0;
  for (var i = 0 ; i < data.length ; i++){
    if (data[i][yParam] > max ){
      max = data[i][yParam]
    }
  }
  max = Math.ceil(max/factor)*factor;
  return max;
}

export function percentifyData (data, xParam, yParam, factor) {
  
  var max = getMax(data, yParam, factor);
  var percentData = data;
  
  for (var i = 0 ; i < data.length ; i++){
    percentData[i][yParam] = data[i][yParam]/max;
  }
  
  return percentData;
}

export function mphToTime (mph) {
  var minutes = Math.floor(60/mph);
  var seconds = Math.floor(((60/mph) - Math.floor(60/mph))*60);
  
  if (mph === 0) {
    return "";
  }
  else if (seconds < 10) {
    seconds = "0" + seconds;
    return minutes + ":" + seconds;
  }
  else {
    return minutes + ":" + seconds;
  }
  
}

export function SecondsToTime (sec) {
  var minutes = Math.floor(sec/60);
  var seconds = Math.floor(((sec/60) - Math.floor(sec/60))*60);
  
  if (sec === 0) {
    return "";
  }
  else if (seconds < 10) {
    seconds = "0" + seconds;
    return minutes + ":" + seconds;
  }
  else {
    return minutes + ":" + seconds;
  }
  
}

export function groupLapAvg (data) {
  var count = 0;
  var totalTime = 0;
  for (var i = 0 ; i < data.length ; i++) {
    
    if (data[i].lap1Time > 0) {
      totalTime = totalTime + data[i].lap1Time;
      count = count + 1;
    }
    if (data[i].lap2Time > 0) {
      totalTime = totalTime + data[i].lap2Time;
      count = count + 1;
    }
    if (data[i].lap3Time > 0) {
      totalTime = totalTime + data[i].lap3Time;
      count = count + 1;
    }
    if (data[i].lap4Time > 0) {
      totalTime = totalTime + data[i].lap4Time;
      count = count + 1;
    }
  }
  return totalTime/count;
}