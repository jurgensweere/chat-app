(function() {
    var socket = io();
    var form = document.forms["chat"];
    var input = document.querySelector('form[name=chat] input');
    var messages = document.querySelector('ul');

    form.addEventListener("submit", function(e){
        e.preventDefault();
        var message = input.value;
        input.value = '';

        if (message.length > 0) {
            socket.emit('chat message', message);
        }
    });

    socket.on('chat message', function(msg) {
        var li = document.createElement('li');
        li.textContent = msg;
        li.className = 'list-group-item';
        messages.appendChild(li);
      });
})();