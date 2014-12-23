// Array Shuffle algorithm
// http://jsperf.com/array-shuffle-comparator/5
// same as above, moved +1 outside loop
// Example: knuthfisheryates2(testArray);
// http://stackoverflow.com/a/2450976/1037948
function knuthfisheryates2(arr) {
  var temp, j, i = arr.length;
  while (--i) {
    j = ~~(Math.random() * (i + 1));
    temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  return arr;
}



function init() {
  questions = knuthfisheryates2(questions);
  answers = knuthfisheryates2(answers);
}
