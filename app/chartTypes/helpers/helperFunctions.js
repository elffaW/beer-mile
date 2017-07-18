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
  var percentData = data
  
  for (var i = 0 ; i < data.length ; i++){
    percentData[i][yParam] = data[i][yParam]/max;
  }
  
  return percentData
}

