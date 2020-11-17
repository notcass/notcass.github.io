/// <reference path="libraries/p5.global-mode.d.ts" />
let socket;
let username;
let input;
let totalMessages = [];

function setup() {
  socket = io.connect('http://notcass.github.io:3000');
  socket.on('msg', newMsg);
  username = createInput('').parent('sketch-holder').size(100, 25);
  input = createInput('').parent('sketch-holder').size(300, 25);
}

//prettier-ignore
function newMsg(data) {
  let message = createDiv(data.username + ': ').attribute('data-user', data.username).parent('chatroom').class('msg').html(data.msg, true);
  totalMessages.push(message);
  if(totalMessages.length > 17) {
    console.log('removing');

    document.querySelector('.msg').remove();
    totalMessages.shift();
  }
}

function keyPressed() {
  if (key === 'Enter' && input.value() != '') {
    let data = {
      username: username.value(),
      msg: input.value(),
    };
    socket.emit('msg', data);
    // newMsg(data);
    input.value('');
  }
}
