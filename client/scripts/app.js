// YOUR CODE HERE:
var app = {
  'username': 'kevin and jason',
  'text': 'trololo',
  'roomname': 'hr6',
  'server': 'https://api.parse.com/1/classes/chatterbox',

};

var message = {};

app.init = function(){
    // console.log('a');
    // app.fetch();
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
      console.log(results);
      _.each(results, function(obj){
        app.addMessage(obj);
        // $('.msg').append('<li>' + obj.username + ':' + obj.text + '</li>');
      });
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to retrieve message');
    }
  });
}

// app.fetch();

app.addMessage = function(message){
  var $chat = $('<li></li>');
  $chat.text(message.username + ": " + message.text);
  // console.log('adding message', message);
  $('#chats').prepend($chat);
};

app.clearMessages = function(message){
  $('#chats').empty();
};


$(document).ready(function(){
  $('.button').on('click', function(){
    app.fetch();
  });
  $('.submit').on('click', function(){
    message['username'] = $("#username")[0].value;
    message['text'] = $("#message")[0].value;
    app.send(message);
  })
});

