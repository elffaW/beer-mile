function TotalTime (x, y) {
  this.x = x;  
  this.y = y;
}

export function LeaderBoard (data) {
  var mainArray = [];
  var sortArray = [];
  console.log('LeaderBoard: ' + JSON.stringify(data));
  for (var i = 0 ; i < data.length ; i++) {

    sortArray.push(new TotalTime(
      data[i].name, 
      data[i].overallTime
      ));

  }
  
  sortArray.sort(function(a, b){return b.y-a.y});
  
  return sortArray;
}
