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

var name = null;

function init() {
  questions = knuthfisheryates2(questions);
  answers = knuthfisheryates2(answers);

  // Closes popup when clicked
  $('#submit_name').click(
    function(){

      $('#new_game_popup').popup('hide');
      name = $('#name').val();
        // for now we only use the default room
        ws.send(create_response("new_player",{"room":'default'}));
    }
  );
}

function create_response(msg_type, data) {
  return JSON.stringify(
    {'player': name, 'type': msg_type, 'body': data }
  );
}

var host = location.origin.replace(/^http/, 'ws')
var ws = new WebSocket(host);
ws.onmessage = function (event) {
  var li = document.createElement('li');
  li.innerHTML = JSON.parse(event.data);
  document.querySelector('#pings').appendChild(li);
};


$(document).ready(function() {
  init();
  $('#new_game_popup').popup({autoopen: true});
  return false;
  });
