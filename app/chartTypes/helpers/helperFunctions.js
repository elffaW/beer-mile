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
  
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  
  return minutes + ":" + seconds;
}

