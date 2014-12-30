// YOUR CODE HERE:
var app = {
  'username': 'kevin and jason',
  'text': 'trololo',
  'roomname': 'hr6',
  'server': 'https://api.parse.com/1/classes/chatterbox',
  'friends': {}
};

var message = {};

app.init = function(){

};

app.send = function(message){
  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      //$( "#chats" ).html( data );
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};

app.fetch = function(){
  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox',
    data: {
      order: '-createdAt'
    },
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message retrieved');
      var results = data.results;
      _.each(results, function(obj){
        app.addMessage(obj);
        // app.addFriend(obj);

      // console.log($("#" + obj.username));
      });

    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to retrieve message');
    }
  });
  // event.preventDefault();

}

app.addMessage = function(message){
  var $chat = $('<li></li>');
  var $user = $('<button id='+message.username+'>' + message.username + '</button>');
  $chat.text(" " + message.text + ": " + message.roomname );
  // console.log('adding message', message);
  $($chat).prepend($user);
  $('#chats').append($chat);
  $user.on('click', function(){
    if( !app.friends[message.username] ){
      app.friends[message.username] = true;
      $('#friend').append('<li>' + message.username + '   is your friend!' + '</li>');
    }
  });
};

app.addFriend = function(){
    if( !app.friends[message.username] ){
      app.friends[message.username] = true;
      $('#friend').append('<li>' + message.username + '</li>');
    }
};

app.clearMessages = function(message){
  $('#chats').empty();
};

app.addRoom = function(name){
  var $room = $('<option>' + name + '</option>');
  $('#roomSelect').append($room);
};


$(document).ready(function(){
  $('.button').on('click', function(){
    app.clearMessages();
    app.fetch();
    // $("#" + message.username).on('click', function(){
    //     console.log( "a" );
    // });
  });
  $('.submit').on('click', function(){
    message['username'] = $("#username")[0].value;
    message['text'] = $("#message")[0].value;
    message['roomname'] = $("#room")[0].value;
    app.send(message);
    // event.preventDefault();
  })
});


