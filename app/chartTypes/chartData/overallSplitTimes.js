function TotalTime (x, y) {
  this.x = x;  
  this.y = y;
}

export function LeaderBoard (data) {
  var mainArray = [];
  var runArray = [];
  var drinkArray = [];
  var sortArray = [];

  for (var i = 0 ; i < data.length ; i++) {

    sortArray.push(new TotalTime(
      data[i].name, 
      data[i].overallTime
      ));

  }
  
  sortArray.sort(function(a, b){return b.y-a.y});

  for (i = 0 ; i < sortArray.length ; i++) {
    
    for (var j = 0 ; j < data.length ; j++) {
      
      if (sortArray[i].x === data[j].name) {
      
      runArray.push(new TotalTime(
        data[j].name, 
        data[j].overallTime));
        
      drinkArray.push(new TotalTime(
        data[j].name,
        data[j].overallTime));
      }
    }
  }
  
  mainArray.push(runArray,drinkArray);
  console.log('mainArray: ' + JSON.stringify(mainArray));
  
  return mainArray;
}
